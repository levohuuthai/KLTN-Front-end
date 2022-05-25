import React, { useContext } from "react";
import style from "./FormUpdatePhone.module.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import couponApi from "api/couponApi";
import { useSelector } from "react-redux";
import InputField from "components/Form-control/InputField";
import { Button, makeStyles, Typography } from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import authAPI from "api/authAPI";
toast.configure();

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#444",
  },
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
const FormUpdatePhone = (props) => {
  const classes = useStyles();

  const schema = yup.object().shape({
    SDT: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .test(
        "Số điện thoại bắt đầu là 0 và gồm 10 kí số ",
        "Số điện thoại bắt đầu là 0 và gồm 10 kí số",
        (value) => {
          const regex = /^(0|84)[0-9]{9}$/;
          return regex.test(value);
        }
      ),
  });
  const form = useForm({
    defaultValues: {
      SDT: "",
    },
    resolver: yupResolver(schema),
  });
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);
  const loggedInUser = useSelector((state) => state.user.current);

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormUpdatePhone) {
      setIsOpenForm(style.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormUpdatePhone]);

  const [enteredCode, setEnteredCode] = useState("");
  const [phone, setPhone] = useState();

  const CodeInputChangeHandler = (event) => {
    setEnteredCode(event.target.value);
  };

  const SendOTPAgainHandler = () => {
    const fetchSendOTP = async () => {
      const sendOTP = await authAPI.sendOTP({
        phone: phone,
      });
      if (sendOTP.status === 201) {
        toast.success("Đã gửi lại OTP thành công!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    };
    fetchSendOTP();
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const fetchVerify = async () => {
      try {
        const verify = await authAPI.verifyOTPSignUp({
          phone: phone,
          code: enteredCode,
        });
        if (verify.status === 200) {
          const fetchReplaceUser = async () => {
            try {
              const verify = await authAPI.replaceUser({
                userID: loggedInUser._id,
                newUser: {
                  ...loggedInUser,
                  phone: phone,
                },
              });
              console.log(verify);
              if (verify.status === 200) {
                toast.success("Cập nhập thành công", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 2000,
                });
                props.onFormFalse(false);
                //   props.onSendAvatarToHome(selectedAvatar.new);
              }
            } catch (error) {
              console.log(error);
              toast.error("Cập nhập không thành công!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: false,
              });
            }
          };
          fetchReplaceUser();
        }
      } catch (error) {
        toast.error("Code hết hạn", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        console.log(error);
      }
    };
    fetchVerify();
  };
  const [showFormVerify, setShowFormVerify] = useState();
  const handleSubmit = (values) => {
    setPhone(values.SDT);
    const fetchRequestcheckPhone = async () => {
      try {
        const requestcheckPhone = await authAPI.checkPhone({
          phone: values.SDT,
        });
        if (requestcheckPhone.status === 201) {
          const fetchSendOTP = async () => {
            const sendOTP = await authAPI.sendOTP({
              phone: values.SDT,
            });
            console.log(sendOTP);
            setShowFormVerify(true);
          };
          fetchSendOTP();
        }
      } catch (error) {
        toast.error(error, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        setShowFormVerify(false);
      }
    };
    fetchRequestcheckPhone();
  };

  return (
    <div className={style.modalFormLogOut}>
      <div className={` ${style.backdrop} ${isOpenForm}`}></div>
      <div
        className={` ${style.viewFormLogOut} ${
          showFormVerify ? style.activeVerify : ""
        } ${isOpenForm}`}
      >
        <div className={style.header}>
          <h2>Nhập số điện thoại</h2>
          <div className={style.cancel} onClick={cancelHandler}>
            <div className={style.blur}>
              <i className="bi bi-x"></i>
            </div>
          </div>
        </div>
        <div className={style.body}>
          <span
            style={{
              display: "inline-block",
              padding: "5px 20px",
              color: "red",
            }}
          >
            Do bạn chưa có số điện thoại, bạn cần cập nhật số điện thoại để đặt
            hàng
          </span>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div style={{ padding: "0px 20px" }}>
              <Typography className={classes.title}>
                Số điện thoại <span style={{ color: "red" }}>*</span>
              </Typography>
              <InputField name="SDT" label="Nhập số điện thoại" form={form} />
            </div>
            <div
              style={{
                padding: "10px 20px",
                textAlign: "right",
                marginTop: "-20px",
              }}
            >
              <Button type="submit" className={classes.submit}>
                Xác nhận
              </Button>
            </div>{" "}
          </form>
          {showFormVerify && (
            <div className={style.verify}>
              <header>{/* <img src={logo} alt="s" /> */}</header>
              <form onSubmit={formSubmitHandler}>
                <div className={style.container}>
                  <div className={style["title-form"]}>
                    <p>Bạn sẽ nhận được tin nhắn có mã kích hoạt từ RUBIX</p>
                    <h2>{props.onSendPhoneToVerify}</h2>
                  </div>
                  <div className={style.inputCode}>
                    <input
                      type="text"
                      placeholder="Mã kích hoạt"
                      onChange={CodeInputChangeHandler}
                    />
                  </div>
                  <p className={style.reSendOTP} onClick={SendOTPAgainHandler}>
                    Gửi lại mã kích hoạt
                  </p>
                </div>
                <button className={style["btn-first"]}>Xác nhận</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormUpdatePhone;
