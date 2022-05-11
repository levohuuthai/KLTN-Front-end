import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useEffect, useState } from "react";
import style from "./DashBoard.module.scss";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import statisticAdminApi from "api/admin/statisticAdminApi";
import orderAdminApi from "api/admin/orderAdminApi";

import ItemNewOrder from "./ItemNewOrder/ItemNewOrder";

function DashBoard(props) {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };
  const [arrListNewOrder, setArrListNewOrder] = useState([]);
  const [dailyIncome, setDailyIncome] = useState();
  const [monthIncome, setMonthIncome] = useState();
  const [dailyCountProduct, setDailyCountProduct] = useState();
  const [monthCountProduct, setMonthCountProduct] = useState();

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
  }, []);
  return (
    <div className="d-flex wrap">
      <AsideAdmin />
      <div className={style.dashboard}>
        <div className={style.dashboard_frame}>
          <div className={style.title_search}>
            <span>DashBoard</span>
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
                <span>
                  <span style={{ color: "green", fontWeight: "700" }}>
                    +3,48%
                  </span>
                  Từ tháng trước
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
                <span>
                  <span style={{ color: "green", fontWeight: "700" }}>
                    +3,48%
                  </span>{" "}
                  Từ tháng trước
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
                <span>
                  <span style={{ color: "green", fontWeight: "700" }}>
                    +3,48%
                  </span>{" "}
                  Từ tháng trước
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
                    1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050,
                  ],
                  datasets: [
                    {
                      data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                      label: "Africa",
                      borderColor: "#3e95cd",
                      fill: false,
                    },
                    {
                      data: [
                        282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267,
                      ],
                      label: "Asia",
                      borderColor: "#8e5ea2",
                      fill: false,
                    },
                    {
                      data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                      label: "Europe",
                      borderColor: "#3cba9f",
                      fill: false,
                    },
                    {
                      data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                      label: "Latin America",
                      borderColor: "#e8c3b9",
                      fill: false,
                    },
                    {
                      data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                      label: "North America",
                      borderColor: "#c45850",
                      fill: false,
                    },
                  ],
                }}
                width={100}
                height={50}
                options={{
                  title: {
                    display: true,
                    text: "World population per region (in millions)",
                  },
                  legend: {
                    display: true,
                    position: "bottom",
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
                <p>Xem tất cả</p>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Khách hàng</th>
                    <th>Tổng số sản phẩm</th>
                    <th>Giá</th>
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
                <p>Xem tất cả</p>
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
                  <tr>
                    <td>
                      <i class="far fa-user"></i>
                    </td>
                    <td>012589526586</td>
                    <td>Lê Võ Hửu Thái</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <i class="far fa-user"></i>
                    </td>
                    <td>012589526586</td>
                    <td>Lê Võ Hửu Thái</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <i class="far fa-user"></i>
                    </td>
                    <td>012589526586</td>
                    <td>Lê Võ Hửu Thái</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      <i class="far fa-user"></i>
                    </td>
                    <td>012589526586</td>
                    <td>Lê Võ Hửu Thái</td>
                    <td></td>
                  </tr>
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
