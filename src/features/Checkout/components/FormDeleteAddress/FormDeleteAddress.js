import React from "react";
import classes from "./FormDeleteAddress.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import addressAPI from "api/addressAPI";
toast.configure();
const FormDeleteAddress = (props) => {
  const [isOpenForm, setIsOpenForm] = useState("");

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormDeleteAddress) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormDeleteAddress]);

  const DeleteAddressHandler = (event) => {
    event.preventDefault();
    const fetchDeleteAddress = async () => {
      try {
        const requestDeleteAddress = await addressAPI.deleteAddress(props.id);
        if (requestDeleteAddress.status === 200) {
          props.onFormFalse(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeleteAddress();
  };

  return (
    <div className={classes.modalFormDeleteAdress}>
      <div className={` ${classes.backdrop} ${isOpenForm}`}></div>
      <div className={` ${classes.viewFormDeleteAdress} ${isOpenForm}`}>
        <div className={classes.header}>
          <h2>Xác nhận</h2>
          <div className={classes.cancel} onClick={cancelHandler}>
            <div className={classes.blur}>
              <i className="bi bi-x"></i>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <p>Bạn có muốn xóa địa chỉ này khỏi hệ thống?</p>
        </div>
        <div className={classes.footer}>
          <div className={classes.button}>
            <button className={classes.cancel} onClick={cancelHandler}>
              Không
            </button>
            <button className={classes.confirm} onClick={DeleteAddressHandler}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDeleteAddress;
