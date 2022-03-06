/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import style from "./DetailPage.module.scss";
import aothuninhinh from "assets/images/type/aothuninhinh.jpg";

DetailPage.propTypes = {};

function DetailPage(props) {
  const refImgShowCase = useRef(null);
  const refImgParralax = useRef(null);
  const refHeightContent = useRef(null);
  const [showBtnSeeMore, setShowBtnSeeMore] = useState(true);
  const handlerImgSelect = (e) => {
    const imgId = e.currentTarget.attributes["data-id"].value;
    const displayWidth = refImgShowCase.current.childNodes[0].clientWidth;
    refImgShowCase.current.style.transform = `translateX(${
      -(imgId - 1) * displayWidth
    }px)`;
  };

  const MoveImg = (e) => {
    const x = (window.innerWidth - e.pageX * 5) / 20;
    const y = (window.innerWidth - e.pageY * 5) / 20;
    refImgParralax.current.style.transform = `translateX(${x}px) translateX(${y}px) scale(1.5)`;
  };
  const OutImg = (e) => {
    const x = (window.innerWidth - e.pageX * 5) / 1113011;
    const y = (window.innerWidth - e.pageY * 5) / 1111301;
    refImgParralax.current.style.transform = `translateX(${x}px) translateX(${y}px) `;
  };
  useEffect(() => {
    // const handlerBtnSeeMore = () => {
    if (refHeightContent.current.clientHeight > 300) {
      setShowBtnSeeMore(true);
    }
    console.log(refHeightContent.current.clientHeight);
    // };    console.log(refHeightContent.current.clientHeight);
  }, []);
  const handlerBtnSeeMore = () => {
    // if (refHeightContent.current.clientHeight > 400) {
    console.log("haha");
    setShowBtnSeeMore(!showBtnSeeMore);
    // }
  };
  return (
    <div className={`${style.detail} wrap`}>
      <div className={style.frontpage}>
        <div className={`${style.container} d-flex align-items-center`}>
          <span>
            <a href="../html/Project.html">Home &nbsp; /</a> &nbsp; Shop &nbsp;
            /<a href="../html/Project.html"> &nbsp; Fashion &nbsp; /</a> &nbsp;
            Backpage
          </span>
        </div>
      </div>
      <div className={style.detail_product}>
        <div className={style.img_detailproduct_group}>
          <div
            className={`${style.img_select} d-flex flex-column align-items-start justify-content-center`}
          >
            <div
              className={style.img_item}
              data-id="1"
              onClick={handlerImgSelect}
            >
              <img src={aothuninhinh} alt="h" />
            </div>
            <div
              className={style.img_item}
              data-id="2"
              onClick={handlerImgSelect}
            >
              <img src={aothuninhinh} alt="h" />
            </div>
            <div
              className={style.img_item}
              data-id="3"
              onClick={handlerImgSelect}
            >
              <img src={aothuninhinh} alt="s" />
            </div>
            <div
              className={style.img_item}
              data-id="4"
              onClick={handlerImgSelect}
            >
              <img src={aothuninhinh} alt="s" />
            </div>
          </div>
          <div className={style.img_display}>
            <div className={style.img_showcase} ref={refImgShowCase}>
              <img
                src={aothuninhinh}
                alt="s"
                ref={refImgParralax}
                onMouseMove={MoveImg}
                onMouseOut={OutImg}
              />
              <img src={aothuninhinh} alt="s" />{" "}
              <img src={aothuninhinh} alt="s" />
              <img src={aothuninhinh} alt="s" />
            </div>
          </div>
        </div>
        <div className={style.content_detailproduct}>
          <h2>Áo Thun INF Washed Shin</h2>
          <div className={style.rating_purchase}>
            <div className={style.rating}>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star"></span>
              <span className="fa fa-star-half-alt checked"></span>
            </div>
            <p className={style.purchase}> | Đã bán 29</p>
          </div>
          <div className={`${style.price}  d-flex `}>
            <h4>280.000 vnđ</h4>
          </div>{" "}
          <div className={`${style.size}`}>
            <div className={style.title_size}>
              <p>Kích thước: </p>
              <p className={style.value_size}>L</p>
            </div>
            <div className={style.btn_size}>
              <span>S</span> <span>L</span> <span>XL</span> <span>XXL</span>
            </div>
          </div>
          <div className={`${style.color}`}>
            <div className={style.title_color}>
              <p>Màu sắc: </p>
              <p className={style.value_color}> Xanh lá</p>
            </div>
            <div className={style.btn_color}>
              <span>Xanh lá</span> <span>Vàng</span> <span>Đỏ</span>{" "}
              <span>Đen</span>
            </div>
          </div>
          <div className={`${style.btn_group} d-flex`}>
            <div
              className={`${style.control}  d-flex justify-content-between align-items-center`}
            >
              <a href="/" className={style.minus}>
                <i className="fas fa-minus"></i>
              </a>
              <span className="qty">1</span>
              <a href="/" className={style.plus}>
                <i className="fas fa-plus"></i>
              </a>
            </div>
            <a
              href="/"
              className={`${style.btn_addtocart}  d-flex  align-items-center`}
            >
              <i className="bi bi-handbag"></i>Thêm vào giỏ hàng
            </a>
            <a
              href="/"
              className={`${style.wishlist_item}  d-flex  align-items-center`}
            >
              <i className="bi bi-suit-heart"></i>
            </a>
            <a
              href="/"
              className={`${style.compare_product}  d-flex  align-items-center`}
            >
              <i className="bi bi-sliders"></i>
            </a>
          </div>
          <div className={`${style.social_sharing}  d-flex `}>
            <h3>Chia sẻ:</h3>
            <ul className="d-flex">
              <li>
                <a href="/" className={style.face}>
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="/" className={style.twitter}>
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="/" className={style.pin}>
                  <i className="fab fa-pinterest"></i>
                </a>
              </li>
              <li>
                <a href="/" className={style.em}>
                  <i className="far fa-envelope"></i>
                </a>
              </li>
              <li>
                <a href="/" className={style.vi}>
                  <i className="fab fa-viber"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={style.detail_product2}>
        <div className={style.title_detail_product2}>
          <span>Chất liệu</span>
          <span>Xuất xứ</span>
          <span>Thương hiệu</span>
        </div>
        <div className={style.value_detail_product2}>
          <span>Cotton</span>
          <span>Việt Nam</span>
          <span>OEM</span>
        </div>
      </div>
      <div className={style.detail_product3}>
        <div className={style.title_detail_product3}>
          <h5>Mô tả sản phẩm</h5>
        </div>
        <div className={style.value_detail_product3} ref={refHeightContent}>
          <p
            // className={
            //   showBtnSeeMore ? style.notactive_content : style.active_content
            // }
            className={
              !showBtnSeeMore ? style.active_seemore : style.notactive_seemore
            }
            // style={{ height: "400px" }}
          >
            củahân vào thương trường, và cuối cùng là chặng đường xây dựng đế
            chế Hyundai đồ sộ, trở thành bộ mặt của đất nước Hàn Quốc. ● Chương
            1: Cha mẹ và Quê hương ● Chương 2: Khởi đầu củahân vào thương
            trường, và cuối cùng là chặng đường xây dựng đế chế Hyundai đồ sộ,
            trở thành bộ mặt của đất nước Hàn Quốc. ● chế Hyundai đồ sộ, trở
            thành bộ mặt của đất nước Hàn Quốc. ● Chương 1: Cha mẹ và Quê hương
            ● Chương 2: Khởi đầu của củahân vào thương trường, và cuối cùng là
            chặng đường xây dựng đế chế Hyundai đồ sộ, trở thành bộ mặt của đất
            nước Hàn Quốc. ● Chương 1: Cha mẹ và Quê hương ● Chương 2: Khởi đầu
            củahân vào thương trường, và cuối cùng là chặng đường xây dựng đế
            chế Hyundai đồ sộ, trở thành bộ mặt của đất nước Hàn Quốc. ● Chương
            1: Cha mẹ và Quê hương ● Chương 2: Khởi đầu củahi bắt đầu dấn thân
            vào thương trường, và cuối cùng là chặng đường xây dựng đế chế
            Hyundai đồ sộ, trở thành bộ mặt của đất nước Hàn Quốc. ● Chương 1:
            Cha mẹ và Quê hương ● Chương 2: Khởi đầu củahân vào thương trường,
            và cuối cùng là chặng đường xây dựng đế chế Hyundai đồ sộ, trở thành
            bộ mặt của đất nước Hàn Quốc. ● Chương 1: Cha mẹ và Quê hương ●
            Chương 2: Khởi đầu củahân vào thương trường, và cuối cùng là chặng
            đường xây dựng đế chế Hyundai đồ sộ, trở thành bộ mặt của đất nước
            Hàn Quốc. ● “KHÔNG BAO GIỜ LÀ THẤT BẠI! TẤT CẢ LÀ THỬ THÁCH” Tự
            truyện nổi tiếng của gã khổng lồ trong nền kinh tế Hàn Quốc - cố Chủ
            tịch tập đoàn Hyundai Chung Ju-yung Thất bại xảy ra là để con người
            nhận ra sức chút thành tựu, ông lại gặp biến cố và trở về vạch xuất
            phát. Thế nhưng, điều quan trọng là con người ấy không bao giờ nghĩ
            mình thất bại. Trong mọi hoàn cảnh, kể cả khi đã trở nên giàu có,
            ông vẫn luôn xem mình là một người lao động làm giàu bằng chính năng
            lực của mình, luôn cần kiệm, chân thành và thẳng thắn. Và trên hết,
            ông luôn có tầm nhìn của một người yêu nước, luôn nghĩ đến lợi ích
            chung. Chính vì điều đó, ông đã vượt qua rất nhiều chướng ngại tưởng
            chừng như không thể vượt qua trong cuộc đời làm doanh nhân của mình.
            Với 9 chương sách, bạn đọc sẽ lần lượt đi qua từng chặng đường mà cố
            Chủ tịch Chung Ju-yung từng trải qua: từ thời thơ ấu thiếu thốn và
            hành trình thực hiện ước mơ - lên Seoul học để đổi đời, cho đến
            những va vấp khi bắt đầu dấn thân vào thương trường, và cuối cùng là
            chặng đường xây dựng đế chế Hyundai đồ sộ, trở thành bộ mặt của đất
            nước Hàn Quốc. ● Chương 1: Cha mẹ và Quê hương ● Chương 2: Khởi đầu
            của trình thực hiện ước mơ - lên Seoul học để đổi đời, cho đến những
            va vấp khi bắt đầu dấn thân vào thương trường, và cuối cùng là chặng
            đường xây dựng đế chế Hyundai đồ sộ, trở thành bộ mặt của đất nước
            Hàn Quốc. ● Chương 1: Cha mẹ và Quê hương ● Chương 2: Khởi đầu
            củahân vào thương trường, và cuối cùng là chặng đường xây dựng đế
            chế Hyundai đồ sộ, trở thành bộ mặt của đất nước Hàn Quốc. ● Chương
            1: Cha mẹ và Quê hương ● Chương 2: Khởi đầu củahân vào thương
            trường, và cuối cùng là chặng đường xây dựng đế chế Hyundai đồ sộ,
          </p>{" "}
          <div className={showBtnSeeMore ? style.btn_backdropseemore : ""}>
            {" "}
          </div>
          <div
            className={`${style.btnSeemore} ${
              showBtnSeeMore ? "" : style.NOTactive_seemore
            }`}
            onClick={handlerBtnSeeMore}
          >
            <span>
              {showBtnSeeMore ? "Xem thêm nội dung" : "Thu gọn nội dung"}{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
