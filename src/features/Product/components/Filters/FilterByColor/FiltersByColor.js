import React, {  useContext } from "react";
import style from "./FiltersByColor.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function FiltersByColor(props) {
  const { dispatch, state } = useContext(GlobalContext);

  const handleChangeDataProduct = (data, idx) => async (e) => {
    let prev = await state.dataFilterColor;
    let itemIndex = prev.indexOf(data);
    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1);
    } else {
      prev.push(data);
    }
    await dispatch({
      type: ACTIOS.dataFilterColor,
      payload: [...prev],
    });
    // let color = [...datacheckbox];
    // if (e.target.checked == true) {
    //   color = [...datacheckbox, e.target.value];
    //   // props.onReceiveDataColor(color);
    //   dispatch({
    //     type: ACTIOS.dataFilterColor,
    //     payload: color,
    //   });
    // } else {
    //   color.splice(datacheckbox.indexOf(e.target.value), 1);
    //   // props.onReceiveDataColor(color);
    //   dispatch({
    //     type: ACTIOS.dataFilterColor,
    //     payload: color,
    //   });
    // }
    // setDataCheckbox(color);
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
                id={`color-checkbox-${idx}`}
                value={data}
                onChange={handleChangeDataProduct(data, idx)}
                checked={state.dataFilterColor.includes(data)}
              />
              <label htmlFor={`color-checkbox-${idx}`}>{data}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FiltersByColor;
