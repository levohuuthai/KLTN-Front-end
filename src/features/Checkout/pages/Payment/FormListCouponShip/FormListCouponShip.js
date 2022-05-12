import React, { useContext } from "react";
import style from "./FormListCouponShip.module.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import couponApi from "api/couponApi";
import { useSelector } from "react-redux";
import ItemCouponShip from "./ItemCouponShip/ItemCouponShip";
toast.configure();
const FormListCouponShip = (props) => {
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);
  const loggedInUser = useSelector((state) => state.user.current);
  const [arrAllCouponShip, setArrAllCouponShip] = useState([]);

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormListCouponShip) {
      setIsOpenForm(style.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormListCouponShip]);

  const handleDeleProduct = (event) => {
    event.preventDefault();
    // const fetchRequestDeleteProduct = async () => {
    //   try {
    //     const requestDeleteProduct = await productAdminApi.deleteProduct(
    //       props.dataProduct._id
    //     );
    //     console.log(requestDeleteProduct);
    //     if (requestDeleteProduct.status === 200) {
    //       dispatch({
    //         type: ACTIOS.loadingAllProduct,
    //         payload: true,
    //       });
    //       props.onFormFalse(false);
    //       const fetchRequestGetAllProduct = async () => {
    //         try {
    //           const requestGetAllProduct = await productAdminApi.getAllProduct(
    //             state.filterPagination._page,
    //             state.filterPagination._limit
    //           );
    //           dispatch({
    //             type: ACTIOS.dataAllProduct,
    //             payload: requestGetAllProduct.data,
    //           });
    //           dispatch({
    //             type: ACTIOS.loadingAllProduct,
    //             payload: false,
    //           });
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       };
    //       fetchRequestGetAllProduct();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchRequestDeleteProduct();
  };
  useEffect(() => {
    const fetchRequestGetAllCouponOfUser = async () => {
      try {
        const requestGetAllCouponOfUser = await couponApi.getCouponOfUser(
          loggedInUser._id
        );
        setArrAllCouponShip(requestGetAllCouponOfUser.data.listCouponShip);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllCouponOfUser();
  }, []);

  const handleFalse = (data) => {
    props.onFormFalse(data.turnOffForm);
  };

  return (
    <div className={style.modalFormLogOut}>
      <div className={` ${style.backdrop} ${isOpenForm}`}></div>
      <div className={` ${style.viewFormLogOut} ${isOpenForm}`}>
        <div className={style.header}>
          <h2>RUBIX Khuyến Mãi</h2>
          <div className={style.cancel} onClick={cancelHandler}>
            <div className={style.blur}>
              <i className="bi bi-x"></i>
            </div>
          </div>
        </div>
        <div className={style.body}>
          <div className="d-flex justify-content-between">
            <p>Mã Giảm Giá</p>
            <span style={{ fontSize: "14px" }}>Áp dụng tối đa: 1</span>
          </div>
          <div className={style.listCoupon}>
            {arrAllCouponShip?.map((data, idx) => {
              return (
                <div key={idx}>
                  <ItemCouponShip data={data} onFormFalseItem={handleFalse} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormListCouponShip;
