import axiosClient from "../axiosClient";
const statisticAdminApi = {
  getDaiLyIncome() {
    const url = "/orders/GetDailyIncome";
    return axiosClient.get(url);
  },
  getMonthIncome() {
    const url = "/orders/income";
    return axiosClient.get(url);
  },
  getCountDailyProduct() {
    const url = "/orders/GetCountDailyIncome";
    return axiosClient.get(url);
  },
  getCountMonthProduct() {
    const url = "/orders/GetCountMonthlyIncome";
    return axiosClient.get(url);
  },
  getAllOrderThongKe(quy) {
    const url = "/orders/getAllOrderThongKe";
    return axiosClient.get(url, {
      params: { quy },
    });
  },
  getAllOrderThongKeByDate(from, to) {
    console.log(from);
    console.log(to);

    const url = "/orders/getAllOrderThongKe";
    return axiosClient.get(url, {
      params: { from, to },
    });
  },
};

export default statisticAdminApi;
