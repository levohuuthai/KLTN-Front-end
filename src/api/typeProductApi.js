import axiosClient from "./axiosClient";
const typeProductApi = {
  getAllTypeProduct() {
    const url = "/category";
    return axiosClient.get(url);
  },
};

export default typeProductApi;
