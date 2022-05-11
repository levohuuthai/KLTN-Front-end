import React, { useEffect, useState, useContext } from "react";
import style from "./ReviewProduct.module.scss";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import reviewApi from "api/reviewApi";
import ItemReviewProduct from "./ItemReviewProduct/ItemReviewProduct";
import TotalStar from "components/TotalStar/TotalStar";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function ReviewProduct(props) {
  const [listReview, setListReview] = useState([]);
  const [count5star, setCount5Star] = useState();
  const [count4star, setCount4Star] = useState();
  const [count3star, setCount3Star] = useState();
  const [count2star, setCount2Star] = useState();
  const [count1star, setCount1Star] = useState();
  const [totalComment, setTotalComment] = useState();
  const [totalStar, setTotalStar] = useState("");
  const [filter5Star, setFilter5Star] = useState({ value: 5, active: true });
  const [filter4Star, setFilter4Star] = useState({ value: 4, active: true });
  const { dispatch, state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchRequestGetListReview = async () => {
      try {
        const requestGetListReview = await reviewApi.getListReview(
          props.dataProduct._id
        );
        setListReview(requestGetListReview?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetListReview();
  }, []);
  useEffect(() => {
    const fetchRequestGetListReview5Star = async () => {
      try {
        const requestGetListReview5Star = await reviewApi.getListReview5Star(
          props.dataProduct._id
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
          props.dataProduct._id
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
          props.dataProduct._id
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
          props.dataProduct._id
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
          props.dataProduct._id
        );
        setCount1Star(requestGetListReview1Star.data?.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetListReview1Star();
  }, []);

  useEffect(() => {
    setTotalComment(
      count1star + count2star + count3star + count4star + count5star
    );
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
  const handleFilter5star = () => {
    setFilter5Star({ value: 5, active: !filter5Star.active });
  };
  const handleFilter4star = () => {
    setFilter4Star({ value: 4, active: !filter4Star.active });
  };
  return (
    <>
      {listReview.length > 0 && (
        <div className={style.detail_product_review}>
          <div className={style.header_reviewProduct}>
            <div className={style.header_left}>
              <h5> Đánh Giá - Nhận Xét Từ Khách Hàng</h5>
              <div className={style.total_count_star_group}>
                <div
                  className={`${style.total_star} d-flex align-items-center`}
                >
                  <h2 style={{ marginRight: "20px" }}>{totalStar}</h2>
                  <div className={style.total_star_comment}>
                    <TotalStar productId={props.dataProduct._id} />
                    <span>{totalComment} nhận xét</span>
                  </div>
                </div>
                <div className={`${style.star_group} d-flex flex-column`}>
                  <div
                    className={`${style.star_count_star} d-flex align-items-center`}
                  >
                    <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                    <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                    <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                    <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                    <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                    <div className={style.progress}>
                      <div
                        className={style.progress_in}
                        style={{
                          color: "#ba933e",
                          width: (count5star / totalComment) * 100 + "%",
                        }}
                      ></div>
                    </div>
                    <span className={style.total_star}>{count5star}</span>
                  </div>
                  {/* 4 sao */}
                  <div
                    className={`${style.star_count_star} d-flex align-items-center`}
                  >
                    <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                    <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                    <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                    <i className="fas fa-star" style={{ color: "#ba933e" }}></i>
                    <i
                      className="fas fa-star"
                      style={{ color: "rgb(221, 221, 227)" }}
                    ></i>
                    <div className={style.progress}>
                      <div
                        className={style.progress_in}
                        style={{
                          color: "#ba933e",
                          width: (count4star / totalComment) * 100 + "%",
                        }}
                      ></div>
                    </div>
                    <span className={style.total_star}>{count4star}</span>
                  </div>
                  {/* 3 sao */}
                  <div
                    className={`${style.star_count_star} d-flex align-items-center`}
                  >
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
                    <div className={style.progress}>
                      <div
                        className={style.progress_in}
                        style={{
                          color: "#ba933e",
                          width: (count3star / totalComment) * 100 + "%",
                        }}
                      ></div>
                    </div>
                    <span className={style.total_star}>{count3star}</span>
                  </div>
                  {/* 2 sao */}
                  <div
                    className={`${style.star_count_star} d-flex align-items-center`}
                  >
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
                    <div className={style.progress}>
                      <div
                        className={style.progress_in}
                        style={{
                          color: "#ba933e",
                          width: (count2star / totalComment) * 100 + "%",
                        }}
                      ></div>
                    </div>
                    <span className={style.total_star}>{count2star}</span>
                  </div>
                  {/* 1 sao */}
                  <div
                    className={`${style.star_count_star} d-flex align-items-center`}
                  >
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
                    <div className={style.progress}>
                      <div
                        className={style.progress_in}
                        style={{
                          color: "#ba933e",
                          width: (count1star / totalComment) * 100 + "%",
                        }}
                      ></div>
                    </div>
                    <span className={style.total_star}>{count1star}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.header_right}>
              <span>Lọc xem theo: </span>
              <span
                className={`${style.filter_star} ${
                  filter5Star.active ? style.activeFilter : ""
                }`}
                onClick={handleFilter5star}
              >
                {filter5Star.active && (
                  <i
                    class="fas fa-check"
                    style={{ marginRight: " 12px", color: "#ba933e" }}
                  ></i>
                )}
                5
                <i
                  className={`${
                    filter5Star.active ? "fas fa-star" : "far fa-star"
                  }`}
                  style={{ color: "#ba933e" }}
                ></i>
              </span>
              <span
                className={`${style.filter_star} ${
                  filter4Star.active ? style.activeFilter : ""
                }`}
                onClick={handleFilter4star}
              >
                {filter4Star.active && (
                  <i
                    class="fas fa-check"
                    style={{ marginRight: " 12px", color: "#ba933e" }}
                  ></i>
                )}
                4
                <i
                  className={`${
                    filter4Star.active ? "fas fa-star" : "far fa-star"
                  }`}
                  style={{ color: "#ba933e" }}
                ></i>
              </span>
              <span className={style.filter_star}>
                3<i className="far fa-star" style={{ color: "#ba933e" }}></i>
              </span>
            </div>
          </div>
          <div className={style.body_reviewProduct}>
            <div className={style.list_reviewProduct}>
              {listReview?.map((data, idx) => {
                return (
                  <div key={idx}>
                    <ItemReviewProduct data={data} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewProduct;
