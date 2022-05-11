import React, { useContext, useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import style from "./Product_promotion.module.scss";

import Quickview from "components/Quickview/Quickview";

import productApi from "api/productApi";

import ListProduct from "./ListProduct/ListProduct";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
function ProductPromotion(props) {
  // const dataProduct = [
  //   {
  //     productID: 1,
  //     name: "Áo thun trơn1",
  //   },
  //   {
  //     productID: 2,
  //     name: "Áo thun in hình2",
  //   },

  //   {
  //     productID: 3,
  //     name: "Áo thun trơn3",
  //   },
  //   {
  //     productID: 4,
  //     name: "Áo thun in hình4",
  //   },

  //   {
  //     productID: 5,
  //     name: "Áo thun trơn5",
  //   },
  //   {
  //     productID: 6,
  //     name: "Áo thun in hình6",
  //   },
  //   {
  //     productID: 7,
  //     name: "Áo thun in hình7",
  //   },
  // ];
  const [dataProduct, setDataProduct] = useState();
  const [dataProductDetailId, setDataProductDetailId] = useState();
  let navigate = useNavigate();
  const { dispatch, state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchRequestGetAllProdcut = async () => {
      try {
        const requestGetAllProduct = await productApi.getAllProductDiscount();
        console.log(requestGetAllProduct);
        setDataProduct(requestGetAllProduct.data);
        setDataProductDetailId(requestGetAllProduct.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllProdcut();
  }, []);
  const handleAllProductPromotion = () => {
    navigate("/discount");

    // const fetchRequestGetAllProductDiscount = async () => {
    //   try {
    //     const requestGetAllProductDiscount =
    //       await productApi.getAllProductDiscount();
    //     await dispatch({
    //       type: ACTIOS.dataProductDiscount,
    //       payload: requestGetAllProductDiscount.data,
    //     });
    //     navigate("/discount");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchRequestGetAllProductDiscount();
  };
  return (
    <>
      <div className={`${style.trend_product} wrap section`}>
        <div className={`${style.title_trend}`}>
          <h2>Khuyến mãi hấp dẫn</h2>
          <p>
            Những sản phẩm áo thun mới nhất, tuyệt vời nhất đã được RUBIX cập
            nhật
          </p>
        </div>
        <p className={style.watchAll} onClick={handleAllProductPromotion}>
          Xem tất cả
        </p>
        <div className={`${style.list_trend_product} `}>
          <div className={`prevElProductpromotion ${style.prevEl}`}></div>{" "}
          <div className={`nextElProductpromotion ${style.nextEl}`}></div>
          <ListProduct dataProduct={dataProduct} />
        </div>
        <Quickview onDataProduct={dataProduct} />
      </div>
    </>
  );
}

export default ProductPromotion;
