import axiosClient from "./axiosClient";

const roomApi = {
  getRoomAfterLoginClient() {
    //load list mess
    const url = "/rooms/getRoomAfterLoginClient/";
    return axiosClient.get(url);
  },
};

export default roomApi;
