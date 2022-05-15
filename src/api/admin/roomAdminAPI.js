import axiosClient from "../axiosClient";

const roomAdminAPI = {
  getRoomByUserId(userId) {
    const url = "/rooms/getRoomByUserId/" + userId.userId;
    return axiosClient.get(url, userId);
  },
  getRoomAfterLogin() {
    //load list mess
    const url = "/rooms/getRoomAfterLogin/";
    return axiosClient.get(url);
  },

  getRoomByNameRoom(name) {
    const url = "/rooms/getRoomByNameRoom/";
    return axiosClient.post(url, name);
  },
};

export default roomAdminAPI;
