import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import style from './LoginForm.module.scss';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'components/Form-control/InputField';
import { makeStyles } from '@material-ui/styles';
import PasswordField from 'components/Form-control/PasswordField';
import { Button, Typography } from '@material-ui/core';
import iconGoogle from 'assets/images/auth//login/iconGoogle.jpg';
import imgbackground4 from 'assets/images/auth/login/imgbackground4.jpg';
import authAPI from 'api/authAPI';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

LoginForm.propTypes = { onSubmit: PropTypes.func };
const useStyles = makeStyles((theme) => ({
  // emailInput: { padding: theme.spacing(2) },
  title: {
    color: '#444',
  },
  titlePassword: {
    color: '#444',
    paddingTop: '13px',
  },
  submit: {
    background: 'black',
    width: '130px',
    height: '50px',
    color: '#fff',
    transition: 'all 0.6s',
    marginTop: '20px',
    '&:hover': {
      background: '#ba933e',
      transition: 'all 0.6s',
    },
  },
  forgetPassword: {
    color: '#444',
    paddingTop: '30px',
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  // const schema = yup.object().shape({
  //   title: yup
  //     .string()
  //     .required("please enter title")
  //     .min(5, "Title is too short"),
  // });
  const form = useForm({
    defaultValues: {
      SDT: '',
      password: '',
    },
    //  resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
    form.reset();
  };
  // const handleLoginGoogle = (e) => {
  //   const fetchRequestLoginGoogle = async () => {
  //     try {
  //       const requestLoginGoogle = await authAPI.loginGoogle();
  //       console.log(requestLoginGoogle);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchRequestLoginGoogle();
  // };
  // const handleLoginFacebook = (e) => {
  //   const fetchRequestLoginFacebook = async () => {
  //     try {
  //       const requestLoginFacebook = await authAPI.loginFacebook();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchRequestLoginFacebook();
  // };

  //handleLoginFacebook
  const client_id = '1027070578219640';
  const redirect_uri = 'https://hientranfrontend22.tk/';
  const scope = 'public_profile,email';
  const handleLoginFacebook = () => {
    window.location.href = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;
  };

  const [clickGoogle, setClickGoogle] = useState(false);
  //handleLoginGoogle
  const handleLoginGoogle = async () => {
    setClickGoogle(true);
    window.location.href = await `https://hientranbackend22.tk/auth/googleV2`;
  };

  return (
    <div className={`${style.form_login} wrap`}>
      <div className={`${style.background_slider} `}>
        <div className={style.imgbackground}>
          <img src={imgbackground4} alt='' />
        </div>
        <div className={style.title_background}>
          Tài khoản của tôi <p>Trang chủ / Tài khoản</p>
        </div>
      </div>
      <div className={style.title}>Đăng nhập</div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`${style.form} d-flex flex-column`}
      >
        <Typography className={classes.title}>
          Số điện thoại <span style={{ color: 'red' }}>*</span>
        </Typography>
        <InputField name='SDT' label='Nhập số điện thoại' form={form} />
        <Typography className={classes.titlePassword}>
          Mật Khẩu <span style={{ color: 'red' }}>*</span>
        </Typography>
        <PasswordField name='password' label='Nhập mật khẩu' form={form} />
        <Button type='submit' className={classes.submit}>
          Đăng nhập
        </Button>
        <Typography className={classes.forgetPassword}>
          Quên mật khẩu?
        </Typography>
        <div className={`${style.or} position-relative`}>
          <p className='position-absolute'>Hoặc tiếp tục bằng</p>
        </div>
        <div className={style.buttonsns}>
          <div className={style.facebook} onClick={handleLoginFacebook}>
            <i className='fab fa-facebook'></i> Facebook
          </div>
          <div className={style.google} onClick={handleLoginGoogle}>
            <img src={iconGoogle} alt='icon google' /> Google
          </div>
        </div>
        <div className={`${style.register}`}>
          <p>
            Bạn mới biết đến Rubix? <span>Đăng ký</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
