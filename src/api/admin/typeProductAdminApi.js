import axiosClient from "../axiosClient";
const typeProductAdminApi = {
  getAllTypeProduct() {
    const url = "/category";
    return axiosClient.get(url);
  },
  getNameTypeProduct(name) {
    const url = "/category/getCategoryByName";
    return axiosClient.get(url, {
      params: { name },
    });
  },
  updateTypeProduct(id, newData) {
    const url = "/category/" + id;

    return axiosClient.put(url, newData);
  },
  addTypeProduct(newData) {
    const url = "/category/";
    return axiosClient.post(url, newData);
  },
};

export default typeProductAdminApi;
