import React, { useState, useEffect } from "react";
import style from "../MyOrderDetail.module.scss";
import orderApi from "api/orderApi";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import FormReviewProduct from "components/FormReviewProduct/FormReviewProduct";

function ItemProductOrderDetail(props) {
  const [titleProduct, setTitleProduct] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");

  const [activeNotifyReview, setActiveNotifyReview] = useState(false);

  useEffect(() => {
    const fetchGetProductDetailById = async () => {
      try {
        const requestProductDetailById =
          await orderApi.getProductDetailByIdProductDetail(
            props.data.productDetailId
          );
        setTitleProduct(requestProductDetailById.data.product.title);
        setBrand(requestProductDetailById.data.product.brand);
        setColor(requestProductDetailById.data.productDetail.color_image.color);
        setSize(requestProductDetailById.data.productDetail.size);
        setImage(requestProductDetailById.data.productDetail.color_image.image);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetProductDetailById();
  }, []);

  const [isOpenFormReview, seIsOpenFormReview] = useState(false);
  const handleShowFWishList = () => {
    seIsOpenFormReview(true);
  };
  const falseFormReview = () => {
    seIsOpenFormReview(false);
  };
  const handleReceiveNotify = (dataTrue) => {
    setActiveNotifyReview(dataTrue);
    setTimeout(() => {
      setActiveNotifyReview(false);
    }, 2000);
  };
  return (
    <>
      <div
        className={`${style.item_product_order} d-flex justify-content-between align-items-center`}
      >
        <div className={`${style.image_item_order}`}>
          <img src={image}></img>
          <div className={style.name_order}>
            {titleProduct}
            <div>
              <span className={style.size_order}>
                Size: <b style={{ fontSize: "15px" }}>{size}</b>
              </span>
              <span className={style.color_order}>
                Màu: <b style={{ fontSize: "15px" }}>{color}</b>
              </span>
              <p className={style.brand_order}>
                Thương hiệu: <b style={{ fontSize: "15px" }}>{brand}</b>
              </p>
            </div>
            <span className={style.write_review} onClick={handleShowFWishList}>
              Viết nhận xét
            </span>
          </div>
        </div>

        <span className={`${style.price1} d-flex justify-content-center`}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.data.priceAfter)}
        </span>
        <span className={`${style.quantity} d-flex justify-content-center`}>
          {props.data.quantity}
        </span>
        <span className={`${style.discount} d-flex justify-content-center`}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(
            props.dataOrder?.discountProduct + props.dataOrder?.discountShip
          )}
        </span>
        <span className={`${style.price2} d-flex justify-content-center`}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(
            props.data.priceAfter * props.data.quantity -
              (props.dataOrder?.discountProduct + props.dataOrder?.discountShip)
          )}
        </span>
      </div>
      <div
        className={`${style.notify_add_Review} ${
          activeNotifyReview ? style.active : ""
        }`}
      >
        <p>Cảm ơn bạn đã đánh giá sản phẩm này</p>
      </div>
      <FormReviewProduct
        isOpenFormReview={isOpenFormReview}
        onFormFalse={falseFormReview}
        dataProductDetail={props.data}
        titleProduct={titleProduct}
        color={color}
        size={size}
        brand={brand}
        image={image}
        onActiveNotifyReview={handleReceiveNotify}
      />
    </>
  );
}

export default ItemProductOrderDetail;
