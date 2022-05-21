import React, { useContext } from "react";
import classes from "./FormCancelOrderClient.module.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import orderApi from "api/orderApi";
import { useSelector } from "react-redux";

toast.configure();
const FormCancelOrderClient = (props) => {
  const { idOrder } = props;
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);
  const loggedInUser = useSelector((state) => state.user.current);
  console.log(idOrder);
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
    const fetchCancelOrder = async () => {
      try {
        const requestCancelOrder = await orderApi.updateStatusOrder(idOrder, {
          status: "Đã Hủy",
        });
        console.log(requestCancelOrder);
        if (requestCancelOrder.status === 200) {
          props.onFormFalse(false);

          dispatch({
            type: ACTIOS.loadingOrderClient,
            payload: true,
          });
          const fetchGetOrder = async () => {
            try {
              const requestGetOrder = await orderApi.getOrder(
                loggedInUser._id,
                ""
              );
              dispatch({
                type: ACTIOS.dataArrOrderClient,
                payload: requestGetOrder.data,
              });
              setTimeout(() => {
                dispatch({
                  type: ACTIOS.loadingOrderClient,
                  payload: false,
                });
              }, 300);
            } catch (error) {
              console.log(error);
            }
          };
          fetchGetOrder();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCancelOrder();
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

export default FormCancelOrderClient;
