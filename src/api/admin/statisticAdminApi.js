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
};

export default statisticAdminApi;
