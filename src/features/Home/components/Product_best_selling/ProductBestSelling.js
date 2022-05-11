import React, { useContext, useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import style from "./ProductBestSelling.module.scss";

import Quickview from "components/Quickview/Quickview";

import productApi from "api/productApi";

import { useNavigate } from "react-router-dom";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import ListProductBestSeller from "./ListProductBestSeller/ListProductBestSeller";
function ProductBestSelling(props) {
  const [dataProduct, setDataProduct] = useState();
  const [dataProductDetailId, setDataProductDetailId] = useState();
  let navigate = useNavigate();
  const { dispatch, state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchRequestGetAllProdcut = async () => {
      try {
        const requestGetAllProduct = await productApi.getAllProductBestSeller();
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
          <ListProductBestSeller dataProduct={dataProduct} />
        </div>
        <Quickview onDataProduct={dataProduct} />
      </div>
    </>
  );
}

export default ProductBestSelling;
