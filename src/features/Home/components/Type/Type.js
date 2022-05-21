import React, { useState, useEffect, useContext } from "react";
import style from "./Type.module.scss";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import { Link } from "react-router-dom";
import typeProductApi from "api/typeProductApi";
import { useSelector } from "react-redux";
import productApi from "api/productApi";
import ItemTypeProduct from "./ItemTypeProduct/ItemTypeProduct";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
function Type(props) {
  const [dataTypeProduct, setDataTypeProduct] = useState();
  const [dataProduct, setDataProduct] = useState([]);
  const [dataNameTypeProduct, setDataNameTypeProduct] = useState();
  const { dispatch, state } = useContext(GlobalContext);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchRequestGetAllTypeProdcut = async () => {
      try {
        const requestGetAllTypeProduct =
          await typeProductApi.getAllTypeProduct();
        setDataTypeProduct(requestGetAllTypeProduct.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllTypeProdcut();
  }, []);
  return (
    <div className="wrap section">
      <div className="row d-flex justify-content-around">
        {dataTypeProduct?.slice(0, 3).map((data, idx) => {
          const handleDataProduct = async (e) => {
            e.preventDefault();
            navigate("/products", {
              state: {
                dataArrayTypeProduct: dataTypeProduct,
                nameTypeProduct: data.name,
              },
            });
          };
          return (
            <div className="col d-flex justify-content-center" key={idx}>
              <Link
                to="/products"
                // state={{ nameTypeProduct: data, dataProduct: dataProduct }}
                onClick={handleDataProduct}
              >
                <div className={`${style.item_type}  position-relative`}>
                  <div className={`${style.background_type} position-relative`}>
                    <div
                      className={`${style.img_background} position-absolute`}
                    >
                      <img src={data?.image} alt="ao thun tron" />
                    </div>
                  </div>
                  <div className={`${style.content_type} position-absolute`}>
                    <h2>
                      <p className={style.nameType}>{data.name}</p>
                    </h2>
                    <p>
                      Từ{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(data.priceMin)}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            // <div key={idx}>
            //   <ItemTypeProduct idx={idx} data={data} />
            // </div>
          );
        })}
      </div>
    </div>
  );
}

export default Type;
