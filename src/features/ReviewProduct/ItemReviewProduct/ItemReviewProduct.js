import authAPI from "api/authAPI";
import React, { useEffect, useState } from "react";
import style from "../ReviewProduct.module.scss";

function ItemReviewProduct(props) {
  const [user, setUser] = useState();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dayReview, setDayReview] = useState({ day: "", month: "", year: "" });

  useEffect(() => {
    const fetchRequestGetUserById = async () => {
      try {
        const requestGetUserById = await authAPI.getUserById(props.data.userId);
        setUser(requestGetUserById.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetUserById();
  }, []);
  useEffect(() => {
    var date = new Date(user?.createdAt);
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  }, [user]);
  useEffect(() => {
    var date = new Date(props.data?.createdAt);
    setDayReview({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }, [props.data]);
  return (
    <div className={`${style.item_reviewProduct} d-flex`}>
      <div className={style.item_reviewProduct_left}>
        <div className={`${style.avatar_name_group} d-flex align-items-center`}>
          <div className={style.avatar}>
            <img src={user?.avatar}></img>
          </div>
          <div className={`${style.name} d-flex flex-column`}>
            <span style={{ fontSize: "17px" }}>
              <b>{user?.userName}</b>
            </span>
            <span style={{ fontSize: "14px" }}>
              Đã tham gia vào ngày {day} - {month} - {year}
            </span>
          </div>
        </div>
      </div>
      <div className={style.item_reviewProduct_right}>
        <div className={style.star_group}>
          <span>
            {props.data.rating === 5 ? (
              <>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
              </>
            ) : props.data.rating === 4 ? (
              <>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i
                  className="fas fa-star"
                  style={{ color: "rgb(221, 221, 227)" }}
                ></i>
              </>
            ) : props.data.rating === 3 ? (
              <>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i
                  className="fas fa-star"
                  style={{ color: "rgb(221, 221, 227)" }}
                ></i>
                <i
                  className="fas fa-star"
                  style={{ color: "rgb(221, 221, 227)" }}
                ></i>
              </>
            ) : props.data.rating === 2 ? (
              <>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i
                  className="fas fa-star"
                  style={{ color: "rgb(221, 221, 227)" }}
                ></i>
                <i
                  className="fas fa-star"
                  style={{ color: "rgb(221, 221, 227)" }}
                ></i>
                <i
                  className="fas fa-star"
                  style={{ color: "rgb(221, 221, 227)" }}
                ></i>
              </>
            ) : props.data.rating === 1 ? (
              <>
                <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                <i
                  className="fas fa-star"
                  style={{ color: "rgb(221, 221, 227)" }}
                ></i>
                <i
                  className="fas fa-star"
                  style={{ color: "rgb(221, 221, 227)" }}
                ></i>
                <i
                  className="fas fa-star"
                  style={{ color: "rgb(221, 221, 227)" }}
                ></i>
                <i
                  className="fas fa-star"
                  style={{ color: "rgb(221, 221, 227)" }}
                ></i>
              </>
            ) : (
              ""
            )}
          </span>
          <span style={{ marginLeft: "20px" }}>
            <b>
              {props.data.rating === 5
                ? "Cực kì hài lòng"
                : props.data.rating === 4
                ? "Hài lòng"
                : props.data.rating === 3
                ? "Bình thường"
                : props.data.rating === 2
                ? "Không hài lòng"
                : props.data.rating === 1
                ? "Rất không hài lòng"
                : ""}
            </b>
          </span>
        </div>
        <div className={style.review}>{props.data.comment}</div>{" "}
        <div className={style.image_review}>
          <img src={props.data.image}></img>
        </div>
        <div className={style.time_review}>
          <span>
            Đánh giá vào ngày {dayReview.day} - {dayReview.month} -{" "}
            {dayReview.year}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ItemReviewProduct;
