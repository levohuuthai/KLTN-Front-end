import React, { useEffect, useState } from "react";
import style from "../Type.module.scss";
import { Link } from "react-router-dom";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import productApi from "api/productApi";

function ItemTypeProduct(props) {
  const [dataProduct, setDataProduct] = useState();
  const handleDataProduct = (e) => {
    e.preventDefault();
    const fetchRequestGetAllProductByCategory = async () => {
      try {
        const requestGetAllProductByCategory =
          await productApi.getAllProductByCategory(props.data.name);
        setDataProduct(requestGetAllProductByCategory);
        console.log(requestGetAllProductByCategory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllProductByCategory();
  };

  // useEffect(() => {
  //   setDataProduct(dataProduct);
  //   console.log(dataProduct);
  // }, [dataProduct]);
  // console.log(dataProduct);
  return (
    <div className="col d-flex justify-content-center" key={props.idx}>
      <Link
        to="/products"
        state={{ nameTypeProduct: props.data }}
        onClick={handleDataProduct}
        key={props.idx}
      >
        <div className={`${style.item_type}  position-relative`}>
          <div className={`${style.background_type} position-relative`}>
            <div className={`${style.img_background} position-absolute`}>
              <img src={aothun2_front} alt="ao thun tron" />
            </div>
          </div>
          <div className={`${style.content_type} position-absolute`}>
            <h2>
              <p className={style.nameType}>{props.data.name}</p>
            </h2>
            <p>Từ 100.000 vnđ</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ItemTypeProduct;
