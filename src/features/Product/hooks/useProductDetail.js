import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import productApi from "api/productApi";
export default function useProductDetail(props) {
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const dataProduct = location.state?.dataProduct;
  useEffect(() => {
    const fetchRequestGetProductDetail = async () => {
      try {
        dataProduct.productDetail.map(async (data) => {
          const requestGetProductDetail = await productApi.getIdProductDetail(
            dataProduct._id
          );
          setProduct(requestGetProductDetail?.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetProductDetail();
  });
  return { product };
}
