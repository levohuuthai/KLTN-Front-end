import axiosClient from "./axiosClient";

const messageApi = {
  getMessage(idRoom) {
    const url = "/messages/" + idRoom;
    return axiosClient.get(url);
  },
};

export default messageApi;
