import axiosClient from "./axiosClient";
const cartApi = {
  addAddress(data) {
    console.log(data);
    const url = "/address";
    return axiosClient.post(url, data);
  },
  getAddress(id) {
    const url = "/address/" + id;
    return axiosClient.get(url);
  },
  updatesAddress(id, newAddress) {
    const url = "/address/" + id;
    return axiosClient.put(url, newAddress);
  },
  //FIND ALL ADDRESS OF USER
  getListAddressUser(userId) {
    const url = "/address/find/" + userId;

    return axiosClient.get(url);
  },
  deleteAddress(id) {
    const url = "/address/" + id;
    return axiosClient.delete(url);
  },
  //   getCity() {
  //     const url = "/https://provinces.open-api.vn/api/p/";
  //     console.log(url);
  //     return axiosClient.get(url);
  //   },
};

export default cartApi;
