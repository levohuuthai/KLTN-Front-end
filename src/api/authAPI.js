import axiosClient from "./axiosClient";

const authAPI = {
  checkPhone(phoneNumber) {
    const url = "/auth/checkPhone";
    return axiosClient.post(url, phoneNumber);
  },
  sendOTP(phoneNumber) {
    const url = "/auth/sendOtp";
    return axiosClient.post(url, phoneNumber);
  },
  signUp(data) {
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  },
  verifyOTPSignUp(phoneNumber, code) {
    const url = "/auth/verifyOTPSignUp";
    return axiosClient.post(url, phoneNumber, code);
  },
  signIn(phoneNumber, password) {
    const url = "/auth/signin";
    return axiosClient.post(url, phoneNumber, password);
  },
  logout(refreshtoken) {
    const url = "/auth/logout";
    return axiosClient.post(url, { refreshToken: refreshtoken.refreshToken });
  },
  replaceUser(userID) {
    localStorage.setItem("user", JSON.stringify(userID.newUser));
    console.log(userID);
    const url = "/users/" + userID.userID;
    return axiosClient.put(url, userID.newUser);
  },
  getUserById(id) {
    const url = "/users/" + id;
    return axiosClient.get(url);
  },
  ChangePassword(data) {
    const url = "/auth/ChangePassword";
    return axiosClient.post(url, {
      password: data.password,
      reEnterPassword: data.reEnterPassword,
      newPassword: data.newPassword,
    });
  },
  login_facebook(data) {
    const url = "/auth/facebook";
    return axiosClient.post(url, data);
  },
  login_google() {
    const url = "/auth/login/success";
    return axiosClient.get(url);
  },
  add_login_google(userId) {
    console.log(userId);
    const url = "/auth/login/success";
    return axiosClient.get(url, {
      params: {
        userId,
      },
    });
  },
};

export default authAPI;
