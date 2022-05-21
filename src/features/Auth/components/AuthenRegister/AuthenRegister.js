import React from 'react';
import PropTypes from 'prop-types';
import AuthenRegisterForm from '../AuthenRegisterForm/AuthenRegisterForm';
import authAPI from 'api/authAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
toast.configure();
AuthenRegister.propTypes = {};

function AuthenRegister(props) {
  let navigate = useNavigate();

  const handleSubmit = (values) => {
    const fetchVerify = async () => {
      try {
        const verify = await authAPI.verifyOTPSignUp({
          phone: props.onFromSDT,
          code: values.code,
        });
        console.log(verify);
        if (verify.status === 200) {
          const fetchRequestSignUp = async () => {
            try {
              const requestsignup = await authAPI.signUp({
                firstName: values.firstName,
                lastName: values.lastName,
                phone: props.onFromSDT,
                password: values.password,
              });
              console.log(requestsignup);
              if (requestsignup.status == 200) {
                navigate('/auth/login');
                toast.success('Đăng ký thành công', {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 2000,
                });
              }
            } catch (error) {
              console.log(error);
              toast.error('Đăng ký không thành công', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
              });
            }
          };
          fetchRequestSignUp();
        }
      } catch (error) {
        toast.error('Code hết hạn', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
        console.log(error);
      }
    };
    fetchVerify();
  };
  return (
    <div>
      <AuthenRegisterForm
        onSubmit={handleSubmit}
        onFromPhone={props.onFromSDT}
      />
    </div>
  );
}

export default AuthenRegister;
