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
import style from "./FormAddShipper.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import axios from "axios";
import userAdminApi from "api/admin/userAdminApi";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "moment/locale/vi";
import "react-datepicker/dist/react-datepicker.css";
import NumberFormat from "react-number-format";
import shipper from "assets/images/shipper.png";

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
function FormAddShipper(props) {
  const classes = useStyles();
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);
  const [genderUser, setGenderUser] = useState({ genderUser: "" });
  const [birthdayUser, setBirthdayUser] = useState({ birthday: new Date() });

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
  const [nameShipper, setNameShipper] = useState({
    value: "",
    errorNameShipper: undefined,
  });
  const [phoneShipper, setPhoneShipper] = useState({
    value: "",
    errorPhoneShipper: undefined,
  });
  const handleNameShipper = (e) => {
    if (e.target.value === "") {
      setNameShipper({
        value: e.target.value,
        errorNameShipper: "Vui lòng nhập tên",
      });
    } else {
      setNameShipper({ value: e.target.value, errorNameShipper: undefined });
    }
  };
  const handlePhoneShipper = (e) => {
    if (e.target.value === "") {
      setPhoneShipper({
        value: e.target.value,
        errorPhoneShipper: "Vui lòng nhập số điện thoại",
      });
    } else {
      setPhoneShipper({ value: e.target.value, errorPhoneShipper: undefined });
    }
  };
  const genderHandler = (event) => {
    setGenderUser({ genderUser: event.target.value === "true" ? true : false });
  };
  const handleChangeBirthDate = (date) => {
    setBirthdayUser({ birthday: date._d });
  };
  const [pagination, setPagination] = useState({
    limit: 2,
    total: 10,
    page: 1,
  });
  const addCoupon = (e) => {
    e.preventDefault();
    if (nameShipper.value === "") {
      setNameShipper({ ...nameShipper, errorNameShipper: "Vui lòng nhập tên" });
    }
    if (phoneShipper.value === "") {
      setPhoneShipper({
        ...phoneShipper,
        errorPhoneShipper: "Vui lòng nhập số điện thoại",
      });
    }
    if (nameShipper.value !== "" && phoneShipper.value !== "") {
      const fetchAddSignUp = async () => {
        try {
          const requestsignup = await userAdminApi.addShipper({
            userName: nameShipper.value,
            password: "123456",
            phone: phoneShipper.value,
            birthday: birthdayUser.birthday,
            gender: genderUser.genderUser,
            role: "shipper",
            avatar:
              "https://static.proship.vn/uploads/news/2016/07/26/Proship.VN_1469507359.2127.jpg",
          });
          console.log(requestsignup);
          if (requestsignup.status == 200) {
            toast.success("Thêm thành công", {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 2000,
            });
            const fetchRequestGetAllShipper = async () => {
              try {
                const requestGetAllShipper = await userAdminApi.getAllShipper(
                  state.filterPaginationAllUser._page,
                  state.filterPaginationAllUser._limit,
                  "shipper"
                );

                dispatch({
                  type: ACTIOS.dataAllShipper,
                  payload: requestGetAllShipper.data.users,
                });
                setPagination(requestGetAllShipper.pagination);
              } catch (error) {
                console.log(error);
              }
            };
            fetchRequestGetAllShipper();
            props.onFormFalse(false);
          }
        } catch (error) {
          console.log(error);
          toast.error("Thêm không thành công", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
        }
      };
      fetchAddSignUp();
    }
  };

  return (
    <div className={style.modalView}>
      <div className={`${style.backdropViewInformation} ${isOpenForm}`}></div>
      <div className={`${style.viewInformation} ${isOpenForm}`}>
        <div className={style.header}>
          <p>Thêm người giao hàng</p>
          <div onClick={cancelHandler}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className={style.formAddCoupon}>
          <div className="d-flex justify-content-center">
            <div className={style.img_shipper}>
              <img src={shipper} alt="shipper" />
            </div>
          </div>
          <div className={style.nameShipper}>
            <Typography className={classes.title}>
              Họ và tên <span style={{ type: "red" }}>*</span>
            </Typography>
            <TextField
              name="collar"
              label="Nhập họ và tên"
              margin="normal"
              variant="outlined"
              fullWidth
              value={nameShipper.value}
              onChange={handleNameShipper}
              error={!!nameShipper.errorNameShipper}
              helperText={
                nameShipper.errorNameShipper !== undefined
                  ? nameShipper.errorNameShipper
                  : ""
              }
            />
          </div>
          <div className={style.phone}>
            <Typography className={classes.title}>
              Số điện thoại <span style={{ type: "red" }}>*</span>
            </Typography>
            <TextField
              name="collar"
              label="Nhập số điện thoại"
              margin="normal"
              variant="outlined"
              fullWidth
              value={phoneShipper.value}
              onChange={handlePhoneShipper}
              error={!!phoneShipper.errorPhoneShipper}
              helperText={
                phoneShipper.errorPhoneShipper !== undefined
                  ? phoneShipper.errorPhoneShipper
                  : ""
              }
            />
          </div>
          <div className={style.gender}>
            <label>
              <i className="fas fa-venus-mars"></i>Giới tính
            </label>
            <div className={style.type}>
              <input
                onChange={genderHandler}
                type="radio"
                value={true}
                name="gender"
                checked={genderUser.genderUser === true}
                id="Nam"
              />
              <label htmlFor="Nam">Nam</label>
              <input
                onChange={genderHandler}
                type="radio"
                value={false}
                name="gender"
                checked={genderUser.genderUser === false}
                id="Nu"
              />
              <label htmlFor="Nu">Nữ</label>
            </div>
          </div>{" "}
          <div className={style.birthday}>
            <label htmlFor="birthday">
              <i className="fas fa-birthday-cake"></i>Ngày sinh
            </label>
            <MuiPickersUtilsProvider locale="vi" utils={MomentUtils}>
              <KeyboardDatePicker
                placeholder="DD/MM/YYYY"
                format={"DD/MM/YYYY"}
                value={birthdayUser.birthday}
                onChange={handleChangeBirthDate}
                animateYearScrolling={false}
                autoOk={true}
                clearable
              />
            </MuiPickersUtilsProvider>
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

export default FormAddShipper;
