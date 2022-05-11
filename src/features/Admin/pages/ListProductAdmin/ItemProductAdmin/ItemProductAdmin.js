import React, { useContext, useState } from "react";
import style from "../ListProductAdmin.module.scss";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import FormUpdateProduct from "../../FormUpdateProduct/FormUpdateProduct";
import { useNavigate } from "react-router-dom";
import FormDeleteProduct from "../../FormDeleteProduct/FormDeleteProduct";
import productAdminApi from "api/admin/productAdminApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function ItemProductAdmin(props) {
  let navigate = useNavigate();
  const { dispatch, state } = useContext(GlobalContext);
  const [activeDropdown, setActiveDropdown] = useState(false);
  const handleActiveDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };
  const [isForm, setIsForm] = useState(false);
  const [isOpenFormDeleteProduct, seIsOpenFormDeleteProduct] = useState(false);
  const handleShowFormUpdateProduct = () => {
    setIsForm(true);
  };
  const handleShowFormDeleteProduct = () => {
    seIsOpenFormDeleteProduct(true);
  };
  const formfalseHandler = (falseFromForm) => {
    setIsForm(falseFromForm);
  };
  const falseFromLogOut = () => {
    seIsOpenFormDeleteProduct(false);
  };
  const handleLinkProductDetail = () => {
    navigate("/admin/listdetailproduct", {
      state: {
        dataProduct: props.data,
      },
    });
  };
  const handleReSell = () => {
    const fetchRequestResellProduct = async () => {
      try {
        const requestResellProduct = await productAdminApi.resellProduct(
          props.data._id
        );
        console.log(requestResellProduct);
        if (requestResellProduct.status === 200) {
          dispatch({
            type: ACTIOS.loadingAllProduct,
            payload: true,
          });
          const fetchRequestGetAllProduct = async () => {
            try {
              const requestGetAllProduct = await productAdminApi.getAllProduct(
                state.filterPagination._page,
                state.filterPagination._limit
              );
              dispatch({
                type: ACTIOS.dataAllProduct,
                payload: requestGetAllProduct.data,
              });
              dispatch({
                type: ACTIOS.loadingAllProduct,
                payload: false,
              });
            } catch (error) {
              console.log(error);
            }
          };
          fetchRequestGetAllProduct();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestResellProduct();
  };
  return (
    <>
      <div
        className={`${
          style.item_product
        } d-flex justify-content-between align-items-center ${
          props.idx % 2 === 0 ? style.zebra : ""
        } ${props.data.active === false ? style.stop_selling : ""}`}
      >
        <div
          className={`${
            props.data.active === false ? style.stop_selling_backdrop : ""
          }`}
        ></div>{" "}
        {props.data.active === false && (
          <div className={style.cover_notify}>
            <div className={style.notify_stop_selling}>Ngừng bán</div>
          </div>
        )}
        {props.data.active === false && (
          <div className={style.button_resell} onClick={handleReSell}>
            Bán lại
          </div>
        )}
        <p className={`${style.image_item_product}`}>
          <img src={props.data.image_front}></img>
        </p>
        <span
          className={`${style.name_item} d-flex justify-content-center flex-column`}
        >
          {props.data.title}
        </span>
        <span className={`${style.brand} d-flex justify-content-center`}>
          {props.data.brand}
        </span>
        <span className={`${style.collar} d-flex justify-content-center`}>
          {props.data.collar}
        </span>
        <span
          className={`${style.fabricMaterial} d-flex justify-content-center`}
        >
          {props.data.fabricMaterial}
        </span>
        <span className={`${style.origin} d-flex justify-content-center`}>
          {props.data.origin}
        </span>
        <span className={`${style.close} d-flex justify-content-center`}>
          <div className={style.delete}>
            <nav>
              <ul>
                <li
                  className={`${style.ItemDelete} ${
                    activeDropdown ? style.active : ""
                  } `}
                  onClick={handleActiveDropdown}
                >
                  <i className="fas fa-ellipsis-h"></i>
                  <ul className={`${style.dropdown} `}>
                    <li onClick={handleLinkProductDetail}>
                      <a>Xem chi tiết</a>
                    </li>
                    <li onClick={handleShowFormUpdateProduct}>
                      <a>Cập nhật</a>
                    </li>
                    <li onClick={handleShowFormDeleteProduct}>
                      <a>Ngừng bán</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </span>
      </div>
      <FormUpdateProduct
        isForm={isForm}
        onFormFalse={formfalseHandler}
        dataProduct={props.data}
      />
      <FormDeleteProduct
        isOpenFormDeleteProduct={isOpenFormDeleteProduct}
        onFormFalse={falseFromLogOut}
        dataProduct={props.data}
      ></FormDeleteProduct>
    </>
  );
}

export default ItemProductAdmin;
