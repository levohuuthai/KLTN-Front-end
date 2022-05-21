/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./DetailPage.module.scss";
import { useLocation } from "react-router-dom";
import productApi from "api/productApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import ItemColor from "./ItemColor/ItemColor";
import ItemSize from "./ItemSize/ItemSize";
import cartApi from "api/cartApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewProduct from "features/ReviewProduct/ReviewProduct";
import TotalStar from "components/TotalStar/TotalStar";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube } from "swiper";

import { Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import reviewApi from "api/reviewApi";
toast.configure();

DetailPage.propTypes = {};

function DetailPage(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const { dispatch } = useContext(GlobalContext);
  let navigate = useNavigate();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const refImgShowCase = useRef(null);
  const refHeightContent = useRef(null);
  const [showBtnSeeMore, setShowBtnSeeMore] = useState(true);
  const [arrayProductDetail, setArrayProductDetail] = useState([]);
  const [price, setPrice] = useState(undefined);
  const [priceMax, setPriceMax] = useState(undefined);

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [arrayColor, setArrayColor] = useState([]);

  useEffect(() => {
    // const handlerBtnSeeMore = () => {
    if (refHeightContent.current.clientHeight > 300) {
      setShowBtnSeeMore(true);
    }
  }, []);
  const handlerBtnSeeMore = () => {
    // if (refHeightContent.current.clientHeight > 400) {
    setShowBtnSeeMore(!showBtnSeeMore);
    // }
  };
  const location = useLocation();
  const dataProduct = location.state?.dataProduct;
  console.log(dataProduct);
  useEffect(() => {
    setPrice(dataProduct.priceMin);
    setPriceMax(dataProduct.priceMax); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchRequestGetProductDetail = async () => {
      try {
        dataProduct.productDetail.map(async (data) => {
          const requestGetProductDetail = await productApi.getIdProductDetail(
            dataProduct._id
          );
          setArrayProductDetail(requestGetProductDetail?.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetProductDetail(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showMyCart = (e) => {
    if (size !== "" && color !== "") {
      e.preventDefault();
      if (loggedInUser !== null) {
        const fetchIdProductDetailToCart = async () => {
          try {
            const requestIdProductDetailToCart =
              await productApi.getIdProductDetailToCart(
                dataProduct._id,
                size,
                color
              );
            if (requestIdProductDetailToCart.status === 200) {
              const fetchAddToCart = async () => {
                try {
                  const requestAddToCart = await cartApi.addToCart(
                    loggedInUser._id,
                    quantity,
                    {
                      title: dataProduct.title,
                      size: size,
                      color: color,
                      image: requestIdProductDetailToCart.data.image,
                      discount:
                        requestIdProductDetailToCart.data.price.discount,
                      priceAfter: requestIdProductDetailToCart.data.priceAfter,
                      priceBefore:
                        requestIdProductDetailToCart.data.price.original,
                      productDetailId: requestIdProductDetailToCart.data._id,
                    }
                  );
                  await dispatch({
                    type: ACTIOS.loadingCart,
                    payload: true,
                  });
                  if (requestAddToCart.status === 200) {
                    const fetchGetProductCartByUserId = async () => {
                      try {
                        const requestGetProductCartByUserId =
                          await cartApi.getProductCartByUserId(
                            loggedInUser._id
                          );
                        dispatch({
                          type: ACTIOS.dataCart,
                          payload: requestGetProductCartByUserId.data,
                        });
                        await dispatch({
                          type: ACTIOS.loadingCart,
                          payload: false,
                        });
                        await dispatch({
                          type: ACTIOS.ActiveShowCart,
                          payload: true,
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    };
                    fetchGetProductCartByUserId();
                  }
                  // console.log(requestAddToCart);
                } catch (error) {
                  console.log(error);
                }
              };
              fetchAddToCart();
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchIdProductDetailToCart();
      } else {
        navigate("/auth/login");
      }
    } else {
      e.preventDefault();
      toast.error("Cần chọn size và màu", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleColorPriceBySize = (data) => {
    setArrayColor(data.colors);
    setArrImageUnique(data.colors);
    setPrice(data.priceMin);
    setPriceMax(data.priceMax);
  };
  const handleDataSize = (data) => {
    setSize(data);
    setColor(""); //Khi click size thì chọn lại màu
  };
  const handleDataColor = (data) => {
    setColor(data);
  };

  const handlePlus = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };
  const handleMinus = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    const fetchGetPriceByColorSize = async () => {
      try {
        const requestGetPriceByColorSize = await productApi.getPriceByColorSize(
          dataProduct._id,
          size,
          color
        );
        setPrice(requestGetPriceByColorSize.data.priceAfter);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetPriceByColorSize(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, color]);
  const [arrImageUnique, setArrImageUnique] = useState();

  //Khong trung
  // useEffect(() => {
  //   let arrImage = [];
  //   arrImage = arrayProductDetail?.map((data, idx) => {
  //     return data.image;
  //   });
  //   let arrImageUnique = [];
  //   arrImageUnique = arrImage.filter(function (item) {
  //     return arrImageUnique.includes(item) ? "" : arrImageUnique.push(item);
  //   });
  //   setArrImageUnique(arrImageUnique);
  // }, [arrayProductDetail]);

  const [slideView, setSliderView] = useState(arrayProductDetail.length);

  const [listReview, setListReview] = useState([]);
  useEffect(() => {
    const fetchRequestGetListReview = async () => {
      try {
        const requestGetListReview = await reviewApi.getListReview(
          dataProduct._id
        );
        console.log(requestGetListReview);
        setListReview(requestGetListReview?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetListReview(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Get màu và ảnh
  useEffect(() => {
    const fetchArrayColor = async () => {
      try {
        const requestArrayColor = await productApi.getColorByProductId(
          dataProduct._id
        );
        console.log(requestArrayColor);
        setArrayColor(requestArrayColor.data.colors);
        setArrImageUnique(requestArrayColor.data.colors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArrayColor(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(arrayColor);
  const [activeThumb, setActiveThumb] = useState("");
  const [activeThumbColor, setActiveThumbColor] = useState("");
  const [activeColor, setActiveColor] = useState(false);
  const [activeImageVertical, setActiveImageVertical] = useState(true);

  const handleClickImageVertical = () => {
    setActiveImageVertical(true);
    setActiveColor(false);
  };
  const handleReceiveTrue = (data) => {
    setActiveColor(data);
    setActiveImageVertical(false);
  };
  // console.log(activeColor + "activeColor");
  // console.log(activeImageVertical + "activeImageVertical");
  // console.log(setActiveThumb + "activeThumb");
  // console.log(setActiveThumbColor + "activeThumbColor");
  // console.log(listReview.length);
  console.log(dataProduct);
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
          <div className={`${style.img_select} `}>
            <Swiper
              onSwiper={setActiveThumb}
              className="position-relative"
              modules={[Thumbs]}
              pagination={{
                clickable: true,
              }}
              direction="vertical"
              spaceBetween={0}
              slidesPerView={arrImageUnique?.length}
              loop={false}
            >
              {arrImageUnique?.map((data, idx) => {
                // setSliderView(idx + 1);
                return (
                  <SwiperSlide onClick={handleClickImageVertical}>
                    <div className={`${style.item_img_select}`}>
                      <img src={data?.image} alt="sss" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {/* <div
              className={style.img_item}
              data-id="1"
              onClick={handlerImgSelect}
            >
              <img src={dataProduct.image_front} alt="h" />
            </div>
            <div
              className={style.img_item}
              data-id="2"
              onClick={handlerImgSelect}
            >
              <img src={dataProduct.image_back} alt="h" />
            </div>
            {arrImageUnique?.map((data, idx) => {
              return (
                <div
                  className={style.img_item}
                  data-id={idx + 3}
                  onClick={handlerImgSelect}
                >
                  <img src={data.image} alt="s" />
                </div>
              );
            })} */}
          </div>
          <div
            className={style.img_display}
            style={{
              display: activeColor ? "block" : "none",
            }}
          >
            <div className={`prevElDetailDisplay ${style.prevEl}`}></div>
            <div className={`nextElDetailDisplay ${style.nextEl}`}></div>

            <Swiper
              effect={"cube"}
              grabCursor={true}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              className="position-relative"
              modules={[EffectCube, Navigation, Thumbs]}
              thumbs={{ swiper: activeThumbColor }}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              loop={false}
              navigation={{
                prevEl: ".prevElDetailDisplay",
                nextEl: ".nextElDetailDisplay",
              }}
            >
              {arrImageUnique?.map((data, idx) => {
                return (
                  <SwiperSlide>
                    <div className={`${style.img_showcase}`}>
                      <img
                        src={data.image}
                        alt="ao main"
                        // ref={refImgParralax}
                        // onMouseMove={MoveImg}
                        // onMouseOut={OutImg}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          {/* Nếu là click ảnh dọc */}
          <div
            className={style.img_display}
            style={{
              display: activeImageVertical ? "block" : "none",
            }}
          >
            <div className={`prevElDetailDisplay ${style.prevEl}`}></div>
            <div className={`nextElDetailDisplay ${style.nextEl}`}></div>
            <Swiper
              effect={"cube"}
              grabCursor={true}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              className="position-relative"
              modules={[EffectCube, Navigation, Thumbs]}
              thumbs={{ swiper: activeThumb }}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              loop={false}
              navigation={{
                prevEl: ".prevElDetailDisplay",
                nextEl: ".nextElDetailDisplay",
              }}
            >
              {arrImageUnique?.map((data, idx) => {
                return (
                  <SwiperSlide>
                    <div
                      className={`${style.img_showcase} SSS`}
                      ref={refImgShowCase}
                    >
                      <img
                        src={data.image}
                        alt="ao main"
                        // ref={refImgParralax}
                        // onMouseMove={MoveImg}
                        // onMouseOut={OutImg}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
        <div className={style.content_detailproduct}>
          <h2>{dataProduct.title}</h2>
          <div className={style.rating_purchase}>
            <TotalStar productId={dataProduct._id} />
            <p className={style.purchase}>
              {listReview.length === 0 && "Chưa có đánh giá"} | Đã bán{" "}
              {dataProduct.soldQuantity}
            </p>
          </div>
          <div className={`${style.price}  d-flex `}>
            <h4>
              <span className={`${style.price_notoff}`}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dataProduct?.priceBase)}
              </span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(price)}
              {size === "" || (color === "" && priceMax !== undefined)
                ? `${" -"} ${new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(priceMax)}`
                : ""}
            </h4>
          </div>
          <div className={`${style.size}`}>
            <div className={style.title_size}>
              <p>Kích thước: </p>
              <p className={style.value_size}>{size}</p>
            </div>
            <div className={style.btn_size}>
              <ItemSize
                dataProduct={dataProduct}
                receiveDataColorPrice={handleColorPriceBySize}
                receiveDataSize={handleDataSize}
              />
            </div>
          </div>
          <div className={`${style.color}`}>
            <div className={style.title_color}>
              <p>Màu sắc: </p>
              <p className={style.value_color}>{color}</p>
            </div>
            <div className={style.btn_color}>
              <ItemColor
                dataProduct={dataProduct}
                receiveDataColor={handleDataColor}
                arrayColor={arrayColor}
                slideView={slideView}
                setActiveThumbColor={setActiveThumbColor}
                onfromTrueData={handleReceiveTrue}
              />
            </div>
          </div>
          <div className={`${style.btn_group} d-flex`}>
            <div
              className={`${style.control}  d-flex justify-content-between align-items-center`}
            >
              <a href="/" className={style.minus} onClick={handleMinus}>
                <i className="fas fa-minus"></i>
              </a>
              <span className="qty">{quantity}</span>
              <a href="/" className={style.plus} onClick={handlePlus}>
                <i className="fas fa-plus"></i>
              </a>
            </div>
            <a
              href="/"
              className={`${style.btn_addtocart} ${
                size !== "" && color !== "" ? style.active : ""
              }  d-flex  align-items-center`}
              onClick={showMyCart}
              title={`${
                size === "" || color === "" ? "Cần chọn màu và size" : ""
              }`}
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
          <span>{dataProduct.fabricMaterial}</span>
          <span>{dataProduct.origin}</span>
          <span>{dataProduct.brand}</span>
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
            {dataProduct.desc}
          </p>
          <div
            className={showBtnSeeMore ? style.btn_backdropseemore : ""}
          ></div>
          {dataProduct.desc.length >= 450 && (
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
          )}
        </div>
      </div>
      {/* <div className={style.detail_product_review}> */}
      <ReviewProduct dataProduct={dataProduct} />
      {/* </div> */}
    </div>
  );
}

export default DetailPage;
