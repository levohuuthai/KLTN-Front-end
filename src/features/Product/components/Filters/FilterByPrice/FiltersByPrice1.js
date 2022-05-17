import React, { useContext, useState } from "react";
import style from "./FiltersByPrice.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function FiltersByPrice1(props) {
  const { dispatch, state } = useContext(GlobalContext);



  const [lowPrice, setLowPrice] = useState();
  const [highPrice, setHighPrice] = useState();

  const handleLowPrice = (e) => {
    setLowPrice(e.target.value);
  };
  const handleHighPrice = (e) => {
    setHighPrice(e.target.value);
  };

  const handleChangeProductByPrice = () => {
    dispatch({
      type: ACTIOS.dataFilterPriceFrom200To1000,
      payload: { priceMin: lowPrice, priceMax: highPrice },
    });
    console.log(state);
  };

  const handleSelectUnder200 = () => {
    dispatch({
      type: ACTIOS.dataFilterPriceUnder200,
      payload: { value: 199999, active: true },
    });
    dispatch({
      type: ACTIOS.dataFilterPriceOver1000,
      payload: { value: undefined, active: false },
    });
    dispatch({
      type: ACTIOS.dataFilterPrice200To500,
      payload: {
        priceMin: undefined,
        priceMax: undefined,
        active: false,
        active500To1000: false,
      },
    });
  };
  const handleSelectOver1000 = () => {
    dispatch({
      type: ACTIOS.dataFilterPriceOver1000,
      payload: { value: 1000001, active: true },
    });
    dispatch({
      type: ACTIOS.dataFilterPriceUnder200,
      payload: { value: undefined, active: false },
    });
    dispatch({
      type: ACTIOS.dataFilterPrice200To500,
      payload: {
        priceMin: undefined,
        priceMax: undefined,
        active: false,
        active500To1000: false,
      },
    });
  };
  const handleSelect200To500 = () => {
    dispatch({
      type: ACTIOS.dataFilterPrice200To500,
      payload: {
        priceMin: 200000,
        priceMax: 500000,
        active: true,
        active500To1000: false,
      },
    });
    dispatch({
      type: ACTIOS.dataFilterPriceUnder200,
      payload: { value: undefined, active: false },
    });
    dispatch({
      type: ACTIOS.dataFilterPriceOver1000,
      payload: { value: undefined, active: false },
    });
  };
  const handleSelect500To1000 = () => {
    dispatch({
      type: ACTIOS.dataFilterPrice200To500,
      payload: {
        priceMin: 500000,
        priceMax: 1000000,
        active: false,
        active500To1000: true,
      },
    });
    dispatch({
      type: ACTIOS.dataFilterPriceUnder200,
      payload: { value: undefined, active: false },
    });
    dispatch({
      type: ACTIOS.dataFilterPriceOver1000,
      payload: { value: undefined, active: false },
    });
  };
  return (
    <div>
      <span className={style.title}> Giá</span>
      <div className={style.group_price}>
        <div
          className={`${style.price}  ${
            state.dataFilterPriceUnder200.active === true ? style.active : ""
          }`}
          onClick={handleSelectUnder200}
        >
          Dưới{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(200000)}
        </div>{" "}
        <div
          className={`${style.price}  ${
            state.dataFilterPrice200To500.active === true ? style.active : ""
          }`}
          onClick={handleSelect200To500}
        >
          Từ{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(200000)}{" "}
          -{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(500000)}
        </div>
        {/* Tu 500 den 1tr */}
        <div
          className={`${style.price}  ${
            state.dataFilterPrice200To500.active500To1000 === true
              ? style.active
              : ""
          }`}
          onClick={handleSelect500To1000}
        >
          Từ{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(500000)}{" "}
          -{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(1000000)}
        </div>
        {/* tren 1000 */}{" "}
        <div
          className={`${style.price}  ${
            state.dataFilterPriceOver1000.active === true ? style.active : ""
          }`}
          onClick={handleSelectOver1000}
        >
          Trên{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(1000000)}
        </div>
        <div>Chọn khoảng giá</div>
        <div className={style.inputprice}>
          <span>
            <input
              type="text"
              placeholder="Thấp nhất"
              onChange={handleLowPrice}
            ></input>
          </span>
          <span> - </span>
          <span>
            <input
              type="text"
              placeholder="Cao nhất"
              onChange={handleHighPrice}
            ></input>
          </span>
        </div>
        <button onClick={handleChangeProductByPrice}>Áp dụng</button>
      </div>
    </div>
  );
}

export default FiltersByPrice1;
