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
import style from "./FormAddCoupon.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import axios from "axios";
import couponAdminApi from "api/admin/couponAdminApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
function FormAddCoupon(props) {
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
  const [endDate, setEndDate] = useState({ value: "" });

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
    if (e.target.value === "") {
      setPriceToDiscount({
        value: e.target.value,
        errorPriceToDiscount: "Vui lòng nhập điều kiện giảm giá",
      });
    } else {
      let val = e.target.value;
      val = val.replace(/,/g, "");
      if (val.length > 3) {
        let noCommas = Math.ceil(val.length / 3) - 1;
        let remain = val.length - noCommas * 3;
        let newVal = [];
        for (let i = 0; i < noCommas; i++) {
          newVal.unshift(val.substr(val.length - i * 3 - 3, 3));
        }
        newVal.unshift(val.substr(0, remain));
        setPriceToDiscount({
          value: newVal,
          errorPriceToDiscount: undefined,
        });
      } else {
        setPriceToDiscount({
          value: val,
          errorPriceToDiscount: undefined,
        });
      }
    }

    // setPrice(e.target.value);
  };

  const handlePrice = (e) => {
    if (e.target.value === "") {
      setPrice({
        value: e.target.value,
        errorPrice: "Vui lòng nhập giá tiền",
      });
    } else {
      let val = e.target.value;
      val = val.replace(/,/g, "");
      if (val.length > 3) {
        let noCommas = Math.ceil(val.length / 3) - 1;
        let remain = val.length - noCommas * 3;
        let newVal = [];
        for (let i = 0; i < noCommas; i++) {
          newVal.unshift(val.substr(val.length - i * 3 - 3, 3));
        }
        newVal.unshift(val.substr(0, remain));
        setPrice({
          value: newVal,
          errorPrice: undefined,
        });
      } else {
        setPrice({
          value: val,
          errorPrice: undefined,
        });
      }
    }

    // setPrice(e.target.value);
  };
  const handleCount = (e) => {
    if (e.target.value === "") {
      setCount({
        value: e.target.value,
        errorCount: "Vui lòng nhập số lượng giảm giá",
      });
    } else {
      let val = e.target.value;
      val = val.replace(/,/g, "");
      if (val.length > 3) {
        let noCommas = Math.ceil(val.length / 3) - 1;
        let remain = val.length - noCommas * 3;
        let newVal = [];
        for (let i = 0; i < noCommas; i++) {
          newVal.unshift(val.substr(val.length - i * 3 - 3, 3));
        }
        newVal.unshift(val.substr(0, remain));
        setCount({
          value: newVal,
          errorCount: undefined,
        });
      } else {
        setCount({
          value: val,
          errorCount: undefined,
        });
      }
    }

    // setPrice(e.target.value);
  };

  const addCoupon = (e) => {
    e.preventDefault();

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
      price.value !== "" &&
      type.value !== "" &&
      count.value !== ""
    ) {
      const fetchRequestAddCoupon = async () => {
        try {
          const requestAddCoupon = await couponAdminApi.addCouponAdmin({
            endDate: endDate.value,
            discount:
              typeof price == "string" ? price.value : price.value.join(""),
            type: type.value,
            count:
              typeof count.value == "string"
                ? count.value
                : count.value.join(""),
            priceToDiscount:
              typeof priceToDiscount.value == "string"
                ? priceToDiscount.value
                : priceToDiscount.value.join(""),
          });
          if (requestAddCoupon.status === 200) {
            props.onFormFalse(false);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestAddCoupon();
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

  return (
    <div className={style.modalView}>
      <div className={`${style.backdropViewInformation} ${isOpenForm}`}></div>
      <div className={`${style.viewInformation} ${isOpenForm}`}>
        <div className={style.header}>
          <p>Thêm mã giảm giá</p>
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
                margin="normal"
                variant="outlined"
                fullWidth
                value={priceToDiscount.value}
                onChange={handlePriceToDiscount}
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
                margin="normal"
                variant="outlined"
                fullWidth
                value={price.value}
                onChange={handlePrice}
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
                  name="size"
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
                    name="size"
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
                margin="normal"
                variant="outlined"
                fullWidth
                value={count.value}
                onChange={handleCount}
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
              value={formattedDate}
              //   selected={new Date()}
              onChange={handleEndDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              //   onFocus={InputHandler}
              minDate={new Date()}
              id="birthday"
            ></DatePicker>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              className={classes.submit}
              onClick={addCoupon}
            >
              Thêm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAddCoupon;
