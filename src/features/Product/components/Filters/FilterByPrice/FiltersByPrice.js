import React from "react";
import PropTypes from "prop-types";
import style from "./FiltersByPrice.module.scss";

FiltersByPrice.propTypes = {};

function FiltersByPrice(props) {
  return (
    <div>
      <span className={style.title}> Giá</span>
      <div className={style.group_price}>
        <div className={style.price}>Dưới 200.000 vnđ</div>
        <div className={style.price}>Từ 200.000 vnđ - 500.000 vnđ</div>
        <div className={style.price}>Từ 500.000 vnđ - 1.000.000 vnđ</div>
        <div className={style.price}>Trên 1.000.000 vnđ</div>
        <div>Chọn khoảng giá</div>
        <div className={style.inputprice}>
          <span>
            <input type="text"></input>
          </span>
          <span> - </span>
          <span>
            <input type="text"></input>
          </span>
        </div>
        <button>Áp dụng</button>
      </div>
    </div>
  );
}

export default FiltersByPrice;
