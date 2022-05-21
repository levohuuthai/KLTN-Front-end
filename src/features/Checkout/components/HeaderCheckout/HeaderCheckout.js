import React, { useEffect, useState } from "react";
import style from "./HeaderCheckout.module.scss";
import logoRubic from "assets/images/logoRubic.png";
import { useLocation } from "react-router-dom";

function HeaderCheckout(props) {
  const location = useLocation();
  const [activeTimeline3, setActiveTimeLine3] = useState(false);
  useEffect(() => {
    if (location.pathname === "/checkout/payment") {
      setActiveTimeLine3(true);
    } else {
      setActiveTimeLine3(false);
    }
  }, [location.pathname]);
  return (
    <div className={style.HeaderCheckout}>
      <div className={`${style.logo}`}>
        <a href="/">
          <img src={logoRubic} alt="" />
        </a>
      </div>
      <div className={style.timeline}>
        <div className={style.title_timeline}>
          <span style={{ marginLeft: "35px" }}>Đăng nhập</span>{" "}
          <span style={{ marginLeft: "140px" }}>Địa chỉ giao hàng</span>
          <span style={{ marginLeft: "80px" }}> Thanh toán và Đặt mua</span>
        </div>
        <div className={style.timeline_group}>
          <div className={style.timeline_1}>1</div>
          <div className={style.line_1}></div>
          <div className={style.timeline_2}>2</div>
          <div
            className={`${style.line_2} ${activeTimeline3 ? style.active : ""}`}
          ></div>
          <div
            className={`${style.timeline_3} ${
              activeTimeline3 ? style.active : ""
            }`}
          >
            3
          </div>
        </div>
      </div>
      <div className={`${style.contact}`}>
        <i className="bi bi-telephone-outbound"></i>
        <span
          className={`${style.phone} d-flex flex-column align-items-center`}
        >
          0327364753<span className={style.day_hour}>8-21h, cả T7 và CN</span>
        </span>
      </div>
    </div>
  );
}

export default HeaderCheckout;
