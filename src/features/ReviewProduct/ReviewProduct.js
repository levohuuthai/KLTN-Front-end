import React, { useEffect, useState, useContext } from "react";
import style from "./ReviewProduct.module.scss";
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
  const [filter5Star, setFilter5Star] = useState({ value: 5, active: false });
  const [filter4Star, setFilter4Star] = useState({ value: 4, active: false });
  const [filter3Star, setFilter3Star] = useState({ value: 3, active: false });
  const [filter2Star, setFilter2Star] = useState({ value: 2, active: false });
  const [filter1Star, setFilter1Star] = useState({ value: 1, active: false });

  const { dispatch } = useContext(GlobalContext);

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
    fetchRequestGetListReview(); // eslint-disable-next-line react-hooks/exhaustive-deps
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
    fetchRequestGetListReview1Star(); // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalStar]);
  const handleFilter5star = () => {
    setFilter5Star((prev) => ({
      ...prev,
      value: 5,
      active: !filter5Star.active,
    }));
    setFilter4Star({
      value: 4,
      active: false,
    });
    setFilter3Star({
      value: 3,
      active: false,
    });
    setFilter2Star({
      value: 2,
      active: false,
    });
    setFilter1Star({
      value: 1,
      active: false,
    });
    if (filter5Star.active === false) {
      const fetchRequestGetListReviewFilter5Star = async () => {
        try {
          const requestGetListReview5Star =
            await reviewApi.getReviewByProductIdAndStar(
              props.dataProduct._id,
              5
            );
          setListReview(requestGetListReview5Star.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetListReviewFilter5Star();
    } else {
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
    }
  };
  const handleFilter4star = () => {
    setFilter4Star((prev) => ({
      ...prev,
      value: 4,
      active: !filter4Star.active,
    }));
    setFilter5Star({
      value: 5,
      active: false,
    });
    setFilter3Star({
      value: 3,
      active: false,
    });
    setFilter2Star({
      value: 2,
      active: false,
    });
    setFilter1Star({
      value: 1,
      active: false,
    });
    if (filter4Star.active === false) {
      const fetchRequestGetListReviewFilter4Star = async () => {
        try {
          const requestGetListReview4Star =
            await reviewApi.getReviewByProductIdAndStar(
              props.dataProduct._id,
              4
            );
          setListReview(requestGetListReview4Star.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetListReviewFilter4Star();
    } else {
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
    }
  };
  const handleFilter3star = () => {
    setFilter3Star((prev) => ({
      ...prev,
      value: 3,
      active: !filter3Star.active,
    }));
    setFilter5Star({
      value: 5,
      active: false,
    });
    setFilter4Star({
      value: 4,
      active: false,
    });
    setFilter2Star({
      value: 2,
      active: false,
    });
    setFilter1Star({
      value: 1,
      active: false,
    });
    if (filter3Star.active === false) {
      const fetchRequestGetListReviewFilter3Star = async () => {
        try {
          const requestGetListReview3Star =
            await reviewApi.getReviewByProductIdAndStar(
              props.dataProduct._id,
              3
            );
          setListReview(requestGetListReview3Star.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetListReviewFilter3Star();
    } else {
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
    }
  };
  const handleFilter2star = () => {
    setFilter2Star((prev) => ({
      ...prev,
      value: 2,
      active: !filter2Star.active,
    }));
    setFilter5Star({
      value: 5,
      active: false,
    });
    setFilter4Star({
      value: 4,
      active: false,
    });
    setFilter3Star({
      value: 3,
      active: false,
    });
    setFilter1Star({
      value: 1,
      active: false,
    });
    if (filter2Star.active === false) {
      const fetchRequestGetListReviewFilter2Star = async () => {
        try {
          const requestGetListReview2Star =
            await reviewApi.getReviewByProductIdAndStar(
              props.dataProduct._id,
              2
            );
          setListReview(requestGetListReview2Star.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetListReviewFilter2Star();
    } else {
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
    }
  };
  const handleFilter1star = () => {
    setFilter1Star((prev) => ({
      ...prev,
      value: 1,
      active: !filter1Star.active,
    }));
    setFilter5Star({
      value: 5,
      active: false,
    });
    setFilter4Star({
      value: 4,
      active: false,
    });
    setFilter3Star({
      value: 3,
      active: false,
    });
    setFilter2Star({
      value: 2,
      active: false,
    });
    if (filter1Star.active === false) {
      const fetchRequestGetListReviewFilter1Star = async () => {
        try {
          const requestGetListReview1Star =
            await reviewApi.getReviewByProductIdAndStar(
              props.dataProduct._id,
              1
            );
          setListReview(requestGetListReview1Star.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetListReviewFilter1Star();
    } else {
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
    }
  };
  return (
    <>
      <div className={style.detail_product_review}>
        <div className={style.header_reviewProduct}>
          <div className={style.header_left}>
            <h5> Đánh Giá - Nhận Xét Từ Khách Hàng</h5>
            <div className={style.total_count_star_group}>
              <div className={`${style.total_star} d-flex align-items-center`}>
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
            <span
              className={`${style.filter_star} ${
                filter3Star.active ? style.activeFilter : ""
              }`}
              onClick={handleFilter3star}
            >
              {filter3Star.active && (
                <i
                  class="fas fa-check"
                  style={{ marginRight: " 12px", color: "#ba933e" }}
                ></i>
              )}
              3
              <i
                className={`${
                  filter3Star.active ? "fas fa-star" : "far fa-star"
                }`}
                style={{ color: "#ba933e" }}
              ></i>
            </span>
            <span
              className={`${style.filter_star} ${
                filter2Star.active ? style.activeFilter : ""
              }`}
              onClick={handleFilter2star}
            >
              {filter2Star.active && (
                <i
                  class="fas fa-check"
                  style={{ marginRight: " 12px", color: "#ba933e" }}
                ></i>
              )}
              2
              <i
                className={`${
                  filter2Star.active ? "fas fa-star" : "far fa-star"
                }`}
                style={{ color: "#ba933e" }}
              ></i>
            </span>
            <span
              className={`${style.filter_star} ${
                filter1Star.active ? style.activeFilter : ""
              }`}
              onClick={handleFilter1star}
            >
              {filter1Star.active && (
                <i
                  class="fas fa-check"
                  style={{ marginRight: " 12px", color: "#ba933e" }}
                ></i>
              )}
              1
              <i
                className={`${
                  filter1Star.active ? "fas fa-star" : "far fa-star"
                }`}
                style={{ color: "#ba933e" }}
              ></i>
            </span>
          </div>
        </div>
        <div className={style.body_reviewProduct}>
          <div className={style.list_reviewProduct}>
            {listReview.length > 0
              ? listReview?.map((data, idx) => {
                  return (
                    <div key={idx}>
                      <ItemReviewProduct data={data} />
                    </div>
                  );
                })
              : "Không có bài đánh giá nào "}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewProduct;
