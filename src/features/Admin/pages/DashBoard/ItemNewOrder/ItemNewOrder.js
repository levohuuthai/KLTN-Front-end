import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import userAdminApi from "api/admin/userAdminApi";

ItemNewOrder.propTypes = {};

function ItemNewOrder(props) {
  const [user, setUser] = useState();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
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
  return (
    <>
      <td>{user?.phone}</td>
      <td> {props.data.products.length}</td>
      <td>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(props.data.amount)}
      </td>
      <td>
        {day} - {month} - {year}
      </td>
    </>
  );
}

export default ItemNewOrder;
