import axiosClient from "../axiosClient";

const messageAdminAPI = {
  GetMessage(message) {
    const url = "/messages/" + message.idRoom;
    return axiosClient.get(url);
  },
  AddMessage(message) {
    console.log(message);
    const url = "/messages/addMessage";
    return axiosClient.post(url, message);
  },
  readMessage(messageId) {
    const url = "/messages/readMessage/" + messageId;
    return axiosClient.put(url);
  },
  getNewMessage() {
    const url = "/messages/getNewMessage/a";
    return axiosClient.get(url);
  },
};

export default messageAdminAPI;
