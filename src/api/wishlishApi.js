import axiosClient from "./axiosClient";
const wishlishApi = {
  AddProductWishList(data) {
    const url = "/wishList";
    // console.log(data);
    return axiosClient.post(url, data);
  },
  getWishListUser(userId) {
    const url = "/wishList/find/" + userId;
    // console.log(url);
    return axiosClient.get(url);
  },
  deleteWishList(idUser, products) {
    const url = "/wishList/" + idUser;
    console.log(idUser);
    console.log(products);

    return axiosClient.delete(url, {
      params: {
        products,
      },
    });
  },
};

export default wishlishApi;
