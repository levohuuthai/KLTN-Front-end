import axiosClient from "./axiosClient";
const couponApi = {
  getAllCoupon() {
    const url = "/coupon/GetAllCouponClient";
    return axiosClient.get(url);
  },

  addCoupon(data) {
    const url = "/coupon/addCouponToUser";
    return axiosClient.post(url, data);
  },
  getCouponOfUser(userId) {
    const url = "/coupon/getCouponOfUser";
    return axiosClient.get(url, {
      params: {
        userId,
      },
    });
  },
  useCoupon(qUserId, qCouponId) {
    const url = "/coupon/useCoupon";
    return axiosClient.get(url, {
      params: {
        qUserId,
        qCouponId,
      },
    });
  },
};

export default couponApi;
