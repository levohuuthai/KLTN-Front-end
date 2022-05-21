import React, { useContext, useState } from "react";
import style from "../ListProductDetailAdmin.module.scss";
import FormUpdateProductDetail from "../../FormUpdateProductDetail/FormUpdateProductDetail";
import FormDeleteProductDetail from "../../FormDeleteProductDetail/FormDeleteProductDetail";
import productAdminApi from "api/admin/productAdminApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import productApi from "api/productApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function ItemProductDetailAdmin(props) {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const { dispatch } = useContext(GlobalContext);

  const handleActiveDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };
  const [isForm, setIsForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isOpenFormDeleteProductDetail, seIsOpenFormDeleteProductDetail] =
    useState(false);

  const handleShowFormUpdateProductDetail = () => {
    setIsForm(true);
  };
  const handleShowFormDeleteProductDetail = () => {
    seIsOpenFormDeleteProductDetail(true);
  };
  const formfalseHandler = (falseFromForm) => {
    setIsForm(falseFromForm);
  };
  const falseFromLogOut = () => {
    seIsOpenFormDeleteProductDetail(false);
  };
  // console.log(props.dataProduct._id);
  const handleReSell = () => {
    setLoading(true);

    const fetchRequestResellProductDetail = async () => {
      try {
        const requestResellProductDetail =
          await productAdminApi.resellProductDetail(
            props.dataProduct._id,
            props.data._id
          );
        if (requestResellProductDetail.status === 200) {
          const fetchRequestGetAllProductDetail = async () => {
            try {
              const requestGetAllProductDetail =
                await productApi.getIdProductDetail(props.dataProduct._id);
              dispatch({
                type: ACTIOS.dataAllProductDetail,
                payload: requestGetAllProductDetail.data,
              });
              setLoading(false);
              toast.success("Bán lại thành công", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
              });
            } catch (error) {
              console.log(error);
            }
          };
          fetchRequestGetAllProductDetail();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestResellProductDetail();
  };
  // console.log(props.data.color_image.image);

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
        ></div>
        {props.data.active === false && (
          <div className={style.cover_notify}>
            <div className={style.notify_stop_selling}>Ngừng bán</div>
          </div>
        )}
        {props.data.active === false && (
          <div className={style.button_resell} onClick={handleReSell}>
            {loading ? (
              <div
                class="spinner-border"
                role="status"
                style={{ width: "22px", height: "22px" }}
              >
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              <span>Bán lại</span>
            )}
          </div>
        )}
        <p className={`${style.image_item_product}`}>
          <img src={props.data.image} alt="anh chi tiet"></img>
        </p>
        <span
          className={`${style.size}  d-flex justify-content-center flex-column`}
        >
          {props.data?.size}
        </span>
        <span className={`${style.color} d-flex justify-content-center`}>
          {props.data?.color}
        </span>
        <span className={`${style.stock} d-flex justify-content-center`}>
          {props.data?.countInStock}
        </span>
        <span className={`${style.price} d-flex justify-content-center`}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.data?.price.original)}
        </span>
        <span
          className={`${style.title_percentoff} d-flex justify-content-center`}
        >
          {props.data?.price.discount * 100}%
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
                    <li onClick={handleShowFormUpdateProductDetail}>
                      <span>Cập nhật</span>
                    </li>
                    <li onClick={handleShowFormDeleteProductDetail}>
                      <span>Ngưng bán</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </span>
      </div>
      <FormUpdateProductDetail
        isForm={isForm}
        onFormFalse={formfalseHandler}
        dataProductDetail={props.data}
        dataProduct={props.dataProduct}
      />{" "}
      <FormDeleteProductDetail
        isOpenFormDeleteProductDetail={isOpenFormDeleteProductDetail}
        onFormFalse={falseFromLogOut}
        dataProductDetail={props.data}
        dataProduct={props.dataProduct}
      ></FormDeleteProductDetail>
    </>
  );
}

export default ItemProductDetailAdmin;
