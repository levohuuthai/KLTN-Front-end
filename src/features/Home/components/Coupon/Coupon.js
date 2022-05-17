import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import style from "./Coupon.module.scss";
import couponApi from "api/couponApi";
import ItemCoupon from "./ItemCoupon/ItemCoupon";

function Coupon(props) {
  const [arrCoupon, setArrCoupon] = useState([]);

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

  return (
    <div className={`${style.coupon} wrap section`}>
      <div className={`${style.title_coupon}`}>
        <h2>Mã khuyến mãi hấp dẫn</h2>
      </div>
      <div className={`prevElProductCoupon ${style.prevElCoupon}`}></div>{" "}
      <div className={`nextElProductCoupon ${style.nextElCoupon}`}></div>
      <Swiper
        className="position-relative"
        style={{ margin: "0px 70px", padding: "10px 0px" }}
        modules={[Autoplay, Navigation]}
        slidesPerView={3}
        spaceBetween={70}
        pagination={{
          clickable: true,
        }}
        loop={false}
        autoplay={{
          delay: 14000,
          disableOnInteraction: true,
        }}
        navigation={{
          prevEl: ".prevElProductCoupon",
          nextEl: ".nextElProductCoupon",
        }}
      >
        {arrCoupon?.map((data, idx) => {
          return (
            <SwiperSlide key={idx}>
              <ItemCoupon data={data} />
              {/* <div className={style.item_coupon}>
                <div className={style.left}>
                  <div className={`${style.price} d-flex flex-column`}>
                    <span style={{ marginBottom: "20px" }}>
                      {data?.name}{" "}
                      <b style={{ fontSize: "20px" }}>
                        {data?.priceToDiscount}
                      </b>
                    </span>
                    <div className="d-flex">
                      <span
                        style={{
                          fontWeight: "500",
                          fontSize: "18px",
                          color: "#fff",
                        }}
                      >
                        10 lượt/khách
                      </span>
                      <span className={style.btnSaveCodeCoupon}>Lưu mã</span>
                    </div>
                  </div>
                </div>
                <div className={`${style.right}  d-flex flex-column`}>
                  <div className={style.date}>
                    Hiệu lực đến
                    <br />
                    <b style={{ fontSize: "17px" }}>23:59</b> ngày
                    <b style={{ fontSize: "17px" }}> 11/05</b>
                  </div>
                  <div className={style.date}>Số lượng có hạn</div>
                </div>
              </div> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Coupon;
