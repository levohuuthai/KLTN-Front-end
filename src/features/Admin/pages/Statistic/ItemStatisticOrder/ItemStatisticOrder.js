import userAdminApi from "api/admin/userAdminApi";
import React, { useEffect, useState } from "react";
import style from "../Statistic.module.scss";

function ItemStatisticOrder(props) {
  const [user, setUser] = useState();
  const [day, setDay] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
  });
  useEffect(() => {
    var date = new Date(props?.data.createdAt);
    setDay({
      minute: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }, [props?.data.createdAt]);
  useEffect(() => {
    const fetchRequestGetUserById = async () => {
      try {
        const requestGetUserById = await userAdminApi.getUserById(
          props.data?.userId
        );

        setUser(requestGetUserById.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetUserById();
  }, []);
  return (
    <div className={`${style.item_order} d-flex justify-content-between`}>
      <span className={`${style.top} d-flex justify-content-center`}>
        {props.idx + 1}
      </span>
      <span className={`${style.id_order} d-flex justify-content-center`}>
        #{props.data._id?.slice(-5)}
      </span>
      <span className={`${style.totalMoney} d-flex justify-content-center`}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.data?.amount)}
      </span>
      <span className={`${style.nameCustomer}  d-flex justify-content-center`}>
        {user?.userName}
      </span>
      <span className={`${style.createDate} d-flex justify-content-center`}>
        {/* {day.hour?.toString().length === 1 ? "0" + day.hour : day.hour}:
        {day.minute?.toString().length === 1 ? "0" + day.minute : day.minute}{" "} */}
        {/* ngày */}
        {day.day?.toString().length === 1 ? "0" + day.day : day.day}/
        {day.month?.toString().length === 1 ? "0" + day.month : day.month}/
        {day.year}
      </span>
    </div>
  );
}

export default ItemStatisticOrder;
