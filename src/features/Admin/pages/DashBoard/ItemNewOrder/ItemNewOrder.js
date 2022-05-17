import React, { useEffect, useState } from "react";
import userAdminApi from "api/admin/userAdminApi";
import style from "../DashBoard.module.scss";

function ItemNewOrder(props) {
  const [user, setUser] = useState();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
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
    fetchRequestGetUserById(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    var date = new Date(props.data.createdAt);
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    setHours(date.getHours());
    setMinutes(date.getMinutes());
  }, [props.data.createdAt]);
  return (
    <>
      <td className={style.phone}>{user?.phone}</td>
      <td className={style.countProduct}> {props.data.products.length}</td>
      <td className={style.countProduct}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.data.amount)}
      </td>
      <td>
        {hours.toString().length === 1 ? "0" + hours : hours}:
        {minutes.toString().length === 1 ? "0" + minutes : minutes}{" "}
        {day.toString().length === 1 ? "0" + day : day}-
        {month.toString().length === 1 ? "0" + month : month}-{year}
      </td>
    </>
  );
}

export default ItemNewOrder;
