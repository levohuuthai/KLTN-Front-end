import reviewApi from "api/reviewApi";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function TotalStar({ productId }) {
  const [count5star, setCount5Star] = useState();
  const [count4star, setCount4Star] = useState();
  const [count3star, setCount3Star] = useState();
  const [count2star, setCount2Star] = useState();
  const [count1star, setCount1Star] = useState();
  const [totalStar, setTotalStar] = useState("");
  const { dispatch, state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchRequestGetListReview5Star = async () => {
      try {
        const requestGetListReview5Star = await reviewApi.getListReview5Star(
          productId
        );
        setCount5Star(requestGetListReview5Star.data?.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetListReview5Star();
    const fetchRequestGetListReview4Star = async () => {
      try {
        const requestGetListReview4Star = await reviewApi.getListReview4Star(
          productId
        );
        setCount4Star(requestGetListReview4Star.data?.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetListReview4Star();
    const fetchRequestGetListReview3Star = async () => {
      try {
        const requestGetListReview3Star = await reviewApi.getListReview3Star(
          productId
        );
        setCount3Star(requestGetListReview3Star.data?.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetListReview3Star();
    const fetchRequestGetListReview2Star = async () => {
      try {
        const requestGetListReview2Star = await reviewApi.getListReview2Star(
          productId
        );
        setCount2Star(requestGetListReview2Star.data?.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetListReview2Star();
    const fetchRequestGetListReview1Star = async () => {
      try {
        const requestGetListReview1Star = await reviewApi.getListReview1Star(
          productId
        );
        setCount1Star(requestGetListReview1Star.data?.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetListReview1Star();
  }, []);
  useEffect(() => {
    setTotalStar(
      (count1star * 1 +
        count2star * 2 +
        count3star * 3 +
        count4star * 4 +
        count5star * 5) /
        (count1star + count2star + count3star + count4star + count5star)
    );
  }, [count1star, count2star, count3star, count4star, count5star]);
  useEffect(() => {
    dispatch({
      type: ACTIOS.totalStar,
      payload: totalStar,
    });
  }, [totalStar]);
  return (
    <div>
      {totalStar >= 5 && (
        <>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
        </>
      )}{" "}
      {totalStar < 5 && totalStar >= 4.5 && (
        <>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i
            className="fas fa-star-half-alt checked"
            style={{ color: "#ba933e" }}
          ></i>
        </>
      )}
      {totalStar < 4.5 && totalStar >= 4 && (
        <>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          {/* <span
        className="fa fa-star-half-alt checked"
        style={{ color: "#ba933e", fontSize: "20px" }}
      ></span> */}
        </>
      )}
      {totalStar < 4 && totalStar >= 3.5 && (
        <>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i
            className="fas fa-star-half-alt checked"
            style={{ color: "#ba933e" }}
          ></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
        </>
      )}
      {totalStar < 3.5 && totalStar >= 3 && (
        <>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
        </>
      )}
      {totalStar < 3 && totalStar >= 2.5 && (
        <>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i
            className="fas fa-star-half-alt checked"
            style={{ color: "#ba933e" }}
          ></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
        </>
      )}
      {totalStar < 2.5 && totalStar >= 2 && (
        <>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
        </>
      )}
      {totalStar < 2 && totalStar >= 1.5 && (
        <>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i
            className="fas fa-star-half-alt checked"
            style={{ color: "#ba933e" }}
          ></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
        </>
      )}
      {totalStar < 1.5 && totalStar >= 1 && (
        <>
          <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
        </>
      )}{" "}
      {totalStar < 1 && totalStar >= 0.5 && (
        <>
          <i
            className="fas fa-star-half-alt checked"
            style={{ color: "#ba933e" }}
          ></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>

          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
          <i className="far fa-star" style={{ color: "#ba933e" }}></i>
        </>
      )}
      {isNaN(totalStar) && (
        <>
          {/* <span style={{ marginRight: "5px" }}>Chưa có đánh giá</span> */}
        </>
      )}
    </div>
  );
}

export default TotalStar;
