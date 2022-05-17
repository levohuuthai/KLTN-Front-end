import couponApi from "api/couponApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "../Coupon.module.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function ItemCoupon(props) {
  const [endDayCoupon, setEndDayCoupon] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
  });
  useEffect(() => {
    var date = new Date(props.data?.endDate);
    setEndDayCoupon({
      minute: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }, [props.data]);
  const loggedInUser = useSelector((state) => state.user.current);

  const addSaveCoupon = () => {
    const fetchRequestAddCoupon = async () => {
      try {
        const requestAddCoupon = await couponApi.addCoupon({
          couponId: props.data?._id,
          userId: loggedInUser._id,
        });
        if (requestAddCoupon.status === 200) {
          toast.success("Thêm mã giảm giá thành công", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Mã giảm giá này bạn đã lưu rồi", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
    };
    fetchRequestAddCoupon();
  };
  return (
    <div className={style.item_coupon}>
      <div className={style.left}>
        <div
          className={`${style.lottery_box} ${
            props.data?.type === "Ship" ? style.activeShip : ""
          }`}
        >
          <div className={`${style.price} d-flex flex-column `}>
            <span
              className={`${style.priceDiscount} ${
                props.data?.type === "Ship" ? style.activeColorShip : ""
              }`}
            >
              {props.data?.type === "Product" ? "GIẢM NGAY " : "FREESHIP TỪ"}
              <b style={{ marginLeft: "10px", fontSize: "22px" }}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(props.data?.discount)}
              </b>
            </span>
            <span className={style.conditionPriceDiscount}>
              Cho đơn hàng từ{" "}
              <b style={{ fontSize: "18px" }}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(props.data?.priceToDiscount)}
              </b>
            </span>
            <div className="d-flex justify-content-end">
              <span className={style.btnSaveCodeCoupon} onClick={addSaveCoupon}>
                Lưu mã
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
            {endDayCoupon.hour.toString().length === 1
              ? "0" + endDayCoupon.hour
              : endDayCoupon.hour}
            :
            {endDayCoupon.minute.toString().length === 1
              ? "0" + endDayCoupon.minute
              : endDayCoupon.minute}
          </b>{" "}
          ngày{" "}
          <b style={{ fontSize: "17px" }}>
            {endDayCoupon.day.toString().length === 1
              ? "0" + endDayCoupon.day
              : endDayCoupon.day}
            /
            {endDayCoupon.month.toString().length === 1
              ? "0" + endDayCoupon.month
              : endDayCoupon.month}
          </b>
        </div>
        <div className={style.date}>Số lượng có hạn</div>
      </div>
    </div>
  );
}

export default ItemCoupon;
