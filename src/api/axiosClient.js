import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.ezfrontend.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // config.headers.authorization = Cookies.get("token");
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
    return Promise.reject(error);
  }
);
export default axiosClient;
