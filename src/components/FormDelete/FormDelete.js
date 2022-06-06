import React, { useContext } from "react";
import classes from "./FormDelete.module.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import wishlishApi from "api/wishlishApi";

toast.configure();
const FormDelete = (props) => {
  const {
    methodDeleteApi,
    dataDeleteApi,
    data2DeleteApi,
    methodGetApi,
    dataGetApi,
    action,
  } = props;
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormDelete) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormDelete]);

  const handleDelete = (event) => {
    event.preventDefault();
    if (action === "dataCart") {
      dispatch({
        type: ACTIOS.loadingPageCart,
        payload: true,
      });
    }
    const fetchRequestDelete = async () => {
      try {
        const requestDelete = await methodDeleteApi(
          dataDeleteApi,
          data2DeleteApi
        );
        if (requestDelete.status === 200) {
          //   dispatch({
          //     type: ACTIOS.loadingAllProduct,
          //     payload: true,
          //   });
          props.onFormFalse(false);
          const fetchRequestGet = async () => {
            try {
              const requestGet = await methodGetApi(dataGetApi);
              console.log(requestGet);
              if (action === "dataAllUser") {
                dispatch({
                  type: action,
                  payload: requestGet.data?.users,
                });
              } else if (action === "dataAllShipper") {
                dispatch({
                  type: action,
                  payload: requestGet.data?.users,
                });
              } else if (action === "dataWishList") {
                dispatch({
                  type: action,
                  payload: requestGet.data?.products,
                });
              } else if (action === "dataCart") {
                dispatch({
                  type: action,
                  payload: requestGet.data,
                });
              }
              if (action === "dataCart") {
                dispatch({
                  type: ACTIOS.loadingPageCart,
                  payload: false,
                });
              }
            } catch (error) {
              console.log(error);
            }
          };
          fetchRequestGet();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestDelete();
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
            <button className={classes.confirm} onClick={handleDelete}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDelete;
