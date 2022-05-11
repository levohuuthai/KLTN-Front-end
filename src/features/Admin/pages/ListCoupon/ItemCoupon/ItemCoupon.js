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

    if (date < endDate) {
      setActiveEndDate(true);
    }
  }, []);
  return (
    <div className={`${style.item_coupon} `}>
      <span className={`${style.id}  d-flex justify-content-center`}>#sss</span>
      <span className={`${style.nameCoupon} d-flex justify-content-center`}>
        {props?.data.name}
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
        <span>{props?.data.type}</span>
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
