import React from "react";
import PropTypes from "prop-types";
import style from "./Insta.module.scss";
import insta1 from "assets/images/insta/insta1.jpg";

import insta2 from "assets/images/insta/insta2.jpg";
import insta6 from "assets/images/insta/insta6.jpg";

Insta.propTypes = {};

function Insta(props) {
  return (
    <div className={`${style.insta} wrap`}>
      <div className={`${style.title_insta}`}>
        <h2>Follow us on Instagram</h2>
        <p>@ Rubix Instagram</p>
      </div>
      <div className={`${style.list_img_insta} row`}>
        <div
          className={`${style.img_insta} col-xs-6 col-sm-4 col-lg-2 col-xlg-2`}
        >
          <a href="\">
            <img src={insta1} alt="" />
          </a>
          <div className={style.blur}>
            <div className="icon_insta">
              <i className="fab fa-instagram"></i>
            </div>
            <div className={style.bg}></div>
          </div>
        </div>
        <div
          className={`${style.img_insta} col-xs-6 col-sm-4 col-lg-2 col-xlg-2`}
        >
          <a href="\">
            <img src={insta2} alt="" />
          </a>{" "}
          <div className={style.blur}>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
        <div
          className={`${style.img_insta} col-xs-6 col-sm-4 col-lg-2 col-xlg-2`}
        >
          <a href="\">
            <img src={insta1} alt="" />
          </a>{" "}
          <div className={style.blur}>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
        <div
          className={`${style.img_insta} col-xs-6 col-sm-4 col-lg-2 col-xlg-2`}
        >
          <a href="\">
            <img src={insta1} alt="" />
          </a>{" "}
          <div className={style.blur}>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
        <div
          className={`${style.img_insta} col-xs-6 col-sm-4 col-lg-2 col-xlg-2`}
        >
          <a href="\">
            <img src={insta1} alt="" />
          </a>{" "}
          <div className={style.blur}>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
        <div
          className={`${style.img_insta} col-xs-6 col-sm-4 col-lg-2 col-xlg-2`}
        >
          <a href="\">
            <img src={insta6} alt="" />
          </a>{" "}
          <div className={style.blur}>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insta;
