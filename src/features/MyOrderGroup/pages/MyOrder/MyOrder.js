import React, { useContext, useEffect, useState } from "react";
import style from "./MyOrder.module.scss";
import orderApi from "api/orderApi";
import { useSelector } from "react-redux";
import ItemProductOrder from "./ItemProductOrder/ItemProductOrder";
import MyOrderAside from "features/MyOrderGroup/components/MyOrderAside/MyOrderAside";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import Loading from "components/Loading";
import FormCancelOrderClient from "./FormCancelOrderClient/FormCancelOrderClient";
import ItemOrder from "./ItemOrder/ItemOrder";

MyOrder.propTypes = {};

function MyOrder(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const loggedInUser = useSelector((state) => state.user.current);
  let navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [idName, setIdName] = useState("");

  const { dispatch, state } = useContext(GlobalContext);

  useEffect(() => {
    dispatch({
      type: ACTIOS.loadingOrderClient,
      payload: true,
    });
    const fetchGetOrder = async () => {
      try {
        const requestGetOrder = await orderApi.getOrder(
          loggedInUser._id,
          status
        );
        dispatch({
          type: ACTIOS.dataArrOrderClient,
          payload: requestGetOrder.data,
        });
        setTimeout(() => {
          dispatch({
            type: ACTIOS.loadingOrderClient,
            payload: false,
          });
        }, 300);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetOrder(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  const handleAllOrder = () => {
    setStatus("");
  };
  const handleAllOrderWaiting = () => {
    setStatus("Đang Xử Lý");
  };
  const handleAllOrderShipping = () => {
    setStatus("Đang Giao Hàng");
  };
  const handleAllOrderDelivered = () => {
    setStatus("Đã Giao");
  };
  const handleAllOrderCancel = () => {
    setStatus("Đã Hủy");
  };
  const handleEnterIdNameProduct = (e) => {
    setIdName(e.target.value);
  };
  const handleSearchOrder = () => {
    console.log(idName);
    const fetchGetOrderById = async () => {
      try {
        const requestOrderById = await orderApi.getOrderById(idName);
        // console.log(requestOrderById);
        // setArrOrder(requestOrderById.data);
        // dispatch({
        //   type: ACTIOS.dataArrOrderClient,
        //   payload: requestOrderById.data,
        // });
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetOrderById();
  };
  // const [isOpenFormCancelOrder, seIsOpenFormCancelOrder] = useState(false);
  // const handleShowFormCancelOrder = () => {
  //   seIsOpenFormCancelOrder(true);
  // };
  // const falseFromCancelOrder = () => {
  //   seIsOpenFormCancelOrder(false);
  // };


  return (
    <div>
      {/* <div className={`${style.background_slider} `}>
        <div className={style.imgbackground}>
          <img src={imgbackground4} alt="" />
        </div>
        <div className={style.title_background}>
          Đơn hàng của tôi <p>Trang chủ / Đơn hàng của tôi </p>
        </div>
      </div> */}
      <div className={style.myorder}>
        <MyOrderAside />
        <div className={style.myorder_right}>
          <h6 style={{ fontSize: "20px" }}>Đơn hàng của tôi</h6>
          <div className={`${style.tab_order} d-flex justify-content-between`}>
            <span
              className={`${style.allOrder} ${
                status === "" ? style.active : ""
              }`}
              onClick={handleAllOrder}
            >
              Tất cả đơn{" "}
              {status === "" ? `(${state.dataArrOrderClient.length})` : ""}
            </span>
            <span
              className={`${style.allOrder} ${
                status === "Đang Xử Lý" ? style.active : ""
              }`}
              onClick={handleAllOrderWaiting}
            >
              Đang xử lý
              {status === "Đang Xử Lý"
                ? `(${state.dataArrOrderClient.length})`
                : ""}
            </span>
            <span
              className={`${style.allOrder} ${
                status === "Đang Giao Hàng" ? style.active : ""
              }`}
              onClick={handleAllOrderShipping}
            >
              Đang giao{" "}
              {status === "Đang Giao Hàng"
                ? `(${state.dataArrOrderClient.length})`
                : ""}
            </span>
            <span
              className={`${style.allOrder} ${
                status === "Đã Giao" ? style.active : ""
              }`}
              onClick={handleAllOrderDelivered}
            >
              Đã giao
              {status === "Đã Giao"
                ? `(${state.dataArrOrderClient.length})`
                : ""}
            </span>
            <span
              className={`${style.allOrder} ${
                status === "Đã Hủy" ? style.active : ""
              }`}
              onClick={handleAllOrderCancel}
            >
              Đã hủy
              {status === "Đã Hủy"
                ? `(${state.dataArrOrderClient.length})`
                : ""}
            </span>
          </div>
          <div
            className={`${style.search_order} d-flex justify-content-between`}
          >
            <div className={`${style.input_search} d-flex`}>
              <span>
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                name="search"
                placeholder="Tìm đơn hàng theo mã đơn hàng, tên sản phẩm"
                onChange={handleEnterIdNameProduct}
              ></input>
            </div>
            <div className={style.line}></div>
            <div className={style.btn_search} onClick={handleSearchOrder}>
              Tìm đơn hàng
            </div>
          </div>
          {state.loadingOrderClient ? (
            <Loading />
          ) : (
            [...state.dataArrOrderClient]?.reverse().map((dataOrder, idx) => {
              console.log(dataOrder);
              const handleDetailOrder = () => {
                navigate("/customer/myorder/detail", {
                  state: {
                    data: dataOrder,
                  },
                });
              };
              const handleCancelOrder = () => {
                // const fetchCancelOrder = async () => {
                //   try {
                //     const requestCancelOrder = await orderApi.updateStatusOrder(
                //       dataOrder._id,
                //       { status: "Đã Hủy" }
                //     );
                //     console.log(requestCancelOrder);
                //     if (requestCancelOrder.status === 200) {
                //       dispatch({
                //         type: ACTIOS.loadingOrderClient,
                //         payload: true,
                //       });
                //       const fetchGetOrder = async () => {
                //         try {
                //           const requestGetOrder = await orderApi.getOrder(
                //             loggedInUser._id,
                //             status
                //           );
                //           dispatch({
                //             type: ACTIOS.dataArrOrderClient,
                //             payload: requestGetOrder.data,
                //           });
                //           setTimeout(() => {
                //             dispatch({
                //               type: ACTIOS.loadingOrderClient,
                //               payload: false,
                //             });
                //           }, 300);
                //         } catch (error) {
                //           console.log(error);
                //         }
                //       };
                //       fetchGetOrder();
                //     }
                //   } catch (error) {
                //     console.log(error);
                //   }
                // };
                // fetchCancelOrder();
              };
              return (
                <div className={style.value_tab_order} key={idx}>
                  <ItemOrder dataOrder={dataOrder} />
                  {/* <h6 style={{ color: "rgb(128, 128, 137)" }}>
                    <i
                      className="fas fa-truck-moving"
                      style={{ marginRight: "10px" }}
                    ></i>
                    <span
                      className={`${style.statusItem} ${
                        dataOrder.status === "Đang Giao Hàng"
                          ? style.activeShipping
                          : dataOrder.status === "Đã Giao"
                          ? style.activeDelivered
                          : dataOrder.status === "Đã Hủy"
                          ? style.activeCancel
                          : dataOrder.status === "Đang Xử Lý"
                          ? style.activeWaitting
                          : ""
                      }`}
                    >
                      {" "}
                      {dataOrder.status}
                    </span>
                  </h6>
                  <div className={style.line_value_tab_order}></div>
                  <div
                    className={`${style.list_order} d-flex justify-content-between flex-column`}
                  >
                    {dataOrder.products.map((data, idx) => {
                      return (
                        <div key={idx}>
                          <ItemProductOrder data={data} dataOrder={dataOrder} />
                        </div>
                      );
                    })}
                  </div>
                  <div className={style.detail_total_order}>
                    <span className={style.title_total_order}>
                      Tổng tiền:{" "}
                      <span className={style.total_order}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(dataOrder.amount)}
                      </span>
                    </span>
                    <div>
                      {dataOrder.status === "Đang Xử Lý" && (
                        <span
                          className={style.cancel_order}
                          onClick={handleShowFormCancelOrder}
                        >
                          Hủy đơn hàng
                        </span>
                      )}
                      <span
                        className={style.detail_order}
                        onClick={handleDetailOrder}
                      >
                        Xem chi tiết
                      </span>
                    </div>
                  </div>
                  <FormCancelOrderClient
                    isOpenFormCancelOrder={isOpenFormCancelOrder}
                    onFormFalse={falseFromCancelOrder}
                    idOrder={dataOrder._id}
                    // onReceiveDataOrder={handleReceiveDataOrderFromCancelOrder}
                  >
                    Bạn có chắc chắn <b>Hủy</b> đơn hàng này không?
                  </FormCancelOrderClient> */}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
