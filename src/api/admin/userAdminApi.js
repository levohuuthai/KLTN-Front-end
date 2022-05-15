import axiosClient from "../axiosClient";
const userAdminApi = {
  // getAllUser(_page, _limit) {
  //   const url = "/users";
  //   return axiosClient.get(url);
  // },
  async getAllUser(_page, _limit) {
    const getAllUser = await axiosClient.get("/users", {
      params: { _page, _limit },
    });
    const count = await axiosClient.get("/users");
    return {
      data: getAllUser.data,
      pagination: {
        page: _page,
        limit: _limit,
        total: count.data.users.length,
      },
    };
  },
  async getAllUserToLocked(data) {
    const _page = data._page;
    const _limit = data._limit;
    const getAllUser = await axiosClient.get("/users", {
      params: { _page, _limit },
    });
    const count = await axiosClient.get("/users");
    return {
      data: getAllUser.data,
      pagination: {
        page: _page,
        limit: _limit,
        total: count.data.users.length,
      },
    };
  },
  async getUserByPhone(phone) {
    const url = "/users/GetUserByPhone";
    return axiosClient.post(url, { phone: phone });

    // const getAllUser = await axiosClient.get("/users", {
    //   params: { _page, _limit },
    // });
    // const count = await axiosClient.get("/users");
    // return {
    //   data: getAllUser.data,
    //   pagination: {
    //     page: _page,
    //     limit: _limit,
    //     total: count.data.users.length,
    //   },
    // };
  },
  async getUserByName(userName, _page, _limit) {
    const getAllUser = await axiosClient.get("/users/getUserByName", {
      params: { userName, _page, _limit },
    });
    // console.log(getAllUser);
    // const count = await axiosClient.get("/users/getUserByName");
    // console.log(count);
    return {
      data: getAllUser.data,
      // pagination: {
      //   page: _page,
      //   limit: _limit,
      //   total: count.data.users.length,
      // },
    };
  },
  lockedUser(id) {
    const url = "/users/lockUser";
    return axiosClient.get(url, {
      params: { id },
    });
  },
  unLockedUser(id) {
    const url = "/users/openUser";
    return axiosClient.get(url, {
      params: { id },
    });
  },
  getUserById(id) {
    const url = "/users/" + id;
    return axiosClient.get(url);
  },
};

export default userAdminApi;
