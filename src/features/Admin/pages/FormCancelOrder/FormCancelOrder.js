import React, { useContext } from "react";
import classes from "./FormCancelOrder.module.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import orderApi from "api/orderApi";

toast.configure();
const FormCancelOrder = (props) => {
  const { idOrder } = props;
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormCancelOrder) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormCancelOrder]);
  const hanleUpdateStatus = () => {
    props.onFormFalse(false);
    dispatch({
      type: ACTIOS.loadingOrderClient,
      payload: true,
    });
    const fetchUpdateStatusOrder = async () => {
      try {
        const requestUpdateStatusOrder = await orderApi.updateStatusOrder(
          idOrder,
          {
            status: "Đã Hủy",
          }
        );
        console.log(requestUpdateStatusOrder);
        if (requestUpdateStatusOrder.status === 200) {
          props.onReceiveDataOrder(requestUpdateStatusOrder.data);
          setTimeout(() => {
            dispatch({
              type: ACTIOS.loadingOrderClient,
              payload: false,
            });
          }, 300);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUpdateStatusOrder();
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
          <p>{props.children}</p>
        </div>
        <div className={classes.footer}>
          <div className={classes.button}>
            <button className={classes.cancel} onClick={cancelHandler}>
              Không
            </button>
            <button className={classes.confirm} onClick={hanleUpdateStatus}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCancelOrder;
