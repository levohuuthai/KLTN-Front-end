import { Button, makeStyles } from "@material-ui/core";
import React, { useContext, useState } from "react";
import style from "./Subscribe.module.scss";
import emailApi from "api/emailApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import Notify from "components/Notify/Notify";
import InputField from "components/Form-control/InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
const useStyles = makeStyles((theme) => ({
  submit: {
    background: "black",
    width: "130px",
    height: "54px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "17px",
    marginLeft: "10px",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
}));
function Subscribe(props) {
  const { dispatch } = useContext(GlobalContext);

  //moi
  const classes = useStyles();

  const schema = yup.object().shape({
    email: yup.string().email("Email không đúng").required("Email không đúng"),
  });
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const [message, setMessage] = useState("");
  const handleSubmit = (values) => {
    if (values.email !== "") {
      dispatch({
        type: ACTIOS.activeNotify,
        payload: true,
      });
      const fetchRequestAddEmail = async () => {
        try {
          const requestAddEmail = await emailApi.addEmail({
            email: values.email,
          });
          if (requestAddEmail.status === 200) {
            setMessage("Cảm ơn bạn đã đăng ký nhận tin tức từ chúng tôi");
            setTimeout(() => {
              dispatch({
                type: ACTIOS.activeNotify,
                payload: false,
              });
            }, 2000);
          }
        } catch (error) {
          setMessage(error);
          setTimeout(() => {
            dispatch({
              type: ACTIOS.activeNotify,
              payload: false,
            });
          }, 2000);
        }
      };
      fetchRequestAddEmail();
    }
  };
  console.log(message === "Mail này đã được thêm rồi");
  return (
    <section className={`${style.subcribe_bg} wrap section`}>
      <div className=" d-flex justify-content-center">
        <div className={style.subcribe}>
          <h2>Đăng ký nhận bản tin của chúng tôi</h2>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className={`${style.form} d-flex flex-column`}
          >
            <div className={style.input_sub_group}>
              {/* <input type="text" placeholder="Nhập email của bạn vào đây" /> */}
              {/* <TextField
              name="email"
              label="Nhập email của bạn"
              margin="normal"
              variant="outlined"
              fullWidth
              value={email.value}
              onChange={handleEmail}
              error={!!email.errorEmail}
              helperText={
                email.errorEmail !== undefined ? email.errorEmail : ""
              }
            ></TextField>{" "} */}
              <InputField name="email" label="Nhập email của bạn" form={form} />
              {/* <div>
                <span className={style.subscribe} onClick={handleSubscribe}>
                  Subscribe
                </span>
              </div> */}
              <Button
                type="submit"
                variant="contained"
                className={classes.submit}
              >
                Xác nhận
              </Button>
            </div>{" "}
          </form>
          <p style={{ paddingTop: "20px", textAlign: "center" }}>
            Chúng tôi tôn trọng quyền riêng tư của bạn, vì vậy chúng tôi không
            bao giờ chia sẻ thông tin của bạn.
          </p>
        </div>
      </div>
      <Notify>
        {message === "Mail này đã được thêm rồi"
          ? "Email này đã được đăng ký"
          : message}
      </Notify>
    </section>
  );
}

export default Subscribe;
