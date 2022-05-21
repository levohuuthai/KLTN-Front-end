import React, { useContext } from "react";
import classes from "./FormDeleteProductDetail.module.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productAdminApi from "api/admin/productAdminApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import productApi from "api/productApi";
toast.configure();
const FormDeleteProductDetail = (props) => {
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch } = useContext(GlobalContext);

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormDeleteProductDetail) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormDeleteProductDetail]);

  const handleDeleProductDetail = (event) => {
    event.preventDefault();
    const fetchRequestDeleteProductDetail = async () => {
      try {
        const requestDeleteProductDetail =
          await productAdminApi.deleteProductDetail(
            props.dataProduct._id,
            props.dataProductDetail._id
          );
        console.log(requestDeleteProductDetail);
        if (requestDeleteProductDetail.status === 200) {
          dispatch({
            type: ACTIOS.loadingAllProduct,
            payload: true,
          });
          props.onFormFalse(false);
          const fetchRequestGetProductDetail = async () => {
            try {
              props.dataProduct.productDetail.map(async (data) => {
                const requestGetProductDetail =
                  await productApi.getIdProductDetail(props.dataProduct._id);
                dispatch({
                  type: ACTIOS.dataAllProductDetail,
                  payload: requestGetProductDetail.data,
                });
              });
            } catch (error) {
              console.log(error);
            }
          };
          fetchRequestGetProductDetail();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestDeleteProductDetail();
  };

  return (
    <div className={classes.modalFormLogOut}>
      <div className={` ${classes.backdrop} ${isOpenForm}`}></div>
      <div className={` ${classes.viewFormLogOut} ${isOpenForm}`}>
        <div className={classes.header}>
          <h2>Xác nhận</h2>
          <div className={classes.cancel} onClick={cancelHandler}>
            <div className={classes.blur}>
              <i className="bi bi-x"></i>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <p>
            Bạn có muốn xóa
            <b>
              <i>
                {props.dataProduct.title} - {props.dataProductDetail?.size} -{" "}
                {props.dataProductDetail?.color}{" "}
              </i>
            </b>
            này khỏi hệ thống?
          </p>
        </div>
        <div className={classes.footer}>
          <div className={classes.button}>
            <button className={classes.cancel} onClick={cancelHandler}>
              Không
            </button>
            <button
              className={classes.confirm}
              onClick={handleDeleProductDetail}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDeleteProductDetail;
