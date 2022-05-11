import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "./FiltersByPrice.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
FiltersByPrice.propTypes = {};

function FiltersByPrice(props) {
  const { dispatch, state } = useContext(GlobalContext);

  const price = [
    { priceMin: 199999 },
    { priceMin: 200000, priceMax: 500000 },
    { priceMin: 500000, priceMax: 1000000 },
    { priceMin: 1000001 },
  ];

  const [activeToggleColor, setActiveToggleColor] = useState({
    activeObject: null,
    objects: price,
  });
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

  return (
    <div>
      <span className={style.title}> Giá</span>
      <div className={style.group_price}>
        {price.map((data, index) => {
          const toggleActive = (index) => {
            setActiveToggleColor({
              ...activeToggleColor,
              activeObject: activeToggleColor?.objects[index],
            });
          };
          const toggleActiveStyle = (index) => {
            if (
              activeToggleColor?.objects[index] ===
              activeToggleColor?.activeObject
            ) {
              return style.active;
            } else {
              return style.notactive;
            }
          };
          const inActiveColor = (e) => {
            toggleActive(index);

            // props.onReceivePrice(data);
            if (data?.priceMin === 199999) {
              dispatch({
                type: ACTIOS.dataFilterPriceUnder200,
                payload: data.priceMin,
              });
              dispatch({
                type: ACTIOS.dataFilterPriceOver1000,
                payload: undefined,
              });
              dispatch({
                type: ACTIOS.dataFilterPriceFrom200To1000,
                payload: undefined,
              });
            } else if (data?.priceMin === 1000001) {
              dispatch({
                type: ACTIOS.dataFilterPriceOver1000,
                payload: data.priceMin,
              });
              dispatch({
                type: ACTIOS.dataFilterPriceFrom200To1000,
                payload: undefined,
              });
              dispatch({
                type: ACTIOS.dataFilterPriceUnder200,
                payload: undefined,
              });
            } else {
              dispatch({
                type: ACTIOS.dataFilterPriceFrom200To1000,
                payload: data,
              });
              dispatch({
                type: ACTIOS.dataFilterPriceUnder200,
                payload: undefined,
              });
              dispatch({
                type: ACTIOS.dataFilterPriceOver1000,
                payload: undefined,
              });
            }
          };

          return data.priceMin < 200000 ? (
            <div
              className={style.price}
              className={`${style.price} ${toggleActiveStyle(index)} `}
              onClick={inActiveColor}
              key={index}
            >
              Dưới{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.priceMin + 1)}
            </div>
          ) : data.priceMin >= 200000 && data.priceMin <= 1000000 ? (
            <div
              className={style.price}
              className={`${style.price} ${toggleActiveStyle(index)} `}
              onClick={inActiveColor}
              key={index}
            >
              Từ{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.priceMin)}{" "}
              -{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.priceMax)}
            </div>
          ) : (
            <div
              className={style.price}
              className={`${style.price} ${toggleActiveStyle(index)} `}
              onClick={inActiveColor}
              key={index}
            >
              Trên{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.priceMin - 1)}
            </div>
          );
        })}
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

export default FiltersByPrice;
