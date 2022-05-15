import React, { useContext } from "react";
import classes from "./FormDeleteCoupon.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productAdminApi from "api/admin/productAdminApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import productApi from "api/productApi";
import couponAdminApi from "api/admin/couponAdminApi";
toast.configure();
const FormDeleteCoupon = (props) => {
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormDeleteCoupon) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormDeleteCoupon]);

  const handleDeleteCoupon = (event) => {
    event.preventDefault();
    const fetchRequestDeleteCoupon = async () => {
      try {
        const requestDeleteCoupon = await couponAdminApi.deleteCouponAdmin(
          props.dataCoupon?._id
        );
        if (requestDeleteCoupon.status === 200) {
          props.onFormFalse(false);
          toast.success("Xóa mã giảm giá thành công", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
          const fetchRequestGetAllCoupon = async () => {
            try {
              const requestGetAllCoupon =
                await couponAdminApi.getAllCouponAdmin();
              dispatch({
                type: ACTIOS.dataAllCoupon,
                payload: requestGetAllCoupon.data,
              });
            } catch (error) {
              console.log(error);
            }
          };
          fetchRequestGetAllCoupon();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestDeleteCoupon();
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
          <p>Bạn có chắc chắn muốn xóa mã giảm giá này không?</p>
        </div>
        <div className={classes.footer}>
          <div className={classes.button}>
            <button className={classes.cancel} onClick={cancelHandler}>
              Không
            </button>
            <button className={classes.confirm} onClick={handleDeleteCoupon}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDeleteCoupon;
