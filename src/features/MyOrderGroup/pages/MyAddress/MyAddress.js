import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import imgbackground4 from "assets/images/auth/login/imgbackground4.jpg";
import style from "./MyOrder.module.scss";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import ao2_back from "assets/images/product_promotion/ao2_back.png";
import orderApi from "api/orderApi";
import { useSelector } from "react-redux";
import productApi from "api/productApi";
import ItemProductOrder from "./ItemProductOrder/ItemProductOrder";
import MyOrderAside from "features/MyOrderGroup/components/MyOrderAside/MyOrderAside";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import Loading from "components/Loading";

MyOrder.propTypes = {};

function MyOrder(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className={style.myorder}>
        <MyOrderAside />
        <div className={style.myorder_right}>
          <h6 style={{ fontSize: "20px" }}>Sổ địa chỉ</h6>
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
