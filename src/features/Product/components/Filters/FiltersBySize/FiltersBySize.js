import React from "react";
import PropTypes from "prop-types";
import style from "./FiltersBySize.module.scss";

FiltersBySize.propTypes = {};

function FiltersBySize(props) {
  return (
    <div className={style.size}>
      <span className={style.title}> Kích thước</span>
      <div className={`${style.groupcheckbox} d-flex align-items-center`}>
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <div className={`${style.checkbox} d-flex align-items-center`}>
            <input type="checkbox" /> <label>Tất cả</label>
          </div>{" "}
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>S</label>
        </div>
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>M</label>
        </div>
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>L</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>XL</label>
        </div>
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>2XL</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>3XL</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>5XL</label>
        </div>
      </div>
    </div>
  );
}

export default FiltersBySize;
