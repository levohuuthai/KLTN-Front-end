import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import style from "./FiltersByColor.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
FiltersByColor.propTypes = {};

function FiltersByColor(props) {
  const [datacheckbox, setDataCheckbox] = useState([]);
  const { dispatch, state } = useContext(GlobalContext);

  const handleChangeDataProduct = (data, idx) => (e) => {
    let color = [...datacheckbox];
    if (e.target.checked == true) {
      color = [...datacheckbox, e.target.value];
      // props.onReceiveDataColor(color);
      dispatch({
        type: ACTIOS.dataFilterColor,
        payload: color,
      });
    } else {
      color.splice(datacheckbox.indexOf(e.target.value), 1);
      // props.onReceiveDataColor(color);
      dispatch({
        type: ACTIOS.dataFilterColor,
        payload: color,
      });
    }
    setDataCheckbox(color);
  };
  return (
    <div className={style.color}>
      <span className={style.title}> Màu sắc</span>
      <div className={`${style.groupcheckbox} d-flex align-items-center`}>
        {props.dataArrayColor?.map((data, idx) => {
          return (
            <div
              className={`${style.checkbox} d-flex align-items-center`}
              key={idx}
            >
              <input
                type="checkbox"
                id={data}
                value={data}
                onChange={handleChangeDataProduct(data, idx)}
              />
              <label htmlFor={data}>{data}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FiltersByColor;
