/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import style from './DetailPage.module.scss';
import aothuninhinh from 'assets/images/type/aothuninhinh.jpg';
import { useLocation } from 'react-router-dom';
import productApi from 'api/productApi';
import { GlobalContext } from 'store/store';
import { ACTIOS } from 'store/actions';
import ItemColor from './ItemColor/ItemColor';
import ItemSize from './ItemSize/ItemSize';
import { useDispatch } from 'react-redux';
import { addToCart } from 'features/Cart/cartSlice';
import cartApi from 'api/cartApi';
import { useSelector } from 'react-redux';
import aothun2_front from 'assets/images/product_promotion/ao2_front.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReviewProduct from 'features/ReviewProduct/ReviewProduct';
import TotalStar from 'components/TotalStar/TotalStar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
toast.configure();

DetailPage.propTypes = {};

function DetailPage(props) {
  const loggedInUser = useSelector((state) => state.user.current);
  const { dispatch, state } = useContext(GlobalContext);
  let navigate = useNavigate();

  const dispatchRedux = useDispatch();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const refImgShowCase = useRef(null);
  const refImgParralax = useRef(null);
  const refImgParralax2 = useRef(null);
  const refImgParralax3 = useRef(null);

  const refHeightContent = useRef(null);
  const [showBtnSeeMore, setShowBtnSeeMore] = useState(true);
  const [arrayProductDetail, setArrayProductDetail] = useState([]);
  const [price, setPrice] = useState(undefined);
  const [priceMax, setPriceMax] = useState(undefined);

  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [arrayColor, setArrayColor] = useState([]);
  const [arraySize, setArraySize] = useState();

  // const handlerImgSelect = (e) => {
  //   const imgId = e.currentTarget.attributes["data-id"].value;
  //   const displayWidth = refImgShowCase.current.childNodes[0].clientWidth;
  //   refImgShowCase.current.style.transform = `translateX(${
  //     -(imgId - 1) * displayWidth
  //   }px)`;
  // };

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
    // };    console.log(refHeightContent.current.clientHeight);
  }, []);
  const handlerBtnSeeMore = () => {
    // if (refHeightContent.current.clientHeight > 400) {
    setShowBtnSeeMore(!showBtnSeeMore);
    // }
  };
  const location = useLocation();
  const dataProduct = location.state?.dataProduct;
  useEffect(() => {
    setPrice(dataProduct.priceMin);
    setPriceMax(dataProduct.priceMax);
  }, []);

  useEffect(() => {
    // console.log(dataProduct);
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
    fetchRequestGetProductDetail();
  }, []);

  const showMyCart = (e) => {
    if (size !== '' && color !== '') {
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
            // console.log(requestIdProductDetailToCart);
            if (requestIdProductDetailToCart.status == 200) {
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
                  if (requestAddToCart.status == 200) {
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
        navigate('/auth/login');
      }
    } else {
      e.preventDefault();
      toast.error('Cần chọn size và màu', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
  };
  const handleSizePriceByColor = (data) => {
    // setArraySize(data.sizes);
    // setPrice(data.priceMin);
    // setPriceMax(data.priceMax);
  };
  const handleColorPriceBySize = (data) => {
    setArrayColor(data.colors);
    // setPrice(data.priceMin);
    // setPriceMax(data.priceMax);
  };
  const handleDataSize = (data) => {
    setSize(data);
  };
  const handleDataSizeOriginal = (data) => {
    // setSize(data);
  };
  const handleDataColor = (data) => {
    setColor(data);
  };
  const handleDataColorOriginal = (data) => {
    // setColor(data);
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
    fetchGetPriceByColorSize();
  }, [size, color]);
  const [arrImageUnique, setArrImageUnique] = useState();

  //Khong trung
  useEffect(async () => {
    let arrImage = [];
    arrImage = arrayProductDetail?.map((data, idx) => {
      return data.image;
    });
    let arrImageUnique = [];
    arrImageUnique = arrImage.filter(function (item) {
      return arrImageUnique.includes(item) ? '' : arrImageUnique.push(item);
    });
    setArrImageUnique(arrImageUnique);
  }, [arrayProductDetail]);
  const [activeThumb, setActiveThumb] = useState('');
  const [slideView, setSliderView] = useState(arrayProductDetail.length);
  return (
    <div className={`${style.detail} wrap`}>
      <div className={style.frontpage}>
        <div className={`${style.container} d-flex align-items-center`}>
          <span>
            <a href='../html/Project.html'>Home &nbsp; /</a> &nbsp; Shop &nbsp;
            /<a href='../html/Project.html'> &nbsp; Fashion &nbsp; /</a> &nbsp;
            Backpage
          </span>
        </div>
      </div>
      <div className={style.detail_product}>
        <div className={style.img_detailproduct_group}>
          <div className={`${style.img_select} `}>
            <Swiper
              onSwiper={setActiveThumb}
              className='position-relative'
              modules={[Thumbs]}
              pagination={{
                clickable: true,
              }}
              direction='vertical'
              spaceBetween={0}
              slidesPerView={slideView}
              loop={false}
            >
              {arrImageUnique?.map((data, idx) => {
                // setSliderView(idx + 1);
                return (
                  <SwiperSlide>
                    <div className={`${style.item_img_select}`}>
                      <img src={data} alt='sss' />
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

          <div className={style.img_display}>
            <div className={`prevElDetailDisplay ${style.prevEl}`}></div>
            <div className={`nextElDetailDisplay ${style.nextEl}`}></div>
            <Swiper
              className='position-relative'
              modules={[Navigation, Thumbs]}
              thumbs={{ swiper: activeThumb }}
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              loop={false}
              navigation={true}
              navigation={{
                prevEl: '.prevElDetailDisplay',
                nextEl: '.nextElDetailDisplay',
              }}
            >
              {arrImageUnique?.map((data, idx) => {
                return (
                  <SwiperSlide>
                    <div
                      className={`${style.img_showcase}`}
                      ref={refImgShowCase}
                    >
                      <img
                        src={data}
                        alt='ao main'
                        // ref={refImgParralax}
                        // onMouseMove={MoveImg}
                        // onMouseOut={OutImg}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {/* <div className={style.img_showcase} ref={refImgShowCase}>
              <img
                src={dataProduct.image_front}
                alt="s"
                ref={refImgParralax}
                onMouseMove={MoveImg}
                onMouseOut={OutImg}
              />
              <img src={dataProduct.image_back} alt="s" />{" "}
              {arrImageUnique?.map((data, idx) => {
                return (
                  <img
                    src={data.image}
                    alt="s"
                    key={idx}
                    ref={refImgParralax}
                    onMouseMove={MoveImg}
                    onMouseOut={OutImg}
                  />
                );
              })}
            </div> */}
          </div>
        </div>
        <div className={style.content_detailproduct}>
          <h2>{dataProduct.title}</h2>
          <div className={style.rating_purchase}>
            <TotalStar productId={dataProduct._id} />
            <p className={style.purchase}>
              | Đã bán {dataProduct.soldQuantity}
            </p>
          </div>
          <div className={`${style.price}  d-flex `}>
            <h4>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(price)}
              {size === '' || color === ''
                ? `${' -'} ${new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(priceMax)}`
                : ''}
            </h4>
          </div>
          <div className={`${style.size}`}>
            <div className={style.title_size}>
              <p>Kích thước: </p>
              <p className={style.value_size}>{size}</p>
            </div>
            <div className={style.btn_size}>
              <ItemSize
                // arrayProductDetail={arrayProductDetail}
                dataProduct={dataProduct}
                receiveDataColorPrice={handleColorPriceBySize}
                receiveDataSize={handleDataSize}
                receiveDataSizeOriginal={handleDataSizeOriginal}
                arraySize={arraySize}
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
                // arrayProductDetail={arrayProductDetail}
                dataProduct={dataProduct}
                receiveDataSizePrice={handleSizePriceByColor}
                receiveDataColor={handleDataColor}
                receiveDataColorOriginal={handleDataColorOriginal}
                arrayColor={arrayColor}
              />
            </div>
          </div>
          <div className={`${style.btn_group} d-flex`}>
            <div
              className={`${style.control}  d-flex justify-content-between align-items-center`}
            >
              <a href='/' className={style.minus} onClick={handleMinus}>
                <i className='fas fa-minus'></i>
              </a>
              <span className='qty'>{quantity}</span>
              <a href='/' className={style.plus} onClick={handlePlus}>
                <i className='fas fa-plus'></i>
              </a>
            </div>
            <a
              href='/'
              className={`${style.btn_addtocart} ${
                size !== '' && color !== '' ? style.active : ''
              }  d-flex  align-items-center`}
              onClick={showMyCart}
              title={`${
                size === '' || color === '' ? 'Cần chọn màu và size' : ''
              }`}
            >
              <i className='bi bi-handbag'></i>Thêm vào giỏ hàng
            </a>
            <a
              href='/'
              className={`${style.wishlist_item}  d-flex  align-items-center`}
            >
              <i className='bi bi-suit-heart'></i>
            </a>
            <a
              href='/'
              className={`${style.compare_product}  d-flex  align-items-center`}
            >
              <i className='bi bi-sliders'></i>
            </a>
          </div>
          <div className={`${style.social_sharing}  d-flex `}>
            <h3>Chia sẻ:</h3>
            <ul className='d-flex'>
              <li>
                <a href='/' className={style.face}>
                  <i className='fab fa-facebook'></i>
                </a>
              </li>
              <li>
                <a href='/' className={style.twitter}>
                  <i className='fab fa-twitter'></i>
                </a>
              </li>
              <li>
                <a href='/' className={style.pin}>
                  <i className='fab fa-pinterest'></i>
                </a>
              </li>
              <li>
                <a href='/' className={style.em}>
                  <i className='far fa-envelope'></i>
                </a>
              </li>
              <li>
                <a href='/' className={style.vi}>
                  <i className='fab fa-viber'></i>
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
            className={showBtnSeeMore ? style.btn_backdropseemore : ''}
          ></div>
          {dataProduct.desc.length >= 450 && (
            <div
              className={`${style.btnSeemore} ${
                showBtnSeeMore ? '' : style.NOTactive_seemore
              }`}
              onClick={handlerBtnSeeMore}
            >
              <span>
                {showBtnSeeMore ? 'Xem thêm nội dung' : 'Thu gọn nội dung'}{' '}
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
