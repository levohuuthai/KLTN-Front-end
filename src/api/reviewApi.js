import axiosClient from "./axiosClient";
const reviewApi = {
  addReview(data) {
    console.log(data);
    const url = "/review/";
    return axiosClient.post(url, data);
  },
  getListReview(idProduct) {
    const url = "/review/" + idProduct;
    console.log(url);
    return axiosClient.get(url);
  },
  getListReview5Star(id) {
    const url = "/review/Review5Star";
    return axiosClient.get(url, {
      params: {
        id,
      },
    });
  },
  getListReview4Star(id) {
    const url = "/review/Review4Star";
    return axiosClient.get(url, {
      params: {
        id,
      },
    });
  },
  getListReview3Star(id) {
    const url = "/review/Review3Star";
    return axiosClient.get(url, {
      params: {
        id,
      },
    });
  },
  getListReview2Star(id) {
    const url = "/review/Review2Star";
    return axiosClient.get(url, {
      params: {
        id,
      },
    });
  },
  getListReview1Star(id) {
    const url = "/review/Review1Star";
    return axiosClient.get(url, {
      params: {
        id,
      },
    });
  },
  getReviewByProductIdAndStar(idProduct, star) {
    const url = "/review/" + idProduct + "/getReviewByProductIdAndStar";
    return axiosClient.get(url, {
      params: {
        star,
      },
    });
  },
};

export default reviewApi;
