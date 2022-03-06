import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import style from "./Product_promotion.module.scss";
import aothuntron from "assets/images/type/aothuntron.jpg";
import aothuninhinh from "assets/images/type/aothuninhinh.jpg";
ProductPromotion.propTypes = {};

function ProductPromotion(props) {
  const dataProduct = [
    {
      productID: 1,
      name: "Áo thun trơn1",
    },
    {
      productID: 2,
      name: "Áo thun in hình2",
    },

    {
      productID: 3,
      name: "Áo thun trơn3",
    },
    {
      productID: 4,
      name: "Áo thun in hình4",
    },

    {
      productID: 5,
      name: "Áo thun trơn5",
    },
    {
      productID: 6,
      name: "Áo thun in hình6",
    },
    {
      productID: 7,
      name: "Áo thun in hình7",
    },
  ];
  return (
    <div className={`${style.trend_product} wrap section`}>
      <div className={`${style.title_trend}`}>
        <h2>Khuyến mãi hấp dẫn</h2>
        <p>
          Những sản phẩm áo thun mới nhất, tuyệt vời nhất đã được RUBIX cập nhật
        </p>
      </div>
      <div className={`${style.list_trend_product} `}>
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
            delay: 41000,
            disableOnInteraction: true,
          }}
          breakpoints={{
            375: {
              slidesPerView: 1,
            },

            1200: {
              slidesPerView: 4,
            },
          }}
        >
          {dataProduct?.map((data, i) => {
            return (
              <SwiperSlide key={i}>
                <div>
                  <div className="d-flex justify-content-center">
                    <div className={`${style.item_trend_product} `}>
                      <div className={`${style.img_trend_product}`}>
                        <a href="/">
                          <img src={aothuntron} alt="" />
                          <img
                            src={aothuninhinh}
                            className={style.img_hover}
                            alt=""
                          />
                        </a>
                        <a
                          href="/"
                          className={`${style.btn_addtocart} d-flex align-items-center justify-content-center`}
                        >
                          <i className="bi bi-handbag"></i>Thêm vào giỏ hàng
                        </a>
                        <div className={`${style.item_buttons} f-column `}>
                          <a href="/" className={`${style.wishlist} `}>
                            <i className="bi bi-suit-heart"></i>
                          </a>

                          <p className={`${style.detail_wishlist} `}>
                            Thêm vào yêu thích
                          </p>

                          <a href="/" className={`${style.compare} `}>
                            <i className="bi bi-sliders"></i>
                          </a>
                          <p className={`${style.detail_compare} `}>So sánh</p>
                          <a href="/" className={`${style.quickview} `}>
                            <i className="bi bi-eye"></i>
                          </a>
                          <p className={`${style.detail_quickview} `}>
                            Xem nhanh
                          </p>
                        </div>

                        <div className={`${style.item_buttons_res} `}>
                          <a
                            href="/"
                            className={`${style.btn_wishlist_respon} `}
                          >
                            <i className="bi bi-suit-heart"></i>
                          </a>
                          <a
                            href="/"
                            className={`${style.btn_addtocart_respon} `}
                          >
                            <i className="bi bi-handbag"></i>
                          </a>
                        </div>
                      </div>
                      <h2 className={`${style.title_trend_product} `}>
                        <a href="/">{data.name}</a>
                      </h2>
                      <p className={`${style.price_trend_product} `}>$80.00</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* </div> */}
    </div>
  );
}

export default ProductPromotion;
