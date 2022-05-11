import axiosClient from "./axiosClient";
const cartApi = {
  addOrder(data) {
    // console.log(data);
    const url = "/orders";
    return axiosClient.post(url, data);
  },
  getOrder(userId, status) {
    const url = "/orders/find/" + userId;
    return axiosClient.get(url, {
      params: {
        status,
      },
    });
  },
  getProductDetailByIdProductDetail(id) {
    const url = "/products/findOneProductDetail/" + id;
    return axiosClient.get(url);
  },
  getOrderById(id) {
    const url = "/orders/" + id;
    return axiosClient.get(url);
  },
  updateStatusOrder(idOrder, status) {
    const url = "/orders/" + idOrder;
    return axiosClient.put(url, status);
  },
};

export default cartApi;
