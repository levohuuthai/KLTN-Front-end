import axiosClient from "../axiosClient";
const orderAdminApi = {
  async getAllOrder(_page, _limit, price, date) {
    const getAllOrder = await axiosClient.get("/orders", {
      params: { price, date, _page, _limit },
    });
    const count = await axiosClient.get("/orders");
    return {
      data: getAllOrder.data,
      pagination: {
        page: _page,
        limit: _limit,
        total: count.data.length,
      },
    };
  },
  getOrderById(id) {
    const url = "/orders/" + id;
    return axiosClient.get(url);
  },
  getOrderByPhone(phone) {
    const url = "/orders/getOrderByPhone";
    return axiosClient.get(url, {
      params: { phone },
    });
  },
  getNewOrder() {
    const url = "/orders/getOrderMoiNhat";
    return axiosClient.get(url);
  },
};

export default orderAdminApi;
