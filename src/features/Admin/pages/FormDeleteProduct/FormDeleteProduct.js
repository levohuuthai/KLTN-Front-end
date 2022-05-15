import React, { useContext } from "react";
import classes from "./FormDeleteProduct.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productAdminApi from "api/admin/productAdminApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import productApi from "api/productApi";
toast.configure();
const FormDeleteProduct = (props) => {
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);

  let navigate = useNavigate();

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormDeleteProduct) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormDeleteProduct]);

  const handleDeleProduct = (event) => {
    event.preventDefault();
    const fetchRequestDeleteProduct = async () => {
      try {
        const requestDeleteProduct = await productAdminApi.deleteProduct(
          props.dataProduct._id
        );
        console.log(requestDeleteProduct);
        if (requestDeleteProduct.status === 200) {
          dispatch({
            type: ACTIOS.loadingAllProduct,
            payload: true,
          });
          props.onFormFalse(false);
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
          toast.success("Ngưng bán thành công", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestDeleteProduct();
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
            Bạn có muốn ngừng bán
            <b>
              <i> {props.dataProduct.title} </i>
            </b>
            ?
          </p>
        </div>
        <div className={classes.footer}>
          <div className={classes.button}>
            <button className={classes.cancel} onClick={cancelHandler}>
              Không
            </button>
            <button className={classes.confirm} onClick={handleDeleProduct}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDeleteProduct;
