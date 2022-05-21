import userAdminApi from "api/admin/userAdminApi";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "../ListOrderAdmin.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function ItemOrderAdmin(props) {
  const [user, setUser] = useState();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(false);
  const handleActiveDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  useEffect(() => {
    const fetchRequestGetUserById = async () => {
      try {
        const requestGetUserById = await userAdminApi.getUserById(
          props.data.userId
        );
        setUser(requestGetUserById.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetUserById();
  }, []);
  useEffect(() => {
    var date = new Date(props.data.createdAt);
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  }, [props.data.createdAt]);
  let navigate = useNavigate();

  const handleUpdateStatus = () => {
    navigate("/admin/listorderDetail", {
      state: {
        dataOrder: props.data,
      },
    });
  };
  const { dispatch, state } = useContext(GlobalContext);

  // useEffect(() => {
  //   dispatch({
  //     type: ACTIOS.dataAllOrderDetail,
  //     payload: props.data,
  //   });
  // }, [props.data, state.dataAllOrderDetail]);
  return (
    <div
      className={`${style.item_order} ${
        props.idx % 2 === 0 ? style.zebra : ""
      }`}
    >
      <span className={`${style.id}  d-flex justify-content-center`}>
        #{props.data._id.slice(12, 16)}
      </span>
      <span className={`${style.nameuser} d-flex justify-content-center`}>
        {user?.phone}
      </span>
      <span className={`${style.total_money} d-flex justify-content-center`}>
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.data.amount)}
        </span>
      </span>
      <span className={`${style.create_date} d-flex justify-content-center`}>
        <span>
          {day}-{month}-{year}
        </span>
      </span>
      <span
        className={`${style.state_order} ${
          props.data.status === "Đang Giao Hàng"
            ? style.activeShipping
            : props.data.status === "Đã Giao"
            ? style.activeDelivered
            : props.data.status === "Đã Hủy"
            ? style.activeCancel
            : props.data.status === "Đang Xử Lý"
            ? style.activeWaitting
            : ""
        } d-flex justify-content-center`}
      >
        {props.data.status}
      </span>
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
                <ul className={`${style.dropdown} `}>
                  <li onClick={handleUpdateStatus}>
                    <i class="fas fa-wrench"></i>Cập nhật trạng thái
                  </li>{" "}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </span>
    </div>
  );
}

export default ItemOrderAdmin;
