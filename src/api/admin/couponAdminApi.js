import axiosClient from "../axiosClient";
const couponAdminApi = {
  getAllCouponAdmin() {
    const url = "/coupon/";
    return axiosClient.get(url);
  },
  addCouponAdmin(data) {
    const url = "/coupon/";
    return axiosClient.post(url, data);
  },
};

export default couponAdminApi;
