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
  updateCouponAdmin(id, data) {
    const url = "/coupon/" + id;
    return axiosClient.put(url, data);
  },
  deleteCouponAdmin(id) {
    const url = "/coupon/" + id;
    return axiosClient.delete(url);
  },
};

export default couponAdminApi;
