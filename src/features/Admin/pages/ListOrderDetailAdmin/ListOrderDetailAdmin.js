import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from "./ListOrderDetailAdmin.module.scss";
import addressAPI from "api/addressAPI";
import orderApi from "api/orderApi";
import userAdminApi from "api/admin/userAdminApi";
import ItemOrderDetailAdmin from "./ItemOrderDetailAdmin/ItemOrderDetailAdmin";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import Loading from "components/Loading";
import orderAdminApi from "api/admin/orderAdminApi";

function ListOrderDetailAdmin(props) {
  const [activeTimeline1, setActiveTimeLine1] = useState(false);
  const [activeTimeline2, setActiveTimeLine2] = useState(false);
  const [activeTimeline3, setActiveTimeLine3] = useState(false);
  const [activeTimeline4, setActiveTimeLine4] = useState(false);
  const [dayOrder, setDayOrder] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
  });
  const [address, setAddress] = useState("");
  const [user, setUser] = useState();
  const { dispatch, state } = useContext(GlobalContext);
  const location = useLocation();
  const dataOrderNavigate = location.state?.dataOrder;
  const [dataOrder, setDataOrder] = useState(dataOrderNavigate);

  useEffect(() => {
    setDataOrder(dataOrderNavigate);
  }, [dataOrderNavigate]);
  console.log(dataOrderNavigate);
  console.log(dataOrder);
  //get address
  useEffect(() => {
    const fetchGetAddress = async () => {
      try {
        const requestGetAddress = await addressAPI.getAddress(
          dataOrder?.address
        );
        setAddress(requestGetAddress.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAddress();
  }, [dataOrder]);
  //GetuserById
  useEffect(() => {
    const fetchRequestGetUserById = async () => {
      try {
        const requestGetUserById = await userAdminApi.getUserById(
          dataOrder.userId
        );

        setUser(requestGetUserById.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetUserById();
  }, [dataOrder]);
  useEffect(() => {
    if (dataOrder?.status === "Đang Giao Hàng") {
      setActiveTimeLine1(true);
    } else if (dataOrder?.status === "Đã Giao") {
      setActiveTimeLine1(true);
      setActiveTimeLine2(true);
    } else if (dataOrder?.status === "Đã Hủy") {
      setActiveTimeLine1(true);
      setActiveTimeLine2(true);
      setActiveTimeLine3(true);
    }
  }, [dataOrder]);
  useEffect(() => {
    var date = new Date(dataOrder?.createdAt);
    setDayOrder({
      minute: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }, [dataOrder]);
  const hanleShipping = () => {
    dispatch({
      type: ACTIOS.loadingOrderClient,
      payload: true,
    });
    const fetchUpdateStatusOrder = async () => {
      try {
        const requestUpdateStatusOrder = await orderApi.updateStatusOrder(
          dataOrder._id,
          {
            status: "Đang Giao Hàng",
          }
        );
        console.log(requestUpdateStatusOrder);
        if (requestUpdateStatusOrder.status === 200) {
          setDataOrder(requestUpdateStatusOrder.data);
          setTimeout(() => {
            dispatch({
              type: ACTIOS.loadingOrderClient,
              payload: false,
            });
          }, 300);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUpdateStatusOrder();
  };
  const hanleDeliveried = () => {
    dispatch({
      type: ACTIOS.loadingOrderClient,
      payload: true,
    });
    const fetchUpdateStatusOrder = async () => {
      try {
        const requestUpdateStatusOrder = await orderApi.updateStatusOrder(
          dataOrder._id,
          {
            status: "Đã Giao",
          }
        );
        console.log(requestUpdateStatusOrder);
        if (requestUpdateStatusOrder.status === 200) {
          setDataOrder(requestUpdateStatusOrder.data);
          setTimeout(() => {
            dispatch({
              type: ACTIOS.loadingOrderClient,
              payload: false,
            });
          }, 300);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUpdateStatusOrder();
  };
  return (
    <div className="d-flex wrap">
      <AsideAdmin />
      {state.loadingOrderClient ? (
        <Loading />
      ) : (
        <div className={style.listorderDetail_admin}>
          <div className={style.listorderDetail_admin_frame}>
            <div className="d-flex justify-content-between">
              <h6 style={{ fontSize: "20px" }}>
                Chi tiết đơn hàng{" "}
                <span className={style.id_orderDetai}>#{dataOrder?._id}</span>
              </h6>
              <p className={style.date_order} >
                Ngày đặt hàng: {dayOrder.hour}:{dayOrder.minute} {dayOrder.day}-
                {dayOrder.month}-{dayOrder.year}
              </p>
            </div>
            <div className={style.HeaderCheckout}>
              <div className={style.timeline}>
                <div className={style.title_timeline}>
                  <span className={style.title_waiting}>Đang xử lý</span>
                  <span
                    className={`${style.title_shipping} ${
                      activeTimeline1 ? style.active : ""
                    }`}
                  >
                    Đang giao hàng
                  </span>
                  <span
                    className={`${style.title_delivered} ${
                      activeTimeline2 ? style.active : ""
                    }`}
                  >
                    Đã giao
                  </span>
                  <span
                    className={`${style.title_cancel} ${
                      activeTimeline3 ? style.active : ""
                    }`}
                  >
                    Đã hủy
                  </span>
                </div>
                <div className={style.timeline_group}>
                  <div className={style.timeline_1}>1</div>
                  <div
                    className={`${style.line_1} ${
                      activeTimeline1 ? style.active : ""
                    }`}
                  ></div>
                  <div
                    className={`${style.timeline_2} ${
                      activeTimeline1 ? style.active : ""
                    }`}
                  >
                    2
                  </div>
                  <div
                    className={`${style.line_2} ${
                      activeTimeline2 ? style.active : ""
                    }`}
                  ></div>
                  <div
                    className={`${style.timeline_3} ${
                      activeTimeline2 ? style.active : ""
                    }`}
                  >
                    3
                  </div>
                  <div
                    className={`${style.line_3} ${
                      activeTimeline3 ? style.active : ""
                    }`}
                  ></div>
                  <div
                    className={`${style.timeline_4} ${
                      activeTimeline3 ? style.active : ""
                    }`}
                  >
                    4
                  </div>
                </div>
              </div>
            </div>
            <div className={`${style.address_methodpayment}`}>
              <div className={`${style.address_orderDetail}`}>
                <p style={{ marginBottom: "5px" }}>ĐỊA CHỈ NGƯỜI NHẬN</p>
                <div className={`${style.frameAdress}  d-flex flex-column`}>
                  <h6 style={{ fontWeight: "700" }}>{user?.userName}</h6>{" "}
                  <span>
                    Địa chỉ: {address?.apartmentNumber}, {address?.ward},{" "}
                    {address?.district}, {address?.city}
                  </span>
                  <span>Điện thoại: {user?.phone}</span>
                </div>
              </div>
              <div className={`${style.address_methodpaymentDetail}`}>
                <p style={{ marginBottom: "5px" }}>HÌNH THỨC THANH TOÁN</p>
                <div
                  className={`${style.frameMethodpayment}  d-flex flex-column`}
                >
                  Thanh toán tiền mặt khi nhận hàng
                </div>
              </div>
            </div>
            <div className={style.list_product_order_frame}>
              <div className={style.title_item_product}>
                <span className={style.title_image_item}>Sản phẩm</span>
                <span
                  className={`${style.title_price1} d-flex justify-content-center`}
                >
                  Giá
                </span>
                <span
                  className={`${style.title_quantity} d-flex justify-content-center`}
                >
                  Số lượng
                </span>
                <span
                  className={`${style.title_discount} d-flex justify-content-center`}
                >
                  Giảm giá
                </span>
                <span
                  className={`${style.title_price2} d-flex justify-content-center`}
                >
                  Thành tiền
                </span>
              </div>
              <div className={`${style.list_product_order}`}>
                {dataOrder?.products?.map((data, idx) => {
                  return (
                    <div key={idx}>
                      <ItemOrderDetailAdmin data={data} />
                    </div>
                  );
                })}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className={style.buttonUpdate}>
                  {dataOrder?.status !== "Đã Hủy" &&
                    dataOrder?.status !== "Đã Giao" && (
                      <span className={style.buttonCancelOrder}>
                        <i
                          class="fas fa-times-circle"
                          style={{ marginRight: "10px" }}
                        ></i>
                        Hủy đơn
                      </span>
                    )}
                  {dataOrder?.status === "Đang Xử Lý" && (
                    <span
                      className={style.buttonShipping}
                      onClick={hanleShipping}
                    >
                      <i
                        class="fas fa-check-circle"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Đang giao hàng
                    </span>
                  )}
                  {dataOrder?.status === "Đang Giao Hàng" && (
                    <span
                      className={style.buttonShipping}
                      onClick={hanleDeliveried}
                    >
                      <i
                        class="fas fa-check-circle"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Đã giao
                    </span>
                  )}
                  {dataOrder?.status === "Đã Giao" && (
                    <span className={style.buttonShipping}>
                      <i
                        class="fas fa-sticky-note"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Đơn đã giao thành công{" "}
                    </span>
                  )}
                  {dataOrder?.status === "Đã Hủy" && (
                    <span className={style.buttonCancelOrder}>
                      <i
                        class="fas fa-sticky-note"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Đơn đã bị hủy
                    </span>
                  )}
                </div>
                <div>
                  <div className={style.totalMoney}>
                    <span className={style.title_total}>Tổng cộng</span>
                    <span className={style.total}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(dataOrder?.amount)}
                    </span>
                  </div>
                  <div className={style.totalMoney}>
                    <span className={style.title_total}>Tổng cộng</span>
                    <span className={style.total}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(dataOrder?.amount)}
                    </span>
                  </div>{" "}
                  <div className={style.totalMoney}>
                    <span className={style.title_total}>Tổng cộng</span>
                    <span className={style.total}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(dataOrder?.amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListOrderDetailAdmin;
