import React from "react";
import PropTypes from "prop-types";
import style from "./Type.module.scss";
import aothuntron from "assets/images/type/aothuntron.jpg";
import aothuninhinh from "assets/images/type/aothuninhinh.jpg";
import aothunsoc from "assets/images/type/aothunsoc.jpg";

Type.propTypes = {};

function Type(props) {
  return (
    <div className="wrap section">
      <div
        className="row d-flex justify-content-around"
        style={{ background: "#f5f5f5" }}
      >
        <div className="col d-flex justify-content-center">
          <div className={`${style.item_type}  position-relative`}>
            <div className={`${style.background_type} position-relative`}>
              <div className={`${style.img_background} position-absolute`}>
                <img src={aothuntron} alt="ao thun tron" />
              </div>
            </div>
            <div className={`${style.content_type} position-absolute`}>
              <h2>
                <a href="/">Áo thun trơn</a>
              </h2>
              <p>Từ 100.000 vnđ</p>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center">
          <div className={`${style.item_type} position-relative`}>
            <div className={`${style.background_type} position-relative`}>
              <div className={`${style.img_background} position-absolute`}>
                <img src={aothuninhinh} alt="ao thun in hình" />
              </div>
            </div>
            <div className={style.content_type}>
              <h2>
                <a href="/">Áo thun in hình</a>
              </h2>
              <p>Giá từ 150.000 vnđ</p>
            </div>
          </div>
        </div>
        <div className="col d-flex justify-content-center">
          <div className={`${style.item_type} position-relative`}>
            <div className={`${style.background_type} position-relative`}>
              <div className={`${style.img_background} position-absolute`}>
                <img src={aothunsoc} alt="ao thun sọc" />
              </div>
            </div>
            <div className={style.content_type}>
              <h2>
                <a href="/">Áo thun sọc</a>
              </h2>
              <p>Giá từ 120.000 vnđ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Type;
