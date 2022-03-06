import React from "react";
import PropTypes from "prop-types";
import style from "./FiltersByBrand.module.scss";

FiltersByBrand.propTypes = {};

function FiltersByBrand(props) {
  return (
    <div className={style.brand}>
      <span className={style.title}> Hãng sản xuất</span>
      <div className={`${style.groupcheckbox} d-flex align-items-center`}>
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" id="all" /> <label for="all">Tất cả</label>
        </div>
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" id="Channel" />{" "}
          <label for="Channel">Channel</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Tất cả</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Tất cả</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Tất cả</label>
        </div>
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Tất cả</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Tất cả</label>
        </div>{" "}
        <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" /> <label>Tất cả</label>
        </div>
      </div>
    </div>
  );
}

export default FiltersByBrand;
