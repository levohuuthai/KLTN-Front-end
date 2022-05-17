import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useEffect, useState } from "react";
import style from "./DashBoard.module.scss";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";
import statisticAdminApi from "api/admin/statisticAdminApi";
import orderAdminApi from "api/admin/orderAdminApi";

import ItemNewOrder from "./ItemNewOrder/ItemNewOrder";
import userAdminApi from "api/admin/userAdminApi";
import { Link } from "react-router-dom";

function DashBoard(props) {
  const [arrListNewOrder, setArrListNewOrder] = useState([]);
  const [arrListNewUser, setArrListNewUser] = useState([]);
  const [dailyIncome, setDailyIncome] = useState();
  const [monthIncome, setMonthIncome] = useState();
  const [dailyCountProduct, setDailyCountProduct] = useState();
  const [monthCountProduct, setMonthCountProduct] = useState();
  const [arrTotalMoneyThisYear, setArrTotalMoneyThisYear] = useState([]);
  const [arrTotalMoneyLastYear, setArrTotalMoneyLastYear] = useState([]);
  const [arrTotalProductThisYear, setArrTotalProductThisYear] = useState([]);

  // const [percentTotalMoneyLastMonth, setPercentTotalMoneyLastMonth] =
  //   useState();
  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Số lượng sản phẩm",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: arrTotalProductThisYear?.map((data) => {
          return data.sl;
        }),
      },
    ],
  };
  useEffect(() => {
    const fetchRequestGetNewOrder = async () => {
      try {
        const requestGetNewOrder = await orderAdminApi.getNewOrder();
        setArrListNewOrder(requestGetNewOrder.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetNewOrder();
  }, []);
  useEffect(() => {
    const fetchRequestGetNewUser = async () => {
      try {
        const requestGetNewUser = await userAdminApi.getNewUser();
        setArrListNewUser(requestGetNewUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetNewUser();
  }, []);
  useEffect(() => {
    //Số tiền bán đc trong ngày
    const fetchRequestGetDailyIncome = async () => {
      try {
        const requestGetDailyIncome = await statisticAdminApi.getDaiLyIncome();
        setDailyIncome(requestGetDailyIncome.data[0].total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetDailyIncome();
    //Số tiền bán đc trong tháng
    const fetchRequestGetMonthIncome = async () => {
      try {
        const requestGetMonthIncome = await statisticAdminApi.getMonthIncome();
        setMonthIncome(requestGetMonthIncome.data[0].total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetMonthIncome();
    //Số lượng sản phẩm bán đc trong ngày
    const fetchRequestGetCountDailyProduct = async () => {
      try {
        const requestGetCountDailyProduct =
          await statisticAdminApi.getCountDailyProduct();
        setDailyCountProduct(requestGetCountDailyProduct.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetCountDailyProduct();
    //Số lượng sản phẩm bán đc trong ngày
    const fetchRequestGetCountMonthProduct = async () => {
      try {
        const requestGetCountMonthProduct =
          await statisticAdminApi.getCountMonthProduct();
        setMonthCountProduct(requestGetCountMonthProduct.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetCountMonthProduct();
    //Phần trăm tổn tiền so với tháng trc
    // const fetchRequestGetGetMonthlyIncomeVoiThangTruoc = async () => {
    //   try {
    //     const requestGetGetMonthlyIncomeVoiThangTruoc =
    //       await statisticAdminApi.getMonthlyIncomeVoiThangTruoc();
    //     // console.log(requestGetGetMonthlyIncomeVoiThangTruoc);
    //     // setPercentTotalMoneyLastMonth(requestGetGetMonthlyIncomeVoiThangTruoc);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchRequestGetGetMonthlyIncomeVoiThangTruoc();

    //Biểu đồ tổng tiền năm nay vs năm trước
    const fetchRequestthongKeTheoThangTongTienSoVoiNamTruoc = async () => {
      try {
        const requestthongKeTheoThangTongTienSoVoiNamTruoc =
          await statisticAdminApi.thongKeTheoThangTongTienSoVoiNamTruoc();
        setArrTotalMoneyThisYear(
          requestthongKeTheoThangTongTienSoVoiNamTruoc.data.namnay
        );
        setArrTotalMoneyLastYear(
          requestthongKeTheoThangTongTienSoVoiNamTruoc.data.namtruoc
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestthongKeTheoThangTongTienSoVoiNamTruoc();

    //Biểu đồ số lượng sản phẩm năm nay
    const fetchRequestthongKeTheoThangTongTienSLSanPham = async () => {
      try {
        const requestthongKeTheoThangTongTienSLSanPham =
          await statisticAdminApi.thongKeTheoThangTongTienSLSanPham();
        console.log(requestthongKeTheoThangTongTienSLSanPham);
        setArrTotalProductThisYear(
          requestthongKeTheoThangTongTienSLSanPham.data.array
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestthongKeTheoThangTongTienSLSanPham();
  }, []);

  return (
    <div className="d-flex wrap">
      <AsideAdmin />
      <div className={style.dashboard}>
        <div className={style.dashboard_frame}>
          <div className={`${style.title_search} d-flex`}>
            <h4>DashBoard</h4>
            <div className={style.search}>
              <span>
                <i className="bi bi-search"></i>
              </span>
              <input type="text" placeholder="Nhập ở đây" />
            </div>
          </div>
          <div className={style.list_block_statistic}>
            <div className={style.block_statistic}>
              <div className={style.left_block_statistic}>
                <span>Tổng tiền hôm nay</span>
                <span className={style.price_today}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dailyIncome)}
                </span>
              </div>
              <div className={style.right_block_statistic}>
                <i className="fas fa-credit-card"></i>
              </div>
            </div>
            <div className={style.block_statistic}>
              <div className={style.left_block_statistic}>
                <span>Tổng tiền trong tháng</span>
                <span className={style.price_today}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(monthIncome)}
                </span>
                <span>
                  <span style={{ color: "green", fontWeight: "700" }}>
                    +3,48%
                  </span>{" "}
                  Từ tháng trước
                </span>
              </div>
              <div className={style.right_block_statistic}>
                <i className="fas fa-credit-card"></i>
              </div>
            </div>
            <div className={style.block_statistic}>
              <div className={style.left_block_statistic}>
                <span>Tổng số lượng bán trong ngày</span>
                <span className={style.price_today}>
                  {dailyCountProduct} sản phẩm
                </span>
              </div>
              <div className={style.right_block_statistic}>
                <i class="fas fa-tshirt"></i>
              </div>
            </div>
            <div className={style.block_statistic}>
              <div className={style.left_block_statistic}>
                <span>Tổng số lượng bán trong tháng</span>
                <span className={style.price_today}>
                  {monthCountProduct} sản phẩm
                </span>
              </div>
              <div className={style.right_block_statistic}>
                <i class="fas fa-tshirt"></i>
              </div>
            </div>
          </div>
          <div className={style.chart}>
            <div className={style.chart_curve}>
              <Line
                data={{
                  labels: [
                    "Tháng 1",
                    "Tháng 2",
                    "Tháng 3",
                    "Tháng 4",
                    "Tháng 5",
                    "Tháng 6",
                    "Tháng 7",
                    "Tháng 8",
                    "Tháng 9",
                    "Tháng 10",
                    "Tháng 11",
                    "Tháng 12",
                  ],
                  datasets: [
                    {
                      data: arrTotalMoneyThisYear?.map((data) => {
                        return data.tien;
                      }),

                      label: "Năm 2022",
                      borderColor: "#ba933e",
                      fill: false,
                    },
                    {
                      data: arrTotalMoneyLastYear?.map((data) => {
                        return data.tien;
                      }),
                      label: "Năm 2021",
                      borderColor: "#3e95cd",
                      fill: false,
                    },
                  ],
                }}
                width={250}
                height={70}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Biểu đồ doanh thu theo từng tháng",
                      padding: {
                        top: 10,
                      },
                    },
                  },
                }}
              />
            </div>
            <div className={style.chart_column}>
              <Bar
                data={data}
                width={100}
                height={50}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    title: {
                      display: true,
                      text: "Biểu đồ số lượng sản phẩm bán được theo từng tháng",
                      padding: {
                        top: 10,
                        // bottom: 30,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className={style.new_transaction_customer}>
            <div className={style.new_transaction}>
              <div
                className={`${style.title_transaction} d-flex justify-content-between`}
              >
                <span>Các giao dịch mới nhất</span>
                <Link to="/admin/listorder">Xem tất cả</Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Số điện thoại</th>
                    <th>Số sản phẩm</th>
                    <th>Tổng tiền</th>
                    <th>Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {arrListNewOrder?.slice(0, 4).map((data, idx) => {
                    return (
                      <tr key={idx}>
                        <ItemNewOrder data={data} />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className={style.new_customer}>
              <div
                className={`${style.title_customer} d-flex justify-content-between`}
              >
                <span>Khách hàng mới</span>
                <Link to="/admin/listuser">Xem tất cả</Link>
              </div>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Tên</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {arrListNewUser?.slice(0, 4).map((data, idx) => {
                    return (
                      <tr>
                        <td>
                          <i class="far fa-user"></i>
                        </td>
                        <td>{data?._id}</td>
                        <td>{data?.userName}</td>
                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
