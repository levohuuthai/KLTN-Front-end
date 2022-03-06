import React from "react";
import PropTypes from "prop-types";
import style from "./Cart.module.scss";
import imgbackground4 from "assets/images/auth/login/imgbackground4.jpg";
import aothuninhinh from "assets/images/type/aothuninhinh.jpg";
import InputField from "components/Form-control/InputField";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";

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
}));
function CartFeature(props) {
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
  return (
    <>
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
                <label for="all"></label>
              </div>
              <span className={style.title_image_item}>Tất cả(1 sản phẩm)</span>
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
                <i class="far fa-times-circle"></i>
              </span>
            </div>
            <div className={`${style.list_item_cart}`}>
              <div
                className={`${style.item_cart} d-flex justify-content-between align-items-center`}
              >
                <div className={`${style.checkbox} d-flex align-items-center`}>
                  <input type="checkbox" id="item" />
                  <label for="item"></label>
                </div>
                <p className={`${style.image_item_cart}`}>
                  <img src={aothuninhinh}></img>
                </p>
                <span
                  className={`${style.name_item}  d-flex justify-content-center`}
                >
                  Áo Thun INF Washed Shin
                </span>
                <span
                  className={`${style.price1} d-flex justify-content-center`}
                >
                  280.000 vnđ
                </span>
                <div
                  className={`${style.group_quantity} d-flex justify-content-center`}
                >
                  <div className={style.quantity}>
                    <span>-</span>
                    <input type="text" value="1" />
                    <span>+</span>
                  </div>
                </div>
                <span
                  className={`${style.price2} d-flex justify-content-center`}
                >
                  280.000 vnđ
                </span>
                <span
                  className={`${style.close} d-flex justify-content-center`}
                >
                  <i class="far fa-times-circle"></i>
                </span>
              </div>
              <div
                className={`${style.item_cart} d-flex justify-content-between align-items-center`}
              >
                <div className={`${style.checkbox} d-flex align-items-center`}>
                  <input type="checkbox" id="item" />
                  <label for="item"></label>
                </div>
                <p className={`${style.image_item_cart}`}>
                  <img src={aothuninhinh}></img>
                </p>
                <span
                  className={`${style.name_item}  d-flex justify-content-center`}
                >
                  Áo Thun INF Washed Shin
                </span>
                <span
                  className={`${style.price1} d-flex justify-content-center`}
                >
                  280.000 vnđ
                </span>
                <div
                  className={`${style.group_quantity} d-flex justify-content-center`}
                >
                  <div className={style.quantity}>
                    <span>-</span>
                    <input type="text" value="1" />
                    <span>+</span>
                  </div>
                </div>
                <span
                  className={`${style.price2} d-flex justify-content-center`}
                >
                  280.000 vnđ
                </span>
                <span
                  className={`${style.close} d-flex justify-content-center`}
                >
                  <i class="far fa-times-circle"></i>
                </span>
              </div>
              <div
                className={`${style.item_cart} d-flex justify-content-between align-items-center`}
              >
                <div className={`${style.checkbox} d-flex align-items-center`}>
                  <input type="checkbox" id="item" />
                  <label for="item"></label>
                </div>
                <p className={`${style.image_item_cart}`}>
                  <img src={aothuninhinh}></img>
                </p>
                <span
                  className={`${style.name_item}  d-flex justify-content-center`}
                >
                  Áo Thun INF Washed Shin
                </span>
                <span
                  className={`${style.price1} d-flex justify-content-center`}
                >
                  280.000 vnđ
                </span>
                <div
                  className={`${style.group_quantity} d-flex justify-content-center`}
                >
                  <div className={style.quantity}>
                    <span>-</span>
                    <input type="text" value="1" />
                    <span>+</span>
                  </div>
                </div>
                <span
                  className={`${style.price2} d-flex justify-content-center`}
                >
                  280.000 vnđ
                </span>
                <span
                  className={`${style.close} d-flex justify-content-center`}
                >
                  <i class="far fa-times-circle"></i>
                </span>
              </div>
              <div
                className={`${style.item_cart} d-flex justify-content-between align-items-center`}
              >
                <div className={`${style.checkbox} d-flex align-items-center`}>
                  <input type="checkbox" id="item" />
                  <label for="item"></label>
                </div>
                <p className={`${style.image_item_cart}`}>
                  <img src={aothuninhinh}></img>
                </p>
                <span
                  className={`${style.name_item}  d-flex justify-content-center`}
                >
                  Áo Thun INF Washed Shin
                </span>
                <span
                  className={`${style.price1} d-flex justify-content-center`}
                >
                  280.000 vnđ
                </span>
                <div
                  className={`${style.group_quantity} d-flex justify-content-center`}
                >
                  <div className={style.quantity}>
                    <span>-</span>
                    <input type="text" value="1" />
                    <span>+</span>
                  </div>
                </div>
                <span
                  className={`${style.price2} d-flex justify-content-center`}
                >
                  280.000 vnđ
                </span>
                <span
                  className={`${style.close} d-flex justify-content-center`}
                >
                  <i class="far fa-times-circle"></i>
                </span>
              </div>
            </div>
          </div>
          <div className={style.cart_right}>
            <div className={`${style.cart_right_top} `}>
              <h5>RUBIX khuyến mãi</h5>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={`${style.form} d-flex flex-column `}
              >
                <InputField
                  name="coupon"
                  label="Nhập mã giảm giá"
                  form={form}
                />
                <Button type="submit" className={classes.submit}>
                  Áp dụng
                </Button>
              </form>
            </div>
            <div className={style.cart_right_bottom}>
              <div
                className={`${style.provisonal} d-flex justify-content-between`}
              >
                <p>Tạm tính</p>
                <p>280.000 vnđ</p>
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
                <p className={style.price_total}>280.000 vnđ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartFeature;
