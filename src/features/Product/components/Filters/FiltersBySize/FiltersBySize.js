import React, { useContext } from "react";
import style from "./FiltersBySize.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function FiltersBySize(props) {
  const { dispatch, state } = useContext(GlobalContext);

  const handleChangeDataProduct = (data, idx) => async (e) => {
    // let size = [...datacheckbox];
    // if (e.target.checked == true) {
    //   size = [...datacheckbox, e.target.value];
    //   dispatch({
    //     type: ACTIOS.dataFilterSize,
    //     payload: size,
    //   });
    // } else {
    //   size.splice(datacheckbox.indexOf(e.target.value), 1);
    //   dispatch({
    //     type: ACTIOS.dataFilterSize,
    //     payload: size,
    //   });
    // }
    // setDataCheckbox(size);
    let prev = await state.dataFilterSize;
    let itemIndex = prev.indexOf(data);
    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1);
    } else {
      prev.push(data);
    }
    await dispatch({
      type: ACTIOS.dataFilterSize,
      payload: [...prev],
    });
  };
  return (
    <div className={style.size}>
      <span className={style.title}> Kích thước</span>
      <div className={`${style.groupcheckbox} d-flex align-items-center`}>
        {props.dataArraySize?.map((data, idx) => {
          return (
            <div
              className={`${style.checkbox} d-flex align-items-center`}
              key={idx}
            >
              <input
                type="checkbox"
                id={`size-checkbox-${idx}`}
                value={data}
                onChange={handleChangeDataProduct(data, idx)}
                checked={state.dataFilterSize.includes(data)}
              />
              <label htmlFor={`size-checkbox-${idx}`}>{data}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FiltersBySize;
