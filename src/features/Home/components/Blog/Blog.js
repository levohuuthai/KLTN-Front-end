import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import style from "./Blog.module.scss";
import itemblog2 from "assets/images/blog/item-blog2.jpg";
import img_blog1 from "assets/images/blog/img_blog1.jpg";
import img_blog2 from "assets/images/blog/img_blog2.jpg";
import img_blog3 from "assets/images/blog/img_blog3.jpg";
import img_blog4 from "assets/images/blog/img_blog4.jpg";

Blog.propTypes = {};

function Blog(props) {
  return (
    <div className={`${style.blog} blog wrap`}>
      <div className={style.title_blog}>
        <h2>Tin tức thời trang</h2>
        <p>
          Cập nhật xu hướng thời trang nóng hổi nhất, "hot hit" nhất về thời
          trang mà bạn cần biết.
        </p>
      </div>
      <div className={`${style.list_blog} `}>
        <Swiper
          className="position-relative"
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={50}
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
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide>
            <div className={style.item_blog}>
              <div className={style.img_blog}>
                <a href="\">
                  <img src={img_blog1} alt="" />
                </a>
                <div
                  className={`${style.fashion_blog}  d-flex align-items-center justify-content-center`}
                >
                  <a href="\">FASHION</a>
                </div>
              </div>
              <div className={style.content_blog}>
                <div className={style.date_blog}>
                  <a href="\" className={style.admin}>
                    Admin
                  </a>{" "}
                  <a href="\">June 10,2021</a>
                </div>
                <h2>
                  <a href="\"> Áo thun được bảo quản như thế nào</a>
                </h2>
                <p>
                  Khi giặt áo thun, bạn cần lưu ý: Không nên giặt chung tất cả
                  các loại áo quần khác chung với áo thun ở lần giặt đầu tiên vì
                  sẽ dễ làm loang màu từ áo mới sang các áo ...
                </p>
                <a href="\" className={style.readmore}>
                  Read More <i className="bi bi-chevron-right"></i>
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.item_blog}>
              <div className={style.img_blog}>
                <a href="\">
                  <img src={img_blog2} alt="" />
                </a>
                <div
                  className={`${style.fashion_blog}  d-flex align-items-center justify-content-center`}
                >
                  <a href="\">FASHION</a>
                </div>
              </div>
              <div className={style.content_blog}>
                <div className={style.date_blog}>
                  <a href="\" className={style.admin}>
                    Admin
                  </a>{" "}
                  <a href="\">June 10,2021</a>
                </div>
                <h2>
                  <a href="\"> Mẹo để chọn được áo thun đẹp</a>
                </h2>
                <p>
                  Nhiều người nghĩ rằng áo mắc tiền mới đẹp, đúng nhưng chưa hẳn
                  là vậy. Với mong muốn sản xuất ra dòng áo thun vừa đẹp vừa phù
                  hợp túi tiền của học sinh, sinh viên ...
                </p>
                <a href="\" className={style.readmore}>
                  Read More <i className="bi bi-chevron-right"></i>
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.item_blog}>
              <div className={style.img_blog}>
                <a href="\">
                  <img src={img_blog3} alt="" />
                </a>
                <div
                  className={`${style.fashion_blog}  d-flex align-items-center justify-content-center`}
                >
                  <a href="\">FASHION</a>
                </div>
              </div>
              <div className={style.content_blog}>
                <div className={style.date_blog}>
                  <a href="\" className={style.admin}>
                    Admin
                  </a>{" "}
                  <a href="\">June 10,2021</a>
                </div>
                <h2>
                  <a href="\">
                    {" "}
                    Áo thun local brand giá rẻ RUBIX có bao nhiêu màu?
                  </a>
                </h2>
                <p>
                  RUBIX được giới trẻ biết đến với top áo thun local brand dưới
                  200K chất lượng vượt giá thành. Local brand DKMV không ngừng
                  phát triển sản phẩm trọn bộ sắc màu:
                </p>
                <a href="\" className={style.readmore}>
                  Read More <i className="bi bi-chevron-right"></i>
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.item_blog}>
              <div className={style.img_blog}>
                <a href="\">
                  <img src={img_blog4} alt="" />
                </a>
                <div
                  className={`${style.fashion_blog}  d-flex align-items-center justify-content-center`}
                >
                  <a href="\">FASHION</a>
                </div>
              </div>
              <div className={style.content_blog}>
                <div className={style.date_blog}>
                  <a href="\" className={style.admin}>
                    Admin
                  </a>{" "}
                  <a href="\">June 10,2021</a>
                </div>
                <h2>
                  <a href="\">
                    {" "}
                    Lý do khiến Local Brand áo thun không thể thiếu
                  </a>
                </h2>
                <p>
                  Những chiếc áo thun Local brand luôn là lựa chọn an toàn để
                  phát triển tổng thể bộ outfit. Cho dù là chiếc áo màu trơn hay
                  hoạ tiết,
                </p>
                <a href="\" className={style.readmore}>
                  Read More <i className="bi bi-chevron-right"></i>
                </a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Blog;
