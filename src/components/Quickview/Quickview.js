import React, { useContext, useEffect, useState } from "react";
import style from "./Quickview.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import aothuntron from "assets/images/type/aothuntron.jpg";
import { GlobalContext } from "../../store/store";
import { ACTIOS } from "../../store/actions";
import Loading from "components/Loading";
import TotalStar from "components/TotalStar/TotalStar";
import reviewApi from "api/reviewApi";

const Quickview = (props) => {
  const { dispatch, state } = useContext(GlobalContext);
  const { activeQuickView } = state;
  const closeQuickView = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIOS.activeQuickView, payload: false });
  };
  const [count5star, setCount5Star] = useState();
  const [count4star, setCount4Star] = useState();
  const [count3star, setCount3Star] = useState();
  const [count2star, setCount2Star] = useState();
  const [count1star, setCount1Star] = useState();
  const [totalComment, setTotalComment] = useState();
  useEffect(() => {
    const fetchRequestGetListReview5Star = async () => {
      try {
        const requestGetListReview5Star = await reviewApi.getListReview5Star(
          state.dataQuickView._id
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
          state.dataQuickView._id
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
          state.dataQuickView._id
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
          state.dataQuickView._id
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
          state.dataQuickView._id
        );
        setCount1Star(requestGetListReview1Star.data?.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetListReview1Star();
  }, [state.dataQuickView]);
  useEffect(() => {
    setTotalComment(
      count1star + count2star + count3star + count4star + count5star
    );
  }, [count1star, count2star, count3star, count4star, count5star]);
  return (
    <>
      {state.loadingQuickView ? (
        <Loading />
      ) : (
        <>
          <div
            className={`${style.blur_quickview} ${
              activeQuickView ? style.active_blur_quick : ""
            }`}
          ></div>
          <section
            className={`${style.quick_view} ${
              activeQuickView ? style.active_quick_view : ""
            }`}
          >
            <div className={`${style.img_quick_group}`}>
              <div className={`prevElQuickview ${style.prevEl}`}></div>
              <div className={`nextElQuickview ${style.nextEl}`}></div>
              <Swiper
                className="position-relative"
                modules={[Autoplay, Navigation]}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                }}
                loop={false}
                navigation={true}
                autoplay={{
                  delay: 14000,
                  disableOnInteraction: true,
                }}
                breakpoints={{
                  375: {
                    slidesPerView: 1,
                  },

                  1200: {
                    slidesPerView: 1,
                  },
                }}
                navigation={{
                  prevEl: ".prevElQuickview",
                  nextEl: ".nextElQuickview",
                }}
              >
                <SwiperSlide>
                  <div className={`${style.item_img_quick}`}>
                    <img src={state.dataQuickView.image_front} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={`${style.item_img_quick}`}>
                    <img src={state.dataQuickView.image_back} alt="" />
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className={`${style.view_detail_quick}`}>
                <a href="/#">View Details</a>
              </div>
            </div>
            <div className={`${style.content_quick}`}>
              <div className={`${style.cancel_quick}`} onClick={closeQuickView}>
                <i className="bi bi-x-circle"></i>
              </div>
              <h4 className={style.title_quickview}>
                {state.dataQuickView?.title}
              </h4>
              <div className={`${style.rating} d-flex`}>
                <TotalStar productId={state.dataQuickView._id} />
                <span style={{ marginLeft: "15px" }}>
                  ({totalComment} nhận xét)
                </span>
              </div>
              <p className={style.price}>
                <span className={`${style.price_notoff}`}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(state.dataQuickView.priceBase)}
                </span>
                <span className={style.price_off}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(state.dataQuickView.priceMin) +
                    ` - ` +
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(state.dataQuickView.priceMax)}
                </span>
              </p>
              <p className={`${style.brand}`}>
                <span style={{ fontSize: " 14px" }}>Thương hiệu:</span>{" "}
                <b>{state.dataQuickView?.brand}</b> <br />
              </p>{" "}
              <p className={`${style.brand}`}>
                <span style={{ fontSize: " 14px" }}>Chất liệu: </span>
                <b style={{ fontSize: " 15px" }}>
                  {state.dataQuickView?.fabricMaterial}
                </b>{" "}
                <br />
              </p>{" "}
              <p className={`${style.brand}`}>
                <span style={{ fontSize: " 14px" }}> Cổ áo:</span>{" "}
                <b style={{ fontSize: " 15px" }}>
                  {state.dataQuickView?.collar}
                </b>{" "}
                <br />
              </p>{" "}
              <p className={`${style.brand}`}>
                <span style={{ fontSize: " 14px" }}>Xuất xứ: </span>
                <b>{state.dataQuickView?.origin}</b> <br />
              </p>
              <p className={`${style.describe_product}`}>
                {state.dataQuickView?.desc} <br />
              </p>
              <div className={`${style.social_sharing} d-flex`}>
                <h3>Chia sẻ:</h3>
                <ul className="d-flex">
                  <li>
                    <a href="/#" className={style.face}>
                      <i className="fab fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#" className={style.twitter}>
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#" className={style.pin}>
                      <i className="fab fa-pinterest"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#" className={style.em}>
                      <i className="far fa-envelope"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/#" className={style.vi}>
                      <i className="fab fa-viber"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Quickview;
