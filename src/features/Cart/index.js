import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./Cart.module.scss";
import imgbackground4 from "assets/images/auth/login/imgbackground4.jpg";
import InputField from "components/Form-control/InputField";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import { GlobalContext } from "../../store/store";

import { ACTIOS } from "../../store/actions";
import { useLocation, useNavigate } from "react-router-dom";
import ItemCart from "./ItemCart/ItemCart";
import CartSkeletonPage from "./CartSkeletonPage";
import FormListCoupon from "./FormListCoupon/FormListCoupon";

CartFeature.propTypes = {};
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
    background: "black",
    width: "100%",
    height: "50px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "20px",
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
  const form = useForm({
    defaultValues: {
      coupon: "",
    },
    //  resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };
  const { dispatch, state } = useContext(GlobalContext);
  const [totalMoney, setTotalMoney] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    var rs = state.dataCart.reduce((acc, val) => {
      return acc + val.product.priceAfter * val.product.quantity;
    }, 0);
    setTotalMoney(rs);
  }, [state.dataCart]);
  const handlePurchase = () => {
    navigate("/checkout/address");
  };
  const [isOpenFormListCoupon, seIsOpenFormListCoupon] = useState(false);

  const handleShowFormListCoupon = () => {
    seIsOpenFormListCoupon(true);
  };
  const falseFromListCoupon = () => {
    seIsOpenFormListCoupon(false);
  };
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
              <div className={`${style.checkbox} d-flex align-items-center`}>
                <input type="checkbox" id="all" />
                <label htmlFor="all"></label>
              </div>
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
                  return <ItemCart data={data} />;
                })
              )}
            </div>
          </div>
          <div className={style.cart_right}>
            <div className={`${style.cart_right_top} `}>
              <h5>RUBIX khuyến mãi</h5>
              <div>
                <input
                  type="text"
                  // value={nameProduct}
                  // onChange={handleNameProduct}
                  // onFocus={handleFocusNameProduct}
                  // onBlur={handleBlurNameProduct}
                  className={style.nameProduct}
                  placeholder="Nhập tên sản phẩm"
                ></input>
                <div className="d-flex align-items-center justify-content-between">
                  <Button type="submit" className={classes.submit}>
                    Áp dụng
                  </Button>
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
                  }).format(totalMoney)}
                </p>
              </div>
              <div
                className={`${style.discount} d-flex justify-content-between`}
              >
                <p>Giảm giá</p>
                <p>0 vnđ</p>
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
            <Button
              type="submit"
              className={classes.purchase}
              onClick={handlePurchase}
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
      <Footer />
      <FormListCoupon
        isOpenFormListCoupon={isOpenFormListCoupon}
        onFormFalse={falseFromListCoupon}
      />
    </>
  );
}

export default CartFeature;
