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
  getMonthlyIncomeVoiThangTruoc() {
    const url = "/orders/GetMonthlyIncomeVoiThangTruoc";
    return axiosClient.get(url);
  },
  getAllOrderThongKe(quy) {
    const url = "/orders/getAllOrderThongKe";
    return axiosClient.get(url, {
      params: { quy },
    });
  },
  getAllOrderThongKeByDate(from, to) {
    const url = "/orders/getAllOrderThongKe";
    return axiosClient.get(url, {
      params: { from, to },
    });
  },
  thongKeTheoThangTongTienSoVoiNamTruoc(from, to) {
    const url = "/orders/thongKeTheoThangTongTienSoVoiNamTruoc";
    return axiosClient.get(url);
  },
  thongKeTheoThangTongTienSLSanPham(from, to) {
    const url = "/orders/thongKeTheoThangTongTienSLSanPham";
    return axiosClient.get(url);
  },
};

export default statisticAdminApi;
