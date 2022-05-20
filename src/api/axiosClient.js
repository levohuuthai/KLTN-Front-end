import axios from "axios";
import Cookies from "js-cookie";
const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};
const axiosClient = axios.create({
  baseURL: "http://localhost:5000/",
  // baseURL: "https://api.ezfrontend.com/",
  headers: header,
});
axiosClient.refreshToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  return (
    await axiosClient.post("/auth/refreshToken", { refreshToken: refreshToken })
  ).data;
};
axiosClient.setLocalAccessToken = async (accessToken, refToken) => {
  Cookies.set("token", accessToken);
  Cookies.set("refreshToken", refToken);
};
axiosClient.interceptors.request.use(
  function (config) {
    config.headers.authorization = Cookies.get("token");

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async function (reponse) {
    return reponse;
  },
  async function (error) {
    const { config, status, data } = error.response;
    console.log(error.response);
    if (config.url === "/auth/checkPhone" && status === 403) {
      const error = data.error;
      const message = error.message;
      console.log(error);
      return Promise.reject(message);
    }
    if (config.url === "/auth/verifyOtpSignUp" && status === 400) {
      const error = data.error;
      const message = error.message;
      return Promise.reject(message);
    }
    if (config.url === "/auth/signin" && status === 403) {
      const error = data.error;
      const message = error.message;
      return Promise.reject(message);
    }
    if (config.url === "/orders" && status === 400) {
      const error = data.message;
      return Promise.reject(error);
    }
    if (config.url === "/sendMail/addEmail" && status === 400) {
      const error = data.message;
      return Promise.reject(error);
    }
    if (status === 401) {
      if (data.error.message === "jwt expired") {
        console.log("trường hợp Token hết hạn");

        const { accessToken, refToken } = await axiosClient.refreshToken();
        console.log(accessToken + "dong 63" + refToken);
        if (accessToken) {
          console.log("đã lấy lại accessToken thành công");
          config.headers["authorization"] = accessToken;

          await axiosClient.setLocalAccessToken(accessToken, refToken);

          return axiosClient(config);
        }
      }
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
