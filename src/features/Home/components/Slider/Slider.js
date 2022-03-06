import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import style from "./Slider.module.scss";
import img_slider1 from "assets/images/slider/img_slider1.jpg";
import img_slider2 from "assets/images/slider/img_slider2.jpg";

Slider.propTypes = {};

function Slider(props) {
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
        autoplay={{
          delay: 4000,
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
      >
        <SwiperSlide>
          <div className={style.item}>
            {/* <img src={slider_main1} alt="slider 1" /> */}
            <div className={`${style.background_slider} position-relative`}>
              <div className={`${style.img_slider1} position-absolute`}>
                <img src={img_slider2} alt="slider 1" />
              </div>
            </div>
            <div></div>
            <div className={style.content_slider}>
              <p className={style.item1_p}>
                Giao hàng nhanh chóng, <span>chỉ từ 100.000 vnđ</span>
              </p>
              <h2 className={style.item1_h2}>
                Áo thun thoải mái làm từ vải cotton
              </h2>
              <h3 className={style.item1_h3}>100% cao cấp</h3>
              <a href="\" className={style.start_shop}>
                Start Shopping
              </a>
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
              <h2>Bộ sưu tập của Rubix</h2>
              <h3>Giảm giá lên đến 70%</h3>
              <a href="\" className={style.start_shop}>
                Start Shopping
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
