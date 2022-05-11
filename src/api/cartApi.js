import axiosClient from "./axiosClient";
const cartApi = {
  addToCart(userId, quantityDetail, product) {
    const url = "/carts";
    return axiosClient.post(url, {
      userId: userId,
      quantityDetail: quantityDetail,
      product: product,
    });
  },
  updateQuantityToCart(userId, quantity, product) {
    const url = "/carts";
    return axiosClient.post(url, {
      userId: userId,
      quantity: quantity,
      product: product,
    });
  },
  deleteProductToCart(cartId) {
    const url = "/carts/" + cartId;
    return axiosClient.delete(url);
  },
  getProductCartByUserId(userId) {
    const url = "carts/find/" + userId;
    return axiosClient.get(url);
  },
};

export default cartApi;
