import React, { useContext, useEffect, useState } from "react";
import style from "./ProductList.module.scss";
import { Link, useLocation } from "react-router-dom";
import productApi from "api/productApi";
import TotalStar from "components/TotalStar/TotalStar";
import { ACTIOS } from "store/actions";
import { GlobalContext } from "store/store";
import Quickview from "components/Quickview/Quickview";
import { useSelector } from "react-redux";
import wishlishApi from "api/wishlishApi";

function ProductList(props) {
  const [arrProductSearch, setArrProductSearch] = useState([]);
  const location = useLocation();
  const dataTitle = location.state?.dataTitle;
  const [activeWishList, setActiveWishList] = useState(false);
  const loggedInUser = useSelector((state) => state.user.current);
  const { dispatch, state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchRequestGetAllProductBySearch = async () => {
      try {
        const requestGetAllProductBySearch =
          await productApi.getAllProductBySearch(dataTitle);
        console.log(requestGetAllProductBySearch);
        setArrProductSearch(requestGetAllProductBySearch.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllProductBySearch();
  }, [, dataTitle]);
  console.log(dataTitle);
  return (
    <div>
      <div
        className="row "
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {arrProductSearch.length > 0 ? (
          arrProductSearch?.map((data, idx) => {
            const showQuickView = (e) => {
              e.preventDefault();
              dispatch({ type: ACTIOS.loadingQuickView, payload: true });
              const fetchRequestGetIdProdcut = async () => {
                try {
                  const requestGetIdProduct = await productApi.getIdProduct(
                    data._id
                  );
                  console.log(requestGetIdProduct);
                  dispatch({
                    type: ACTIOS.dataQuickView,
                    payload: requestGetIdProduct.data,
                  });
                  dispatch({ type: ACTIOS.activeQuickView, payload: true });
                  setTimeout(() => {
                    dispatch({ type: ACTIOS.loadingQuickView, payload: false });
                  }, 500);
                } catch (error) {
                  console.log(error);
                }
              };
              fetchRequestGetIdProdcut();
            };
            const addWWishlist = async (e) => {
              e.preventDefault();
              await setActiveWishList(true);

              await setTimeout(() => {
                setActiveWishList(false);
              }, 2000);
              const fetchAddProductWishList = async () => {
                try {
                  const requestAddProductWishList =
                    await wishlishApi.AddProductWishList({
                      userId: loggedInUser._id,
                      products: [data._id],
                    });
                  if (requestAddProductWishList.status === 200) {
                    const fetchGetProductWishList = async () => {
                      try {
                        const requestGetProductWishList =
                          await wishlishApi.getWishListUser(loggedInUser._id);
                        if (requestGetProductWishList.status === 200) {
                          dispatch({
                            type: ACTIOS.dataWishList,
                            payload: requestGetProductWishList.data.products,
                          });
                        }
                      } catch (error) {
                        console.log(error);
                      }
                    };
                    fetchGetProductWishList();
                  }
                } catch (error) {
                  console.log(error);
                }
              };
              fetchAddProductWishList();
            };
            return (
              <div className={`${style.item_product} col-4`} key={idx}>
                <div className={`${style.img_trend_product}`}>
                  <Link to={`/products/detail`} state={{ dataProduct: data }}>
                    <img src={data.image_front} alt="img front" />
                    <img
                      src={data.image_back}
                      className={style.img_hover}
                      alt="img back"
                    />
                  </Link>
                  <Link
                    to={`/products/detail`}
                    state={{ dataProduct: data }}
                    className={`${style.btn_addtocart} d-flex align-items-center justify-content-center`}
                    // onClick={showMyCart}
                  >
                    <i className="fas fa-info"></i>Xem chi tiết
                  </Link>
                  <div className={`${style.item_buttons} f-column `}>
                    <a
                      href="/"
                      className={`${style.wishlist} `}
                      onClick={addWWishlist}
                    >
                      <i className="bi bi-suit-heart"></i>
                    </a>

                    <p className={`${style.detail_wishlist} `}>
                      Thêm vào yêu thích
                    </p>

                    <a href="/" className={`${style.compare} `}>
                      <i className="bi bi-sliders"></i>
                    </a>
                    <p className={`${style.detail_compare} `}>So sánh</p>
                    <a
                      href="/"
                      className={`${style.quickview} `}
                      onClick={showQuickView}
                    >
                      <i className="bi bi-eye"></i>
                    </a>
                    <p className={`${style.detail_quickview} `}>Xem nhanh</p>
                  </div>
                  {/* salse */}
                  {data.priceBase !== data.priceMin &&
                    data.priceBase !== data.priceMax && (
                      <div className={style.sale}>
                        <span>Sale!</span>
                      </div>
                    )}
                </div>
                <h2
                  className={`${style.title_trend_product} d-flex justify-content-between`}
                >
                  <Link to={`/products/detail`} state={{ dataProduct: data }}>
                    {data.title}
                  </Link>
                  <div
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    <TotalStar productId={data._id} />
                  </div>
                </h2>
                <p className={`${style.price_trend_product} `}>
                  {data.priceBase !== data.priceMin &&
                  data.priceBase !== data.priceMax &&
                  data.priceMin !== data.priceMax ? (
                    <span>
                      <span className={`${style.price_notoff}`}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(data.priceBase)}
                      </span>
                      <span className={style.price_off}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(data.priceMin) +
                          ` - ` +
                          new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(data.priceMax)}
                      </span>
                    </span>
                  ) : data.priceMin === data.priceMax ? (
                    <span>
                      <span className={`${style.price_notoff}`}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(data.priceBase)}
                      </span>
                      <span className={style.price_off}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(data.priceMin)}
                      </span>
                    </span>
                  ) : (
                    <span className={style.price_off}>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(data.priceBase)}
                    </span>
                  )}
                </p>
              </div>
            );
          })
        ) : (
          <h2 style={{ textAlign: "center" }}>Không tìm thấy sản phẩm</h2>
        )}
      </div>
      <div
        className={`${style.notify_add_wishlist_promotion} ${
          activeWishList ? style.active : ""
        }`}
      >
        <p>Sản phẩm được thêm vào yêu thích</p>
      </div>
      <Quickview />
    </div>
  );
}

export default ProductList;
