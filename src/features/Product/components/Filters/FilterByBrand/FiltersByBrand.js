import React, { useContext } from "react";
import style from "./FiltersByBrand.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function FiltersByBrand(props) {
  const { dispatch, state } = useContext(GlobalContext);
  const handleChangeDataProduct = (data, idx) => async (e) => {
    let prev = await state.dataFilterBrand;
    let itemIndex = prev.indexOf(data);
    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1);
    } else {
      prev.push(data);
    }
    await dispatch({
      type: ACTIOS.dataFilterBrand,
      payload: [...prev],
    });
  };
  return (
    <div className={style.brand}>
      <span className={style.title}> Hãng sản xuất</span>
      <div className={`${style.groupcheckbox} d-flex align-items-center`}>
        {props.dataArrayBrand?.map((data, idx) => {
          return (
            <div
              className={`${style.checkbox} d-flex align-items-center`}
              key={idx}
            >
              <input
                type="checkbox"
                id={`custom-checkbox-${idx}`}
                value={data}
                onChange={handleChangeDataProduct(data, idx)}
                checked={state.dataFilterBrand.includes(data)}
              />
              <label htmlFor={`custom-checkbox-${idx}`}>{data}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FiltersByBrand;
