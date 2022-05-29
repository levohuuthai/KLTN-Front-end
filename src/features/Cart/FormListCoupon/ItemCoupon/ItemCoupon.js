import React, { useContext, useEffect, useState } from "react";
import style from "../FormListCoupon.module.scss";
import { GlobalContext } from "store/store";

function ItemCoupon(props) {
  const [endDay, setEndDay] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
  });
  useEffect(() => {
    var date = new Date(props?.data.endDate);
    setEndDay({
      minute: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }, [props?.data.endDate]);
  const hanleSelectCodeCoupon = () => {
    props.onFormFalseItem({ turnOffForm: false, dataCoupon: props.data });
    localStorage.setItem("dataCoupon", JSON.stringify(props.data));
  };
  const [dataCouponLocal, setDataCouponLocal] = useState();

  useEffect(() => {
    setDataCouponLocal(JSON.parse(localStorage.getItem("dataCoupon"))); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [, localStorage.getItem("dataCoupon")]);
  //ĐÃ XÀI RỒI > CHƯA THỎA> ÁP DỤNG
  const { dispatch, state } = useContext(GlobalContext);
  const [notCondition, setNotCondition] = useState(false);
  const [priceCart, setPriceCart] = useState();

  useEffect(() => {
    var rs = state.dataCart.reduce((acc, val) => {
      return acc + val.product.priceAfter * val.product.quantity;
    }, 0);
    // if (rs < props.data?.priceToDiscount) {
    //   setNotCondition(true);
    // }
    setPriceCart(rs);
  }, [state.dataCart]);
  console.log(notCondition);
  return (
    <div
      className={`${style.item_coupon} ${
        dataCouponLocal?._id === props.data?._id ? style.activeBackground : ""
      }`}
    >
      <div
        className={`${
          priceCart < props.data?.priceToDiscount
            ? style.activeBackdrop
            : !props.data?.active
            ? style.activeBackdrop
            : dataCouponLocal?._id === props.data?._id
            ? style.activeBackdrop
            : ""
        }`}
      ></div>
      {!props.data?.active ? (
        <div className={style.notifySelected}>Đã xài rồi</div>
      ) : priceCart < props.data?.priceToDiscount ? (
        <div className={style.notifySelected}>CHƯA THỎA ĐIỀU KIỆN</div>
      ) : dataCouponLocal?._id === props.data?._id ? (
        <div className={style.notifySelected}>ĐÃ ÁP DỤNG</div>
      ) : (
        ""
      )}
      <div className={style.left}>
        <div
          className={`${style.lottery_box} ${
            props?.data?.type === "Ship" ? style.activeShip : ""
          }`}
        >
          <div className={`${style.price} d-flex flex-column `}>
            <span
              className={`${style.priceDiscount} ${
                props?.data?.type === "Ship" ? style.activeColorShip : ""
              }`}
            >
              {props?.data?.type === "Product" ? "GIẢM NGAY " : "FREESHIP TỪ"}
              <b style={{ marginLeft: "10px", fontSize: "22px" }}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(props?.data?.discount)}
              </b>
            </span>
            <span className={style.conditionPriceDiscount}>
              Cho đơn hàng từ{" "}
              <b style={{ fontSize: "18px" }}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(props?.data?.priceToDiscount)}
              </b>
            </span>
            <div className="d-flex justify-content-end">
              <span
                className={style.btnSaveCodeCoupon}
                onClick={hanleSelectCodeCoupon}
              >
                Áp dụng
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.right}  d-flex flex-column`}>
        <div className={style.date}>
          Hiệu lực đến
          <br />
          <b style={{ fontSize: "17px" }}>
            {endDay.hour.toString().length === 1
              ? "0" + endDay.hour
              : endDay.hour}
            :
            {endDay.minute.toString().length === 1
              ? "0" + endDay.minute
              : endDay.minute}
          </b>{" "}
          ngày{" "}
          <b style={{ fontSize: "17px" }}>
            {endDay.day.toString().length === 1 ? "0" + endDay.day : endDay.day}
            /
            {endDay.month.toString().length === 1
              ? "0" + endDay.month
              : endDay.month}
          </b>
        </div>
        <div className={style.date}>Số lượng có hạn</div>
      </div>
    </div>
  );
}

export default ItemCoupon;
