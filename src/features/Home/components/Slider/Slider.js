import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import style from "./Slider.module.scss";
import img_slider1 from "assets/images/slider/img_slider1.jpg";
import img_slider2 from "assets/images/slider/img_slider2.jpg";
import couponApi from "api/couponApi";
import { useSelector } from "react-redux";

Slider.propTypes = {};

function Slider(props) {
  const [arrCoupon, setArrCoupon] = useState();
  const [endDayCoupon, setEndDayCoupon] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
  });

  useEffect(() => {
    const fetchRequestGetAllCoupon = async () => {
      try {
        const requestGetAllCoupon = await couponApi.getAllCoupon();
        setArrCoupon(requestGetAllCoupon.data);
        // setDataTypeProduct(requestGetAllCoupon.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllCoupon();
  }, []);
  useEffect(() => {
    var date = new Date(arrCoupon?.[0]?.endDate);
    setEndDayCoupon({
      minute: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }, [arrCoupon]);
  const loggedInUser = useSelector((state) => state.user.current);

  const addSaveCoupon = () => {
    const fetchRequestAddCoupon = async () => {
      try {
        const requestAddCoupon = await couponApi.addCoupon({
          // name: arrCoupon?.[0]?.name,
          // endDate: arrCoupon?.[0]?.endDate,
          // discount: arrCoupon?.[0]?.discount,
          // type: arrCoupon?.[0]?.type,
          // count: arrCoupon?.[0]?.count,
          couponId: arrCoupon?.[0]?._id,
          userId: loggedInUser._id,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestAddCoupon();
  };
  return (
    <div className="slider wrap">
      <Swiper
        className="position-relative"
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        // autoplay={{
        //   delay: 4000,
        //   disableOnInteraction: true,
        // }}
        breakpoints={{
          375: {
            slidesPerView: 1,
          },

          1200: {
            slidesPerView: 1,
          },
        }}
      >
        <SwiperSlide>
          <div className={style.item}>
            {/* <img src={slider_main1} alt="slider 1" /> */}
            <div className={`${style.background_slider} position-relative`}>
              <div className={`${style.img_slider1} position-absolute`}>
                <img src={img_slider2} alt="slider 1" />
              </div>
            </div>
            <div className={style.content_slider}>
              <p className={style.item1_p}>Săn mã giảm giá đến 50%</p>
              <h3>MÃ FREESHIP ĐẶC BIỆT</h3>
              <h4>LƯU MÃ ĐỂ SỬ DỤNG</h4>
              {arrCoupon?.slice(0, 1)?.map((data) => {
                console.log(data);
                return (
                  <div className={style.item_coupon}>
                    <div className={style.left}>
                      <div
                        className={`${style.lottery_box} ${
                          data?.type === "Ship" ? style.activeShip : ""
                        }`}
                      >
                        <div className={`${style.price} d-flex flex-column `}>
                          <span
                            className={`${style.priceDiscount} ${
                              data?.type === "Ship" ? style.activeColorShip : ""
                            }`}
                          >
                            {data?.type === "Product"
                              ? "GIẢM NGAY "
                              : "FREESHIP TỪ"}
                            <b style={{ marginLeft: "10px", fontSize: "22px" }}>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(data?.discount)}
                            </b>
                          </span>
                          <span className={style.conditionPriceDiscount}>
                            Cho đơn hàng từ{" "}
                            <b style={{ fontSize: "18px" }}>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(data?.priceToDiscount)}
                            </b>
                          </span>
                          <div className="d-flex justify-content-end">
                            <span
                              className={style.btnSaveCodeCoupon}
                              onClick={addSaveCoupon}
                            >
                              Lưu mã
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${style.right}  d-flex flex-column`}>
                      <div className={style.date}>
                        Hiệu lực đến
                        <br />
                        <b style={{ fontSize: "17px" }}>
                          {endDayCoupon.hour}:{endDayCoupon.minute}
                        </b>{" "}
                        ngày
                        <b style={{ fontSize: "17px" }}>
                          {endDayCoupon.day}/{endDayCoupon.month}
                        </b>
                      </div>
                      <div className={style.date}>Số lượng có hạn</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.item}>
            <div className={`${style.background_slider} position-relative`}>
              <div className={`${style.img_slider1} position-absolute`}>
                <img src={img_slider1} alt="slider 1" />
              </div>
            </div>
            <div className={style.content_slider}>
              <p>
                Giao hàng nhanh chóng, <span>chỉ từ 100.000 vnđ</span>
              </p>
              <h3>VOUCHER TOÀN SÀN</h3>
              <h4>LƯU MÃ ĐỂ SỬ DỤNG</h4>
              {arrCoupon?.slice(0, 1)?.map((data) => {
                return (
                  <div className={style.item_coupon}>
                    <div className={style.left}>
                      <div
                        className={`${style.lottery_box} ${
                          data?.type === "Ship" ? style.activeShip : ""
                        }`}
                      >
                        <div className={`${style.price} d-flex flex-column `}>
                          <span
                            className={`${style.priceDiscount} ${
                              data?.type === "Ship" ? style.activeColorShip : ""
                            }`}
                          >
                            {data?.type === "Product"
                              ? "GIẢM NGAY "
                              : "FREESHIP TỪ"}
                            <b style={{ marginLeft: "10px", fontSize: "22px" }}>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(data?.discount)}
                            </b>
                          </span>
                          <span className={style.conditionPriceDiscount}>
                            Cho đơn hàng từ{" "}
                            <b style={{ fontSize: "18px" }}>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(data?.priceToDiscount)}
                            </b>
                          </span>
                          <div className="d-flex justify-content-end">
                            <span
                              className={style.btnSaveCodeCoupon}
                              onClick={addSaveCoupon}
                            >
                              Lưu mã
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={`${style.right}  d-flex flex-column`}>
                      <div className={style.date}>
                        Hiệu lực đến
                        <br />
                        <b style={{ fontSize: "17px" }}>
                          {endDayCoupon.hour}:{endDayCoupon.minute}
                        </b>{" "}
                        ngày
                        <b style={{ fontSize: "17px" }}>
                          {endDayCoupon.day}/{endDayCoupon.month}
                        </b>
                      </div>
                      <div className={style.date}>Số lượng có hạn</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
