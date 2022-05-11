import React from "react";
import PropTypes from "prop-types";
import RegisterForm from "../RegisterForm/RegisterForm";
import authAPI from "api/authAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
Register.propTypes = {};

function Register(props) {
  let navigate = useNavigate();
  const handleSubmit = (values) => {
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
          };
          fetchSendOTP();

          navigate("/auth/authenregister");
        }
      } catch (error) {
        toast.error(error, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
    };
    fetchRequestcheckPhone();
    props.onReceiveSDT(values.SDT);
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
