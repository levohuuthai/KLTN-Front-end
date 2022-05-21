import React, { useEffect, useState } from "react";
import style from "../MyOrder.module.scss";
import orderApi from "api/orderApi";

function ItemProductOrder(props) {
  const [titleProduct, setTitleProduct] = useState("");
  const [dataProductDetail, setDataProductDetail] = useState("");

  useEffect(() => {
    const fetchGetProductDetailById = async () => {
      try {
        const requestProductDetailById =
          await orderApi.getProductDetailByIdProductDetail(
            props.data.productDetailId
          );
        setTitleProduct(requestProductDetailById.data.product.title);
        setDataProductDetail(requestProductDetailById.data.productDetail);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetProductDetailById(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`${style.item_order} d-flex justify-content-between`}>
      <div className={`${style.img_name_order} d-flex`}>
        <div className={style.img_order}>
          <img src={dataProductDetail?.image} alt="img prdocutdetail" />
          <div className={style.quantity}>x{props.data?.quantity}</div>
        </div>
        <div className={style.name_order}>
          {titleProduct}
          <div>
            <span className={style.size_order}>
              Size: {dataProductDetail?.size}
            </span>
            <span className={style.color_order}>
              Màu: {dataProductDetail?.color}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`${style.price_detail_order} d-flex flex-column justify-content-between align-items-end`}
      >
        <div className={style.price_order}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.data.priceAfter * props.data.quantity)}
        </div>
      </div>
    </div>
  );
}

export default ItemProductOrder;
