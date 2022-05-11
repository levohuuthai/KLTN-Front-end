import React from "react";
import PropTypes from "prop-types";
import style from "./FiltersByStar.module.scss";

FiltersByStar.propTypes = {};

function FiltersByStar(props) {
  return (
    <div>
      <span className={style.title}> Đánh giá</span>
      <div className={style.groupstar}>
        <div className={`${style.fivestar} d-flex justify-content-between`}>
          <span>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i className="bi bi-star-fill " style={{ color: "#ba933e" }}></i>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
          </span>

          <span>5 sao</span>
        </div>
        <div className={`${style.fourstar} d-flex justify-content-between`}>
          <span>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i
              className="bi bi-star-fill"
              style={{ color: " rgb(167, 167, 167)" }}
            ></i>
          </span>
          <span>4 sao</span>
        </div>
        <div className={`${style.fourstar} d-flex justify-content-between`}>
          <span>
            <i className="bi bi-star-fill" style={{ color: "#ba933e", }}></i>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i
              className="bi bi-star-fill"
              style={{ color: " rgb(167, 167, 167)" }}
            ></i>
            <i
              className="bi bi-star-fill"
              style={{ color: " rgb(167, 167, 167)" }}
            ></i>
          </span>
          <span>3 sao</span>
        </div>{" "}
        <div className={`${style.fourstar} d-flex justify-content-between`}>
          <span>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            <i
              className="bi bi-star-fill"
              style={{ color: " rgb(167, 167, 167)" }}
            ></i>
            <i
              className="bi bi-star-fill"
              style={{ color: " rgb(167, 167, 167)" }}
            ></i>
            <i
              className="bi bi-star-fill"
              style={{ color: " rgb(167, 167, 167)" }}
            ></i>
          </span>
          <span>2 sao</span>
        </div>
      </div>
    </div>
  );
}

export default FiltersByStar;
