import React, { useEffect, useState } from "react";
import style from "../ListCoupon.module.scss";

function ItemCoupon(props) {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const handleActiveDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };
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
  const [activeEndDate, setActiveEndDate] = useState(false);

  useEffect(() => {
    var date = new Date();
    var endDate = new Date(props?.data.endDate);

    if (date > endDate) {
      setActiveEndDate(true);
    }
  }, []);
  return (
    <div
      className={`${style.item_coupon} ${
        props.idx % 2 === 0 ? style.zebra : ""
      }`}
    >
      <div className={`${activeEndDate ? style.locked_backdrop : ""}`}></div>{" "}
      {activeEndDate && (
        <div className={style.cover_notify}>
          <div className={style.notify_endDate}>Đã hết hạn</div>
        </div>
      )}
      <span
        className={`${style.conditionToDiscount} d-flex justify-content-center`}
      >
        Đơn hàng từ{" "}
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props?.data.priceToDiscount)}
      </span>
      <span className={`${style.priceOff} d-flex justify-content-center`}>
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props?.data.discount)}
        </span>
      </span>
      <span className={`${style.category} d-flex justify-content-center`}>
        <span>
          {props?.data.type === "Ship" ? "Phí Giao Hàng" : "Phí Đơn Hàng"}
        </span>
      </span>
      <span className={`${style.endDay}  d-flex justify-content-center`}>
        {endDay.hour.toString.length === 1 ? "0" + endDay.hour : endDay.hour}:
        {endDay.minute.toString.length === 1
          ? "0" + endDay.minute
          : endDay.minute}{" "}
        {endDay.day}-{endDay.month}-{endDay.year}
      </span>
      <span className={`${style.close} d-flex justify-content-center`}>
        <div className={style.delete}>
          <nav>
            <ul>
              <li
                className={`${style.ItemDelete} ${
                  activeDropdown ? style.active : ""
                } `}
                onClick={handleActiveDropdown}
              >
                <i className="fas fa-ellipsis-h"></i>
                <ul className={`${style.dropdown} `}>
                  <li>Cập nhật giảm giá</li>
                  <li>Xóa mã giảm giá</li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </span>
    </div>
  );
}

export default ItemCoupon;
