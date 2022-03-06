import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductFilter from "features/Product/components/ProductFilter/ProductFilter";
import style from "./ListPage.module.scss";
import Product from "features/Product/components/Product/Product";
import ProductList from "features/Product/components/ProductList/ProductList";

import ProductSkeletonList from "features/Product/components/ProductSkeletonList/ProductSkeletonList";
import productApi from "../../../../api/productApi";
import imgbackground4 from "assets/images/auth/login/imgbackground4.jpg";

ListPage.propTypes = {};

function ListPage(props) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  //   const [filters, setFilters] = useState({
  //     _page: 1,
  //     _limit: 9,
  //     _sort: "salesPrice:ASC ",
  //   });
  //   const handleFiltersChange = (newFilters) => {
  //     setFilters((prevFilters) => {
  //         ...prevFilters,...newFilters
  //     })
  //   };

  useEffect(() => {
    (async () => {
      try {
        const reponse = await productApi.getAll({ _page: 1, _limit: 10 });
        console.log(reponse);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <div className={`${style.background_slider} `}>
        <div className={style.imgbackground}>
          <img src={imgbackground4} alt="" />
        </div>
        <div className={style.title_background}>
          Sản phẩm <p>Trang chủ / Áo thun trơn </p>
        </div>
      </div>
      <div className={`${style.listPage} wrap d-flex`}>
        <div className={style.left}>
          <ProductFilter />
        </div>
        <div className={style.right}>
          <p> Áo thun trơn (116 sản phẩm)</p>
          <p>Lọc theo: Kích thước (S)</p>
          {loading ? <ProductSkeletonList /> : <ProductList />}
        </div>
      </div>
    </div>
  );
}

export default ListPage;
