import orderApi from "api/orderApi";
import React, { useEffect, useState } from "react";
import style from "../ListOrderDetailAdmin.module.scss";

function ItemOrderDetailAdmin(props) {
  const [dataProductDetail, setDataProductDetail] = useState("");
  const [dataProduct, setDataProduct] = useState("");

  useEffect(() => {
    const fetchGetProductDetailById = async () => {
      try {
        const requestProductDetailById =
          await orderApi.getProductDetailByIdProductDetail(
            props.data.productDetailId
          );
        setDataProductDetail(requestProductDetailById.data.productDetail);
        setDataProduct(requestProductDetailById.data.product);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetProductDetailById(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`${style.item_product_order} d-flex justify-content-between align-items-center`}
    >
      <div className={`${style.image_item_order}`}>
        <img src={dataProductDetail?.image} alt="img"></img>
        <div className={style.name_order}>
          {dataProduct?.titleProduct}
          <div>
            <span className={style.size_order}>
              Size:{" "}
              <b style={{ fontSize: "15px" }}>{dataProductDetail?.size}</b>
            </span>
            <span className={style.color_order}>
              Màu:{" "}
              <b style={{ fontSize: "15px" }}>{dataProductDetail?.color}</b>
            </span>
            <p className={style.brand_order}>
              Thương hiệu:{" "}
              <b style={{ fontSize: "15px" }}>{dataProduct?.brand}</b>
            </p>
          </div>
        </div>
      </div>

      <span className={`${style.price1} d-flex justify-content-center`}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.data.priceBefore)}
      </span>
      <span className={`${style.quantity} d-flex justify-content-center`}>
        {props.data.quantity}
      </span>
      <span className={`${style.discount} d-flex justify-content-center`}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(
          (props.data.priceBefore - props.data.priceAfter) * props.data.quantity
        )}
      </span>
      <span className={`${style.price2} d-flex justify-content-center`}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(
          props.data.priceBefore * props.data.quantity -
            (props.data.priceBefore - props.data.priceAfter) *
              props.data.quantity
        )}
      </span>
    </div>
  );
}

export default ItemOrderDetailAdmin;
