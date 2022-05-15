import React from "react";
import style from "../Statistic.module.scss";

function ItemStatisticProduct(props) {
  return (
    <div className={`${style.item_product} d-flex justify-content-between`}>
      <span
        className={`${style.top} d-flex justify-content-center  align-items-center`}
      >
        1
      </span>{" "}
      <span className={style.image}>
        <img src={props.data?.image_front} alt="img" />
      </span>
      <span
        className={`${style.name_product} d-flex justify-content-center align-items-center`}
      >
        {props.data?.title}
      </span>
      <span
        className={`${style.quantityPurchase} d-flex justify-content-center align-items-center`}
      >
        {props.data?.soldQuantity}
      </span>
      <span
        className={`${style.quantityStock}  d-flex justify-content-center align-items-center`}
      >
        {props.data?.countInStock}
      </span>
    </div>
  );
}

export default ItemStatisticProduct;
