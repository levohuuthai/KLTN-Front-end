import React, { useContext } from "react";
import classes from "./FormListCoupon.module.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import couponApi from "api/couponApi";
import { useSelector } from "react-redux";
toast.configure();
const FormListCoupon = (props) => {
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);
  const loggedInUser = useSelector((state) => state.user.current);
  const [arrAllCouponProduct, setArrAllCouponProduct] = useState([]);

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormListCoupon) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormListCoupon]);

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
        console.log(requestGetAllCouponOfUser);
        setArrAllCouponProduct(
          requestGetAllCouponOfUser.data.listCouponProduct
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllCouponOfUser();
  }, []);
  return (
    <div className={classes.modalFormLogOut}>
      <div className={` ${classes.backdrop} ${isOpenForm}`}></div>
      <div className={` ${classes.viewFormLogOut} ${isOpenForm}`}>
        <div className={classes.header}>
          <h2>RUBIX Khuyến Mãi</h2>
          <div className={classes.cancel} onClick={cancelHandler}>
            <div className={classes.blur}>
              <i className="bi bi-x"></i>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <div className="d-flex justify-content-between">
            <p>Mã Giảm Giá</p>
            <span classes={{ fontSize: "14px" }}>Áp dụng tối đa: 1</span>
          </div>
          <div className={classes.listCoupon}>
            {arrAllCouponProduct?.map((data, idx) => {
              return (
                <div className={classes.item_coupon}>
                  <div className={classes.left}>
                    <div className={`${classes.price} d-flex flex-column`}>
                      <span style={{ marginBottom: "30px" }}>
                        {data?.name}{" "}
                        <b classes={{ fontSize: "30px" }}>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(props.data?.priceToDiscount)}
                        </b>
                      </span>
                      <div className="d-flex">
                        <span
                          classes={{
                            fontWeight: "400",
                            fontSize: "16px",
                            color: "#fff",
                          }}
                        >
                          10 lượt/khách
                        </span>
                        <span className={classes.btnSaveCodeCoupon}>
                          Chọn mã
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${classes.right}  d-flex flex-column`}>
                    <div className={classes.date}>
                      Hiệu lực đến
                      <br />
                      <b classes={{ fontSize: "17px" }}>23:59</b> ngày
                      <b classes={{ fontSize: "17px" }}> 11/05</b>
                    </div>
                    <div className={classes.date}>Số lượng có hạn</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className={classes.footer}>
          <div className={classes.button}>
            <button className={classes.cancel} onClick={cancelHandler}>
              Không
            </button>
            <button className={classes.confirm} onClick={handleDeleProduct}>
              Xác nhận
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FormListCoupon;
