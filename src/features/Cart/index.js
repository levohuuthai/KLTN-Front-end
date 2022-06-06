import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.scss";
import imgbackground4 from "assets/images/auth/login/imgbackground4.jpg";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import { GlobalContext } from "../../store/store";
import { useNavigate } from "react-router-dom";
import ItemCart from "./ItemCart/ItemCart";
import CartSkeletonPage from "./CartSkeletonPage";
import FormListCoupon from "./FormListCoupon/FormListCoupon";
import FormUpdatePhone from "./FormUpdatePhone/FormUpdatePhone";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  submit: {
    background: "black",
    width: "130px",
    height: "50px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "20px",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
  purchase: {
    background: "#cfcfcf",
    width: "100%",
    height: "50px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "20px",
    cursor: "not-allowed !important",
  },
  purchase_active: {
    background: "black",
    width: "100%",
    height: "50px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "20px",
    cursor: "pointer",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
}));
function CartFeature(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();

  const { state } = useContext(GlobalContext);
  const [tempTotalMoney, setTempTotalMoney] = useState();
  const [totalMoney, setTotalMoney] = useState();
  const loggedInUser = useSelector((state) => state.user.current);

  let navigate = useNavigate();

  const handlePurchase = (e) => {
    if (state.dataCart.length > 0) {
      navigate("/checkout/address");
    }
  };
  const [isOpenFormListCoupon, seIsOpenFormListCoupon] = useState(false);

  const handleShowFormListCoupon = () => {
    seIsOpenFormListCoupon(true);
  };
  const falseFromListCoupon = () => {
    seIsOpenFormListCoupon(false);
  };
  //Nhan coupon khi select
  const [endDay, setEndDay] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
  });
  const [dataCoupon, setDataCoupon] = useState();
  useEffect(() => {
    setDataCoupon(JSON.parse(localStorage.getItem("dataCoupon"))); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [, localStorage.getItem("dataCoupon")]);
  useEffect(() => {
    var date = new Date(dataCoupon?.endDate);
    setEndDay({
      minute: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }, [dataCoupon]);
  //Tính tổng cộng
  useEffect(() => {
    var rs = state.dataCart.reduce((acc, val) => {
      return acc + val.product.priceAfter * val.product.quantity;
    }, 0);
    setTempTotalMoney(rs);
    setTotalMoney(
      rs - (dataCoupon?.discount === undefined ? 0 : dataCoupon?.discount)
    );
  }, [state.dataCart, dataCoupon]);

  const [isOpenFormUpdatePhone, seIsOpenFormUpdatePhone] = useState(false);

  const handleShowFormUpdatePhone = () => {
    seIsOpenFormUpdatePhone(true);
  };
  const falseFromUpdatePhone = () => {
    seIsOpenFormUpdatePhone(false);
  };
  console.log(loggedInUser);
  return (
    <>
      <Header />
      <div className={`${style.background_slider}`}>
        <div className={style.imgbackground}>
          <img src={imgbackground4} alt="" />
        </div>
        <div className={style.title_background}>
          Giỏ hàng của tôi <p>Trang chủ / Giỏ hàng</p>
        </div>
      </div>
      <div className={style.viewcart}>
        {/* <div className={style.title}>Giỏ hàng</div> */}
        <div className="d-flex flex-start">
          <div className={`${style.cart_left}`}>
            <div className={style.title_item_cart}>
              {/* <div className={`${style.checkbox} d-flex align-items-center`}>
                <input type="checkbox" id="all" />
                <label htmlFor="all"></label>
              </div> */}
              <span className={style.title_image_item}>
                Tất cả({state.dataCart.length} sản phẩm)
              </span>
              <span
                className={`${style.title_name_item}  d-flex justify-content-center`}
              >
                Tên sản phẩm
              </span>
              <span
                className={`${style.title_price1} d-flex justify-content-center`}
              >
                Đơn giá
              </span>
              <span
                className={`${style.title_quantity} d-flex justify-content-center`}
              >
                Số lượng
              </span>
              <span
                className={`${style.title_price2} d-flex justify-content-center`}
              >
                Thành tiền
              </span>
              <span
                className={`${style.title_close} d-flex justify-content-center`}
              >
                <i className="far fa-times-circle"></i>
              </span>
            </div>
            <div className={`${style.list_item_cart}`}>
              {state.loadingPageCart ? (
                <CartSkeletonPage length={state.dataCart.length} />
              ) : (
                state.dataCart?.map((data, idx) => {
                  return (
                    <div key={idx}>
                      <ItemCart data={data} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className={style.cart_right}>
            <div className={`${style.cart_right_top} `}>
              <h5>RUBIX khuyến mãi</h5>
              {dataCoupon !== null && (
                <div className={style.item_coupon}>
                  <div className={style.left}>
                    <div
                      className={`${style.lottery_box} ${
                        dataCoupon?.type === "Ship" ? style.activeShip : ""
                      }`}
                    >
                      <div className={`${style.price} d-flex flex-column `}>
                        <span
                          className={`${style.priceDiscount} ${
                            dataCoupon?.type === "Ship"
                              ? style.activeColorShip
                              : ""
                          }`}
                        >
                          {dataCoupon?.type === "Product"
                            ? "GIẢM NGAY "
                            : "FREESHIP TỪ"}
                          <b style={{ marginLeft: "10px", fontSize: "22px" }}>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(dataCoupon?.discount)}
                          </b>
                        </span>
                        <span className={style.conditionPriceDiscount}>
                          Cho đơn hàng từ{" "}
                          <b style={{ fontSize: "18px" }}>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(dataCoupon?.priceToDiscount)}
                          </b>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`${style.right}  d-flex flex-column`}>
                    <div className={style.date}>
                      Hiệu lực đến
                      <br />
                      <b style={{ fontSize: "17px" }}>
                        {endDay.hour?.toString().length === 1
                          ? "0" + endDay.hour
                          : endDay.hour}
                        :
                        {endDay.minute?.toString().length === 1
                          ? "0" + endDay.minute
                          : endDay.minute}
                      </b>{" "}
                      ngày{" "}
                      <b style={{ fontSize: "17px" }}>
                        {endDay.day?.toString().length === 1
                          ? "0" + endDay.day
                          : endDay.day}
                        /
                        {endDay.month?.toString().length === 1
                          ? "0" + endDay.month
                          : endDay.month}
                      </b>
                    </div>
                    <div className={style.date}>Số lượng có hạn</div>
                  </div>
                </div>
              )}
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  {/* <Button
                    type="submit"
                    className={classes.submit}
                    onClick={handleUseCoupon}
                  >
                    Áp dụng
                  </Button> */}

                  <span
                    className={style.selectCoupon}
                    onClick={handleShowFormListCoupon}
                  >
                    Chọn mã khuyến mãi
                  </span>
                </div>
              </div>
              {/* </form> */}
            </div>
            <div className={style.cart_right_bottom}>
              <div
                className={`${style.provisonal} d-flex justify-content-between`}
              >
                <p>Tạm tính</p>
                <p>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(tempTotalMoney)}
                </p>
              </div>
              <div
                className={`${style.discount} d-flex justify-content-between`}
              >
                <p>Giảm giá</p>
                <p>
                  {dataCoupon?.discount === undefined ? "" : " - "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    dataCoupon?.discount === undefined
                      ? 0
                      : dataCoupon?.discount
                  )}
                </p>
              </div>
              <div className={style.line}></div>
              <div className={`${style.total} d-flex justify-content-between`}>
                <p>Tổng cộng</p>
                <p className={style.price_total}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalMoney)}
                </p>
              </div>
            </div>
            {JSON.parse(localStorage.getItem("user"))?.phone !== null ? (
              <Button
                type="submit"
                className={
                  state.dataCart.length > 0
                    ? classes.purchase_active
                    : classes.purchase
                }
                onClick={handlePurchase}
              >
                Mua hàng
              </Button>
            ) : (
              <Button
                type="submit"
                className={
                  state.dataCart.length > 0
                    ? classes.purchase_active
                    : classes.purchase
                }
                onClick={handleShowFormUpdatePhone}
              >
                Mua hàng
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <FormListCoupon
        isOpenFormListCoupon={isOpenFormListCoupon}
        onFormFalse={falseFromListCoupon}
      />
      <FormUpdatePhone
        isOpenFormUpdatePhone={isOpenFormUpdatePhone}
        onFormFalse={falseFromUpdatePhone}
      />
    </>
  );
}

export default CartFeature;
