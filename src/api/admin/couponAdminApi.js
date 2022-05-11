import axiosClient from "../axiosClient";
const couponAdminApi = {
  getAllCouponAdmin() {
    const url = "/coupon/";
    return axiosClient.get(url);
  },
};

export default couponAdminApi;
