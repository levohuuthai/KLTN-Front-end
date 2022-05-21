import React, { useRef, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import style from "./Payment.module.scss";
import aothuninhinh from "assets/images/type/aothuninhinh.jpg";
import { ReactComponent as ImgBankPayment } from "assets/images/checkout/img_bankpayment.svg";
import { ReactComponent as ImgCashPayment } from "assets/images/checkout/img_cashpayment.svg";
import { ReactComponent as Visa } from "assets/images/checkout/visa.svg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MyCartAside from "components/myCartAside/MyCartAside";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import InputField from "components/Form-control/InputField";
import cartApi from "api/cartApi";
import { makeStyles } from "@material-ui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import orderApi from "api/orderApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormListCouponShip from "./FormListCouponShip/FormListCouponShip";
import couponApi from "api/couponApi";
toast.configure();

Payment.propTypes = {};
const useStyles = makeStyles((theme) => ({
  submit: {
    background: "black",
    padding: "0.5rem 1rem",
    color: "#fff",
    transition: "all 0.6s",
    margin: "20px auto",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
  cancel: {
    background: "linear-gradient(rgb(255, 255, 255), rgb(247, 247, 247))",
    padding: "0.5rem 1rem",
    color: "black",
    border: "1px solid rgb(204, 204, 204)",
    marginLeft: "20px",
  },
}));

function Payment(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();
  // const schema = yup.object().shape({
  //   numberCard: yup
  //     .string()
  //     .required("please enter title")
  //     .test("ef", "sncj", (value) => {
  //       setNumberCard(value);
  //     }),
  // });
  const numberCard = useRef(null);
  const [inputNumberCard, setInputNumberCard] = useState("");
  const [showIssuer, setShowIssuer] = useState(false);

  const form = useForm({
    defaultValues: {
      numberCard: "",
      SDT: "",
    },
    // resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };
  const handlerNumberInput = (event, type) => {
    let { value } = event.target;
    value = value.replace(/ /gi, "");
    const valueRegEx = /^(4|5)[0-9]{3,15}/;
    if (valueRegEx.test(event.target.value)) {
      setShowIssuer(true);
    } else {
      setShowIssuer(false);
    }
    if (isNaN(value)) {
      return;
    } else {
      setInputNumberCard(value);
    }
  };

  // useEffect(() => {
  const formatCardNumber = (value) => {
    let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let matches = v.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || "";
    let parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  // }, [inputNumberCard]);

  let displayNumber = [];
  for (let i = 0; i < 16; i++) {
    let displayDigit = "#";
    if (typeof inputNumberCard[i] !== "undefined") {
      displayDigit = i > 3 && i < 12 ? "*" : inputNumberCard[i];
    }
    displayNumber.push(displayDigit);
  }
  const loggedInUser = useSelector((state) => state.user.current);

  const location = useLocation();
  const dataAddress = location.state?.dataAddress;
  const userName = location.state?.userName;
  const phone = location.state?.phone;
  const { dispatch, state } = useContext(GlobalContext);
  const { activeCart } = state;
  const [totalMoney, setTotalMoney] = useState();
  const [temptotalMoney, setTemTotalMoney] = useState();
  const [dataCouponProduct, setDataCouponProduct] = useState();
  const [dataCouponShip, setDataCouponShip] = useState();
  const [priceShipByProvince, setPriceShipByProvince] = useState();

  let navigate = useNavigate();

  const handleLinkAddress = () => {
    navigate("/checkout/address");
  };
  const handleLinkCart = () => {
    navigate("/cart");
  };
  const handleCheckout = () => {
    //useCouponShip
    const fetchUseCouponShip = async () => {
      try {
        const requestUseCoupon = await couponApi.useCoupon(
          loggedInUser?._id,
          dataCouponShip?._id
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchUseCouponShip();
    //useCouponProduct
    const fetchUseCouponProduct = async () => {
      try {
        const requestUseCoupon = await couponApi.useCoupon(
          loggedInUser?._id,
          dataCouponProduct?._id
        );
        console.log(requestUseCoupon);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUseCouponProduct();
    //addOrder
    const fetchAddOrder = async () => {
      try {
        const requestAddOrder = await orderApi.addOrder({
          userId: loggedInUser._id,
          products: state.dataCart.map((data) => {
            return {
              productDetailId: data.product.productDetailId,
              quantity: data.product.quantity,
              priceAfter: data.product.priceAfter,
              priceBefore: data.product.priceBefore,
            };
          }),
          amount: totalMoney,
          address: dataAddress._id,
          status: "Đang Xử Lý",
          discountShip:
            dataCouponShip?.discount === undefined
              ? 0
              : dataCouponShip?.discount,
          discountProduct:
            dataCouponProduct?.discount === undefined
              ? 0
              : dataCouponProduct?.discount,
          priceShip: priceShipByProvince,
        });
        localStorage.removeItem("dataCoupon");
        localStorage.removeItem("dataCouponShip");
        if (requestAddOrder.status === 200) {
          navigate("/customer/myorder/");
        }
      } catch (error) {
        console.log(error);
        toast.error(error, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2000,
        });
      }
    };
    fetchAddOrder();
  };

  const showMyCart = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIOS.ActiveShowCart, payload: true });
  };
  useEffect(() => {
    const fetchGetProductCartByUserId = async () => {
      try {
        const requestGetProductCartByUserId =
          await cartApi.getProductCartByUserId(loggedInUser._id);
        dispatch({
          type: ACTIOS.dataCart,
          payload: requestGetProductCartByUserId.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetProductCartByUserId();
  }, [state.activeCart]);
  const [isOpenFormListCouponShip, seIsOpenFormListCouponShip] =
    useState(false);

  const handleShowFormListCouponShip = () => {
    seIsOpenFormListCouponShip(true);
  };
  const falseFromListCoupon = () => {
    seIsOpenFormListCouponShip(false);
  };
  //select couponship
  const [endDay, setEndDay] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
  });

  useEffect(() => {
    var date = new Date(dataCouponShip?.endDate);
    setEndDay({
      minute: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }, [dataCouponShip]);
  //Lấy bên giỏ hàng để tính tạm tính
  useEffect(() => {
    setDataCouponProduct(JSON.parse(localStorage.getItem("dataCoupon")));
  }, [, localStorage.getItem("dataCoupon")]);
  useEffect(() => {
    setDataCouponShip(JSON.parse(localStorage.getItem("dataCouponShip")));
  }, [, localStorage.getItem("dataCouponShip")]);
  useEffect(() => {
    var rs = state.dataCart.reduce((acc, val) => {
      return acc + val.product.priceAfter * val.product.quantity;
    }, 0);
    setTemTotalMoney(
      rs -
        (dataCouponProduct?.discount === undefined
          ? 0
          : dataCouponProduct?.discount)
    );
    setTotalMoney(
      rs -
        (dataCouponProduct?.discount === undefined
          ? 0
          : dataCouponProduct?.discount) -
        (dataCouponShip?.discount === undefined
          ? 0
          : dataCouponShip?.discount > priceShipByProvince
          ? priceShipByProvince
          : dataCouponShip?.discount) +
        priceShipByProvince
    );
  }, [state.dataCart, dataCouponShip, priceShipByProvince]);
  useEffect(() => {
    setPriceShipByProvince(
      dataAddress?.city === "Thành phố Hồ Chí Minh" ? 20000 : 30000
    );
  }, [dataAddress]);

  const handleMethodPayment = (e) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <div className={`${style.payment} wrap`}>
        <div className={style.payment_left}>
          <h5>1. Thông tin đơn hàng</h5>
          <div className={style.infor_order}>
            <div className={style.title_item_order}>
              <span className={style.title_image_item}>Hình ảnh</span>
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
            </div>
            <div className={style.list_item}>
              {state.dataCart?.map((data, idx) => {
                return (
                  <div className={style.item} key={idx}>
                    <div className={style.img_item}>
                      <img src={data.product.image} alt="ao thun"></img>
                    </div>
                    <div className={style.name}>
                      <p style={{ marginBottom: "0" }}> {data.product.title}</p>
                      <span>
                        Size: <b> {data.product.size}</b>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>
                          Màu: <b> {data.product.color}</b>
                        </span>
                      </span>
                    </div>
                    <div className={style.price}>
                      <p>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(data.product.priceAfter)}
                      </p>
                    </div>
                    <div className={style.quantity}>
                      <p>{data.product.quantity}</p>
                    </div>
                    <div className={style.price2}>
                      <p>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          data.product.priceAfter * data.product.quantity
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <h5 style={{ marginTop: "30px" }}>2. Chọn hình thức thanh toán</h5>
          <div className={style.payment_method}>
            <div className={style.cash_payment}>
              <label className={style.label_payment}>
                <input
                  type="radio"
                  name="radio"
                  id="method_payment"
                  value="Thanh toán bằng tiền mặt"
                  onChange={handleMethodPayment}
                ></input>
                <ImgCashPayment />
                <span style={{ marginLeft: "20px" }}>
                  Thanh toán bằng tiền mặt
                </span>
                <span className={style.checkmark}></span>
              </label>
            </div>
            <div className={style.cash_payment}>
              <label className={style.label_payment}>
                <input
                  type="radio"
                  name="radio"
                  id="method_payment"
                  value="Thanh toán bằng tài khoản ngân hàng"
                  onChange={handleMethodPayment}
                ></input>
                <ImgBankPayment />
                <span style={{ marginLeft: "20px" }}>
                  Thanh toán bằng tài khoản ngân hàng
                </span>
                <span className={style.checkmark}></span>
              </label>
            </div>
            <h6>Thông tin thẻ tín dụng</h6>
            <div
              className={`${style.info_creditcard} d-flex align-items-start justify-content-center`}
            >
              <div className={style.credit_left}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className={`${style.form_adressnew} d-flex flex-column`}
                >
                  <div
                    className={`${style.Name} d-flex  justify-content-between align-items-center`}
                  >
                    <label className={style.title_lable}>Số thẻ</label>
                    <InputField
                      name="numberCard"
                      label="Nhập số thẻ"
                      form={form}
                      onChange={handlerNumberInput}
                      value={formatCardNumber(inputNumberCard)}
                    />
                  </div>
                  <div
                    className={`${style.Name} d-flex  justify-content-between align-items-center`}
                  >
                    <label className={style.title_lable}>Tên chủ thẻ</label>
                    <InputField
                      name="nameCard"
                      label="Nhập tên chủ thẻ"
                      form={form}
                    />
                  </div>
                  <div
                    className={`${style.Name} d-flex  justify-content-between align-items-center`}
                  >
                    <label className={style.title_lable}>Ngày hết hạn</label>
                    <InputField
                      name="dateCard"
                      label="Ví dụ: 52, Đường Trần Hưng Đạo"
                      form={form}
                    />
                  </div>
                  <div className={style.group_btn_address_new}>
                    <Button className={classes.cancel}>Hủy bỏ</Button>
                    <Button type="submit" className={classes.submit}>
                      Xác nhận
                    </Button>
                  </div>
                </form>
              </div>
              <div
                className={`${style.credit_right} d-flex align-items-start justify-content-center`}
              >
                <div className={style.credit_card}>
                  <div className={style.credit_card_front}>
                    <div
                      className={`${style.card_background} ${
                        showIssuer ? style.active_background : ""
                      }`}
                    ></div>
                    <div
                      className={`${showIssuer ? style.card_issuer : ""}`}
                    ></div>
                    <div className={style.card_cvc}>
                      {displayNumber.map((digit, index) => {
                        return (
                          <div className={`${style.digit_wrapper}`} key={index}>
                            <div
                              className={
                                digit === "#"
                                  ? `${style.digit} ${style.shown}`
                                  : `${style.digit} ${style.hidden}`
                              }
                            >
                              •
                            </div>
                            <div
                              className={
                                digit === "#"
                                  ? `${style.digit} ${style.hidden}`
                                  : `${style.digit} ${style.shown}`
                              }
                            >
                              {digit === "#" ? "" : digit}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className={style.card_name}>Tên chủ thẻ</div>
                    <div className={`${style.card_expiry} d-flex flex-column`}>
                      <span
                        className={style.title_expiry}
                        style={{ fontSize: "11px" }}
                      >
                        Hiệu lực đến
                      </span>
                      <span className={style.title_expiry}>••/••</span>
                    </div>
                    <div className={style.card_chip}></div>
                  </div>
                  <div className={style.credit_card_back}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.payment_right}>
          <div className={`${style.address} `}>
            <div className="d-flex align-items-center justify-content-between">
              <p>Địa chỉ giao hàng</p>
              <p className={style.update_address} onClick={handleLinkAddress}>
                Sửa
              </p>
            </div>
            <div className={style.line}></div>
            <h6 style={{ color: "rgb(51, 51, 51)", fontWeight: "700" }}>
              {userName}
            </h6>
            <p style={{ fontSize: "15px", color: "rgb(51, 51, 51)" }}>
              {dataAddress?.apartmentNumber}, {dataAddress?.ward},{" "}
              {dataAddress?.district},{dataAddress?.city}, Việt Nam
              <br /> {phone}
            </p>
          </div>
          <div className={`${style.cart_right_top} `}>
            <div className="d-flex justify-content-between">
              <h5>RUBIX khuyến mãi</h5>
              <span
                className={style.selectCoupon}
                onClick={handleShowFormListCouponShip}
              >
                Chọn mã khuyến mãi
              </span>
            </div>
            {dataCouponShip !== null && (
              <div className={style.item_coupon}>
                <div className={style.left}>
                  <div
                    className={`${style.lottery_box} ${
                      dataCouponShip?.type === "Ship" ? style.activeShip : ""
                    }`}
                  >
                    <div className={`${style.price} d-flex flex-column `}>
                      <span
                        className={`${style.priceDiscount} ${
                          dataCouponShip?.type === "Ship"
                            ? style.activeColorShip
                            : ""
                        }`}
                      >
                        {dataCouponShip?.type === "Product"
                          ? "GIẢM NGAY "
                          : "FREESHIP TỪ"}
                        <b style={{ marginLeft: "10px", fontSize: "22px" }}>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(dataCouponShip?.discount)}
                        </b>
                      </span>
                      <span className={style.conditionPriceDiscount}>
                        Cho đơn hàng từ{" "}
                        <b style={{ fontSize: "18px" }}>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(dataCouponShip?.priceToDiscount)}
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
          </div>
          <div className={`${style.order_subtotal} `}>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span style={{ color: "rgb(51, 51, 51)", fontWeight: "700" }}>
                  Đơn hàng
                </span>
                <p style={{ color: "rgb(120, 120, 120)" }}>
                  {state.dataCart.length} sản phẩm.
                  <span
                    style={{
                      color: "#ba933e",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                    onClick={showMyCart}
                  >
                    {" "}
                    Xem thông tin
                  </span>
                </p>
              </div>
              <p className={style.update_order} onClick={handleLinkCart}>
                Sửa
              </p>
            </div>
            <div className={style.line}></div>
            <div
              className={`${style.provisional} d-flex justify-content-between`}
            >
              <p>Tạm tính</p>
              <p>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(temptotalMoney)}
              </p>
            </div>
            <div
              className={`${style.transport_fee} d-flex justify-content-between`}
            >
              <p>Phí vận chuyển</p>
              <p>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(priceShipByProvince)}
              </p>
            </div>
            <div
              className={`${style.transport_fee} d-flex justify-content-between`}
            >
              <p>Giảm phí vận chuyển</p>
              <p>
                {dataCouponShip?.discount === undefined ? "" : "- "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  dataCouponShip?.discount === undefined
                    ? 0
                    : dataCouponShip?.discount > priceShipByProvince
                    ? priceShipByProvince
                    : dataCouponShip?.discount
                )}
              </p>
            </div>
            <div className={`${style.total} d-flex justify-content-between`}>
              <p style={{ color: "rgb(51, 51, 51)", fontWeight: "700" }}>
                Thành tiền
              </p>
              <p style={{ color: "rgb(238, 35, 71)", fontWeight: "700" }}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalMoney)}
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button
              type="submit"
              className={classes.submit}
              onClick={handleCheckout}
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>{" "}
      <MyCartAside active_cart={activeCart} />
      <FormListCouponShip
        isOpenFormListCouponShip={isOpenFormListCouponShip}
        onFormFalse={falseFromListCoupon}
      />
    </div>
  );
}

export default Payment;
