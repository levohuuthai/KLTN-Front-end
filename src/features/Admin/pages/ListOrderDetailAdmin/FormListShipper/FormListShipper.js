import React, { useContext } from "react";
import classes from "./FormListShipper.module.scss";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "store/store";
import userAdminApi from "api/admin/userAdminApi";
import { ACTIOS } from "store/actions";
import { Pagination } from "@material-ui/lab";
toast.configure();
const FormListShipper = (props) => {
  const { idOrder, status } = props;
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch, state } = useContext(GlobalContext);

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenForm("");
    props.onFormFalse(false);
  };

  useEffect(() => {
    if (props.isOpenFormListShipper) {
      setIsOpenForm(classes.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isOpenFormListShipper]);
  const hanleUpdateStatus = () => {
    props.onFormFalse(false);
  };
  const [pagination, setPagination] = useState({
    limit: 2,
    total: 10,
    page: 1,
  });
  useEffect(() => {
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
  }, [
    state.filterPaginationAllUser._page,
    state.filterPaginationAllUser._limit,
  ]);
  return (
    <div className={classes.modalFormLogOut}>
      <div className={` ${classes.backdrop} ${isOpenForm}`}></div>
      <div className={` ${classes.viewFormLogOut} ${isOpenForm}`}>
        <div className={classes.header}>
          <h2>Danh sách người giao hàng</h2>
          <div className={classes.cancel} onClick={cancelHandler}>
            <div className={classes.blur}>
              <i className="bi bi-x"></i>
            </div>
          </div>
        </div>
        <div className={classes.body}>
          {state.dataAllShipper?.map((data, idx) => {
            const handleSelectItem = () => {
              props.onFormFalse(false);
              dispatch({
                type: ACTIOS.dataSelectShipper,
                payload: data,
              });
            };

            return (
              <p key={idx} className={classes.item} onClick={handleSelectItem}>
                <span className={classes.image}>
                  <img src={data.avatar} alt="img" />
                </span>
                <span>{data.phone}</span>
                <span className={classes.name_select}>{data.userName}</span>
              </p>
            );
          })}
        </div>
        {/* <div className={classes.footer}>
          <div className={classes.button}>
            <button className={classes.cancel} onClick={cancelHandler}>
              Không
            </button>
            <button className={classes.confirm} onClick={hanleUpdateStatus}>
              Xác nhận
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FormListShipper;
