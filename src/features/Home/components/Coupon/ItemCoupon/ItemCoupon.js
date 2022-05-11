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
        <div className={`${style.price} d-flex flex-column`}>
          <span style={{ marginBottom: "20px" }}>
            {props.data?.name}{" "}
            <b style={{ fontSize: "18px" }}>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(props.data?.priceToDiscount)}
            </b>
          </span>
          <div className="d-flex">
            <span
              style={{
                fontWeight: "500",
                fontSize: "18px",
                color: "#fff",
              }}
            >
              10 lượt/khách
            </span>
            <span className={style.btnSaveCodeCoupon} onClick={addSaveCoupon}>
              Lưu mã
            </span>
          </div>
        </div>
      </div>
      <div className={`${style.right}  d-flex flex-column`}>
        <div className={style.date}>
          Hiệu lực đến
          <br />
          <b style={{ fontSize: "17px" }}>
            {endDayCoupon.hour}:{endDayCoupon.minute}
          </b>{" "}
          ngày{" "}
          <b style={{ fontSize: "17px" }}>
            {endDayCoupon.day}/{endDayCoupon.month}
          </b>
        </div>
        <div className={style.date}>Số lượng có hạn</div>
      </div>
    </div>
  );
}

export default ItemCoupon;
