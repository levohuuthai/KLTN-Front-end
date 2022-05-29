import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import style from "./FormUpdateCoupon.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import axios from "axios";
import couponAdminApi from "api/admin/couponAdminApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#444",
    marginBottom: "-10px",
  },
  submit: {
    background: "black",
    width: "140px",
    height: "40px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "20px",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
}));
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix=" đ"
    />
  );
}
function NumberFormatCustomCount(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      suffix=""
    />
  );
}
function FormUpdateCoupon(props) {
  const classes = useStyles();
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);

  useEffect(() => {
    if (props.isForm) {
      setIsOpenForm(style.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isForm]);
  const cancelHandler = () => {
    setIsOpenForm("");
    props.onFormFalse(false);
  };
  const [price, setPrice] = useState({ value: "", errorPrice: undefined });
  const [priceToDiscount, setPriceToDiscount] = useState({
    value: "",
    errorPriceToDiscount: undefined,
  });
  const [type, setType] = useState({ value: "", errorType: undefined });
  const [count, setCount] = useState({ value: "", errorCount: undefined });
  const [endDate, setEndDate] = useState({
    value: new Date(props.dataCoupon?.endDate),
  });

  const handleType = (e) => {
    if (e.target.value === "") {
      setType({
        value: e.target.value,
        errorType: "Vui lòng chọn loại",
      });
    } else {
      setType({
        value: e.target.value,
        errorType: undefined,
      });
    }
  };
  const handlePriceToDiscount = (e) => {
    if (e.target.value <= 0) {
      setPriceToDiscount({
        value: e.target.value,
        errorPriceToDiscount: "Điều kiện giảm giá phải lớn hơn 0",
      });
    } else {
      setPriceToDiscount({
        value: e.target.value,
        errorPriceToDiscount: undefined,
      });
    }
  };

  const handlePrice = (e) => {
    if (e.target.value <= 0) {
      setPrice({
        value: e.target.value,
        errorPrice: "Số tiền giảm giá phải lớn hơn 0",
      });
    } else {
      setPrice({
        value: e.target.value,
        errorPrice: undefined,
      });
    }
  };
  const handleCount = (e) => {
    if (e.target.value <= 0) {
      setCount({
        value: e.target.value,
        errorCount: "Mã giảm giá phải lớn hơn 0",
      });
    } else {
      setCount({
        value: e.target.value,
        errorCount: undefined,
      });
    }
  };

  function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var date = new Date(endDate.value);
  var month = pad2(date.getMonth() + 1); //months (0-11)
  var day = pad2(date.getDate()); //day (1-31)
  var year = date.getFullYear();

  var formattedDate = day + "-" + month + "-" + year;

  const handleEndDate = (value, e) => {
    setEndDate({ value: value });
  };
  useEffect(() => {
    setPriceToDiscount({
      ...priceToDiscount,
      value: props.dataCoupon?.priceToDiscount,
    });
    setPrice({
      ...price,
      value: props.dataCoupon?.discount,
    });
    setType({
      ...type,
      value: props.dataCoupon?.type,
    });
    setCount({
      ...count,
      value: props.dataCoupon?.count,
    });
    setEndDate({
      ...endDate,
      value: new Date(props.dataCoupon?.endDate),
    });
  }, [props.dataCoupon]);
  const handleUpdateCoupon = (e) => {
    // console.log(typeof price.value);
    e.preventDefault();
    const coupon = {
      endDate: endDate.value,
      discount: price.value,
      type: type.value,
      count: count.value,
      priceToDiscount: priceToDiscount.value,
    };

    if (priceToDiscount.value === "") {
      setPriceToDiscount({
        ...priceToDiscount,
        errorPriceToDiscount: "Vui lòng nhập điều kiện giảm giá",
      });
    }
    if (price.value === "") {
      setPrice({ ...price, errorPrice: "Vui lòng nhập giá tiền" });
    }
    if (type.value === "") {
      setType({ ...type, errorType: "Vui lòng chọn loại" });
    }
    if (count.value === "") {
      setCount({ ...count, errorCount: "Vui lòng nhập số lượng giảm giá" });
    }
    if (
      priceToDiscount.value !== "" &&
      priceToDiscount.value > 0 &&
      price.value !== "" &&
      price.value > 0 &&
      type.value !== "" &&
      count.value !== "" &&
      count.value > 0
    ) {
      const fetchRequestUpdateCoupon = async () => {
        try {
          const requestUpdateCoupon = await couponAdminApi.updateCouponAdmin(
            props.dataCoupon?._id,
            coupon
          );
          if (requestUpdateCoupon.status === 200) {
            props.onFormFalse(false);
            props.onReceiveDateOld(endDate.value);
            toast.success("Cập nhật mã giảm giá thành công", {
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
      fetchRequestUpdateCoupon();
    }
  };
  return (
    <div className={style.modalView}>
      <div className={`${style.backdropViewInformation} ${isOpenForm}`}></div>
      <div className={`${style.viewInformation} ${isOpenForm}`}>
        <div className={style.header}>
          <p>Cập nhật giảm giá</p>
          <div onClick={cancelHandler}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className={style.formAddCoupon}>
          <div className="d-flex justify-content-between">
            <div className={style.conditionPriceToDiscount}>
              <Typography className={classes.title}>
                Điều kiện giảm giá <span style={{ type: "red" }}>*</span>
              </Typography>
              <TextField
                name="conditionPriceToDiscount"
                label="Đơn hàng từ"
                variant="outlined"
                margin="normal"
                value={priceToDiscount.value}
                onChange={handlePriceToDiscount}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                error={!!priceToDiscount.errorPriceToDiscount}
                helperText={
                  priceToDiscount.errorPriceToDiscount !== undefined
                    ? priceToDiscount.errorPriceToDiscount
                    : ""
                }
              />
            </div>
            <div className={style.discountPrice}>
              <Typography className={classes.title}>
                Số tiền giảm giá <span style={{ type: "red" }}>*</span>
              </Typography>
              <TextField
                name="discountPrice"
                label="Nhập số tiền giảm giá"
                variant="outlined"
                margin="normal"
                value={price.value}
                onChange={handlePrice}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                error={!!price.errorPrice}
                helperText={
                  price.errorPrice !== undefined ? price.errorPrice : ""
                }
              />
            </div>
          </div>{" "}
          <div className="d-flex justify-content-between">
            <div className={style.type_discount}>
              <Typography className={classes.title}>
                Loại giảm giá <span style={{ type: "red" }}>*</span>
              </Typography>
              <div style={{ width: "210px" }}>
                <FormControl
                  variant="outlined"
                  name="type"
                  error={!!type.errorType}
                  style={{
                    width: "100%",
                    marginTop: "16px",
                  }}
                >
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Loại giảm giá
                  </InputLabel>
                  <Select
                    name="type"
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={type.value}
                    error={!!type.errorType}
                    onChange={handleType}
                    label=" Chọn loại"
                  >
                    <MenuItem value="Product">Giảm Giá Đơn hàng</MenuItem>
                    <MenuItem value="Ship">Giảm Giá Giao Hàng</MenuItem>
                  </Select>
                  {type.errorType !== undefined && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        marginTop: "2px",
                        paddingLeft: "12px",
                        color: "#f44336",
                        fontWeight: "400",
                      }}
                    >
                      {type.errorType}
                    </span>
                  )}
                </FormControl>
              </div>
            </div>
            <div className={style.count_discount}>
              <Typography className={classes.title}>
                Số lượng mã giảm giá <span style={{ type: "red" }}>*</span>
              </Typography>
              <TextField
                name="discountPrice"
                label="Nhập số lượng"
                variant="outlined"
                margin="normal"
                value={count.value}
                onChange={handleCount}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatCustomCount,
                }}
                error={!!count.errorCount}
                helperText={
                  count.errorCount !== undefined ? count.errorCount : ""
                }
              />
            </div>
          </div>
          <div className={style.endDate}>
            {" "}
            <Typography className={classes.title}>
              Ngày hết hạn <span style={{ type: "red" }}>*</span>
            </Typography>
            <DatePicker
              // value={formattedDate}
              // //   selected={new Date()}
              // onChange={handleEndDate}
              // dateFormat="dd/MM/yyyy"
              // placeholderText="dd/mm/yyyy"
              //   onFocus={InputHandler}
              showTimeSelect
              selected={endDate.value}
              onChange={handleEndDate}
              dateFormat="dd/MM/yyyy HH:mm:ss"
              minDate={new Date()}
              id="birthday"
            ></DatePicker>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              className={classes.submit}
              onClick={handleUpdateCoupon}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormUpdateCoupon;
