import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCancelOrderClient from "../FormCancelOrderClient/FormCancelOrderClient";
import ItemProductOrder from "../ItemProductOrder/ItemProductOrder";
import style from "../MyOrder.module.scss";

function ItemOrder({ dataOrder }) {
  const [isOpenFormCancelOrder, seIsOpenFormCancelOrder] = useState(false);
  const handleShowFormCancelOrder = () => {
    seIsOpenFormCancelOrder(true);
  };
  const falseFromCancelOrder = () => {
    seIsOpenFormCancelOrder(false);
  };
  let navigate = useNavigate();

  const handleDetailOrder = () => {
    navigate("/customer/myorder/detail", {
      state: {
        data: dataOrder,
      },
    });
  };
  return (
    <>
      {" "}
      <h6 style={{ color: "rgb(128, 128, 137)" }}>
        <i className="fas fa-truck-moving" style={{ marginRight: "10px" }}></i>
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
          <span className={style.detail_order} onClick={handleDetailOrder}>
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
      </FormCancelOrderClient>
    </>
  );
}

export default ItemOrder;
