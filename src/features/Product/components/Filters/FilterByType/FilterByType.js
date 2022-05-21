import React, { useContext } from "react";
import style from "./FilterByType.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function FilterByType(props) {
  const { dispatch, state } = useContext(GlobalContext);

  const handleChangeDataProductByStyle = (data, idx) => async (e) => {
    let prev = await state.dataFilterStyle;
    let itemIndex = prev.indexOf(data.name);
    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1);
    } else {
      prev.push(data.name);
    }
    await dispatch({
      type: ACTIOS.dataFilterStyle,
      payload: [...prev],
    });
    // if (e.target.checked) {
    //   props.onReceiveDataTypeProduct(data.name);
    // }
  };
  return (
    <>
      {props.dataArrayTypeProduct?.map((data, idx) => {
        return (
          <div
            className={`${style.checkbox} d-flex align-items-center`}
            key={idx}
          >
            <input
              type="checkbox"
              id={`style-checkbox-${idx}`}
              value={data.name}
              onChange={handleChangeDataProductByStyle(data, idx)}
              checked={state.dataFilterStyle.includes(data.name)}
            />
            <label htmlFor={`style-checkbox-${idx}`}>{data.name}</label>
          </div>
        );
      })}
    </>
  );
}

export default FilterByType;
