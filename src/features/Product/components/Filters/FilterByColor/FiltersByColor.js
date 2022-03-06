import React from "react";
import PropTypes from "prop-types";
import style from "./FiltersByColor.module.scss";

FiltersByColor.propTypes = {};

function FiltersByColor(props) {
  return (
    <div className={style.color}>
      <span className={style.title}> Màu sắc</span>
      <div className={`${style.groupcheckbox} d-flex align-items-center`}>
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Tất cả</label>
        </div>
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" style={{ background: "#fff" }} />{" "}
          <label>Đỏ</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Vàng</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Xanh lá</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Trắng</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Xanh dương</label>
        </div>
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Đen</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Xám</label>
        </div>
      </div>
    </div>
  );
}

export default FiltersByColor;
