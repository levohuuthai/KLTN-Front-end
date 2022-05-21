import style from "./FiltersByStar.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import React, { useContext } from "react";

function FiltersByStar(props) {
  const { dispatch, state } = useContext(GlobalContext);

  const handleSelect5Star = () => {
    dispatch({
      type: ACTIOS.dataFilterStar,
      payload: {
        value: 5,
        active: true,
        active4: false,
        active3: false,
        active2: false,
      },
    });
  };
  const handleSelect4Star = () => {
    dispatch({
      type: ACTIOS.dataFilterStar,
      payload: {
        value: 4,
        active: false,
        active4: true,
        active3: false,
        active2: false,
      },
    });
  };
  const handleSelect3Star = () => {
    dispatch({
      type: ACTIOS.dataFilterStar,
      payload: {
        value: 3,
        active: false,
        active4: false,
        active3: true,
        active2: false,
      },
    });
  };
  const handleSelect2Star = () => {
    dispatch({
      type: ACTIOS.dataFilterStar,
      payload: {
        value: 2,
        active: false,
        active4: false,
        active3: false,
        active2: true,
      },
    });
  };
  return (
    <div>
      <span className={style.title}> Đánh giá</span>
      <div className={style.groupstar}>
        <div
          className={`${style.fivestar} ${
            state.dataFilterStar.active ? style.active : ""
          } d-flex justify-content-between align-items-center`}
          onClick={handleSelect5Star}
        >
          <div className="d-flex ">
            <div>Từ 5 sao</div>
            <div style={{ marginLeft: "40px" }}>
              <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
              <i className="bi bi-star-fill " style={{ color: "#ba933e" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
            </div>
          </div>
          {state.dataFilterStar.active && (
            <i
              className="fas fa-check-circle"
              style={{ color: "#47d147", marginRight: "20px" }}
            ></i>
          )}
        </div>
        <div
          className={`${style.fourstar} ${
            state.dataFilterStar.active4 ? style.active : ""
          } d-flex justify-content-between align-items-center`}
          onClick={handleSelect4Star}
        >
          <div className="d-flex">
            <div>Từ 4 sao</div>
            <div style={{ marginLeft: "40px" }}>
              <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
              <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
              <i
                className="bi bi-star-fill"
                style={{ color: " rgb(167, 167, 167)" }}
              ></i>
            </div>
          </div>
          {state.dataFilterStar.active4 && (
            <i
              className="fas fa-check-circle"
              style={{ color: "#47d147", marginRight: "20px" }}
            ></i>
          )}
        </div>
        <div
          className={`${style.fourstar} ${
            state.dataFilterStar.active3 ? style.active : ""
          } d-flex justify-content-between align-items-center`}
          onClick={handleSelect3Star}
        >
          {" "}
          <div className="d-flex">
            <div>Từ 3 sao</div>
            <div style={{ marginLeft: "40px" }}>
              <i className="bi bi-star-fill" style={{ color: "#ba933e" }}></i>
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
            </div>{" "}
          </div>{" "}
          {state.dataFilterStar.active3 && (
            <i
              className="fas fa-check-circle"
              style={{ color: "#47d147", marginRight: "20px" }}
            ></i>
          )}
        </div>{" "}
        <div
          className={`${style.fourstar} ${
            state.dataFilterStar.active2 ? style.active : ""
          } d-flex justify-content-between align-items-center`}
          onClick={handleSelect2Star}
        >
          <div className="d-flex">
            <div>Từ 2 sao</div>
            <div style={{ marginLeft: "40px" }}>
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
            </div>
          </div>{" "}
          {state.dataFilterStar.active2 && (
            <i
              className="fas fa-check-circle"
              style={{ color: "#47d147", marginRight: "20px" }}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
}

export default FiltersByStar;
