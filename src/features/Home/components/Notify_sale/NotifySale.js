import React from "react";
import PropTypes from "prop-types";
import style from "./Notify_sale.module.scss";

NotifySale.propTypes = {};

function NotifySale(props) {
  return (
    <div
      className={`${style.slideshow_bg} wrap section d-flex flex-column justify-content-center align-items-center`}
    >
      <div className={`${style.slideshow} `}>
        <p>
          Miễn phí vận chuyển đơn hàng, <span>từ 200.000 vnđ</span>
        </p>
        <h2>
          Mùa sale yêu thương
          <br />
          giảm đến 50%
        </h2>
        <p className={style.price_week}>Giá trong tuần này:</p>
        <h4>Giảm giá tới 50% so với giá thông thường</h4>
        <a href="/">
          Shop Collection<i className="fas fa-angle-right"></i>
        </a>
      </div>
    </div>
  );
}

export default NotifySale;
