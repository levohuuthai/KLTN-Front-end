import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./MyCartAside.module.scss";
import { GlobalContext } from "../../store/store";
import { ACTIOS } from "../../store/actions";

MyCartAside.propTypes = {};

function MyCartAside(props) {
  const { dispatch, state } = useContext(GlobalContext);
  const { activeCart } = state;

  const closeMyCart = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIOS.ActiveShowCart, payload: false });
  };
  return (
    <aside
      className={`${style.my_cart_aside} ${
        activeCart ? style.active_my_cart_aside : ""
      }`}
    >
      <div className={style.blur_cart_aside}></div>
      <div className={style.container_cart}>
        <div
          className={`${style.title_cart} d-flex align-items-center justify-content-between`}
        >
          <h2>Giỏ hàng của bạn</h2>
          <a href="/" className={style.close_cart} onClick={closeMyCart}>
            <i className="bi bi-x"></i>
          </a>
        </div>
        <div className={`${style.mini_cart} flex-column`}>
          <div className={style.list_cart_product} id="scroll-2">
            <div
              className={`${style.item_product_cart} d-flex align-items-start`}
            >
              <div className={style.img_product_cart}>
                <a href="">
                  <img src="../images/trend-product02.jpg" alt="" />
                </a>
              </div>
              <div className={style.name_product_cart}>
                <a href="">Check Cotton T-shirt</a>
                <p>1 x $21.00</p>
              </div>
              <div className={style.close_product_cart}>
                <i className="bi bi-x"></i>
              </div>
            </div>
          </div>
          <div className={style.minicart_bot}>
            <div
              className={`${style.subtotal_group} d-flex justify-content-between align-items-center`}
            >
              <h2>Tổng tiền:</h2>
              <p className={style.subtotal}>$0.00</p>
            </div>
            <div>
              <a
                href="../html/viewcart.html"
                target="_blank"
                className={style.view_cart}
              >
                Xem chi tiết giỏ hàng
              </a>
            </div>
            <div>
              <a
                href="../html/checkout.html"
                target="_blank"
                className={style.checkout}
              >
                Thanh toán
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default MyCartAside;
