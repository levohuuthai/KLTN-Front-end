import React, { useContext, useEffect, useState } from "react";
import style from "../ListUserAdmin.module.scss";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import productAdminApi from "api/admin/productAdminApi";
import userAdminApi from "api/admin/userAdminApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function ItemUserAdmin(props) {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const { dispatch, state } = useContext(GlobalContext);

  const handleActiveDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };
  useEffect(() => {
    var date = new Date(props.data.createdAt);
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  }, [props.data.createdAt]);
  const handleLockedAccount = (event) => {
    event.preventDefault();
    const fetchRequestLockedUser = async () => {
      try {
        const requestLockedUser = await userAdminApi.lockedUser(props.data._id);
        if (requestLockedUser.status === 200) {
          const fetchRequestGetAllUser = async () => {
            try {
              const requestGetAllUser = await userAdminApi.getAllUser(
                state.filterPaginationAllUser._page,
                state.filterPaginationAllUser._limit
              );
              dispatch({
                type: ACTIOS.dataAllUser,
                payload: requestGetAllUser.data.users,
              });
            } catch (error) {
              console.log(error);
            }
          };
          fetchRequestGetAllUser();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestLockedUser();
  };
  const handleUnLockedAccount = (event) => {
    event.preventDefault();
    const fetchRequestLockedUser = async () => {
      try {
        const requestLockedUser = await userAdminApi.unLockedUser(
          props.data._id
        );
        if (requestLockedUser.status === 200) {
          const fetchRequestGetAllUser = async () => {
            try {
              const requestGetAllUser = await userAdminApi.getAllUser(
                state.filterPaginationAllUser._page,
                state.filterPaginationAllUser._limit
              );
              dispatch({
                type: ACTIOS.dataAllUser,
                payload: requestGetAllUser.data.users,
              });
            } catch (error) {
              console.log(error);
            }
          };
          fetchRequestGetAllUser();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestLockedUser();
  };
  console.log(props.data);
  return (
    <div
      className={`${style.item_product} d-flex justify-content-between align-items-center`}
    >
      <div
        className={`${
          props.data.active === false ? style.locked_backdrop : ""
        }`}
      ></div>
      {props.data.active === false && (
        <div className={style.cover_notify}>
          <div className={style.notify_locked}>Đã khóa</div>
        </div>
      )}
      {props.data.active === false && (
        <div className={style.button_unlock} onClick={handleUnLockedAccount}>
          Mở khóa
        </div>
      )}
      <p className={`${style.image_item_product}`}>
        <img src={props.data.avatar}></img>
      </p>
      <span
        className={`${style.name_item}  d-flex justify-content-center flex-column`}
      >
        {props.data.userName}
      </span>
      <span className={`${style.phone} d-flex justify-content-center`}>
        {props.data.phone}
      </span>
      <span className={`${style.status} d-flex justify-content-center`}>
        {props.data.active === false ? "Không hoạt động" : "Hoạt động"}
      </span>
      <div className={`${style.create_date} d-flex justify-content-center`}>
        <span>
          {day} - {month} - {year}
        </span>
      </div>
      <span className={`${style.close} d-flex justify-content-center`}>
        <div className={style.delete}>
          <nav>
            <ul>
              <li
                className={`${style.ItemDelete} ${
                  activeDropdown ? style.active : ""
                } `}
                onClick={handleActiveDropdown}
              >
                <i className="fas fa-ellipsis-h"></i>
                <ul
                  className={`${style.dropdown} `}
                  onClick={handleLockedAccount}
                >
                  <li>Khóa tài khoản</li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </span>
    </div>
  );
}

export default ItemUserAdmin;
