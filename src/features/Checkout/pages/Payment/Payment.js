import React from "react";
import PropTypes from "prop-types";
import style from "./Payment.module.scss";

Payment.propTypes = {};

function Payment(props) {
  return (
    <div>
      <div className={style.payment}>
        <div className={style.payment_left}>
          <div className={style.infor_order}>Thông tin đơn hàng</div>
        </div>
        <div className={style.payment_right}>
          <div className={style.address}>Địa chỉ</div>{" "}
          <div className={style.coupon}>Khuyến mãi</div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
