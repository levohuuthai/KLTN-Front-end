import React from "react";
import { useSelector } from "react-redux";
import style from "./MyOrderAside.module.scss";
import { Link } from "react-router-dom";

function MyOrderAside(props) {
  const loggedInUser = useSelector((state) => state.user.current);

  return (
    <div className={style.myorder_left}>
      <div className={`${style.info_account} d-flex `}>
        <div className={style.avatar}>
          <img src={loggedInUser?.avatar} alt="avatar" />
        </div>
        <div className={style.name_account}>
          <span>Tài khoản của</span>{" "}
          <span style={{ color: "black", fontSize: "18px" }}>
            {loggedInUser?.userName}
          </span>
        </div>
      </div>
      <div className={`${style.list_category}`}>
        <div className={`${style.item_category} d-flex `}>
          <span>
            <i className="fas fa-user-alt"></i>
          </span>
          <span className="mx-3">Thông tin tài khoản</span>
        </div>
        <Link
          to="/customer/myorder"
          className={`${style.item_category} d-flex`}
        >
          <span>
            <i className="fas fa-tasks"></i>
          </span>
          <span className="mx-3">Quản lí đơn hàng</span>
        </Link>
        <Link
          to="/customer/myorder"
          className={`${style.item_category} d-flex`}
        >
          <span>
            <i className="far fa-credit-card"></i>
          </span>
          <span className="mx-3">Thông tin thanh toán</span>
        </Link>
        <Link
          to="/customer/myaddress"
          className={`${style.item_category} d-flex`}
        >
          <span>
            <i class="fas fa-map-marker-alt"></i>
          </span>
          <span className="mx-3">Sổ địa chỉ</span>
        </Link>
      </div>
    </div>
  );
}

export default MyOrderAside;
