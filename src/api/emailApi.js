import axiosClient from "./axiosClient";

const emailApi = {
  addEmail(email) {
    //load list mess
    const url = "/sendMail/addEmail";
    return axiosClient.post(url, email);
  },
};

export default emailApi;
