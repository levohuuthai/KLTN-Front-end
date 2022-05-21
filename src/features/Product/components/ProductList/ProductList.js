import React, { useContext } from "react";
import style from "./ProductList.module.scss";
import { Link } from "react-router-dom";
import productApi from "api/productApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import Quickview from "components/Quickview/Quickview";
import TotalStar from "components/TotalStar/TotalStar";
function ProductList(props) {
  const { dispatch, state } = useContext(GlobalContext);

  const showMyCart = (e) => {
    e.preventDefault();
  };

  //Mặc định khi load 3 loại

  // useEffect(() => {
  //   if (
  //     state.dataFilterBrand.length +
  //       state.dataFilterSize.length +
  //       state.dataFilterColor.length +
  //       (state.dataFilterPriceUnder200 === undefined ? 0 : 1) +
  //       state.dataFilterStyle.length ===
  //     0
  //   ) {
  //     const fetchRequestGetAllProductByCategory = async () => {
  //       try {
  //         const requestGetAllProductByCategory =
  //           await productApi.getAllProductByCategory(nameTypeProduct, filters);
  //         console.log(requestGetAllProductByCategory);
  //         // if (requestGetAllProductByCategory.status == 200) {
  //         await dispatch({
  //           type: ACTIOS.dataProductFilter,
  //           payload: requestGetAllProductByCategory.data.data,
  //         });
  //         dispatch({
  //           type: ACTIOS.loading,
  //           payload: false,
  //         });
  //         setPagination(requestGetAllProductByCategory.data.pagination);
  //         // }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchRequestGetAllProductByCategory();
  //   }
  // }, [filters]);
  return (
    <div>
      <div className="row ">
        {state.dataProductFilter?.map((data, idx) => {
          const showQuickView = (e) => {
            e.preventDefault();
            dispatch({ type: ACTIOS.loadingQuickView, payload: true });
            const fetchRequestGetIdProdcut = async () => {
              try {
                const requestGetIdProduct = await productApi.getIdProduct(
                  data._id
                );
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
                <a
                  href="/"
                  className={`${style.btn_addtocart} d-flex align-items-center justify-content-center`}
                  onClick={showMyCart}
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
                  <a
                    href="/"
                    className={`${style.quickview} `}
                    onClick={showQuickView}
                  >
                    <i className="bi bi-eye"></i>
                  </a>
                  <p className={`${style.detail_quickview} `}>Xem nhanh</p>
                </div>

                <div className={`${style.item_buttons_res} `}>
                  <a href="/" className={`${style.btn_wishlist_respon} `}>
                    <i className="bi bi-suit-heart"></i>
                  </a>
                  <a href="/" className={`${style.btn_addtocart_respon} `}>
                    <i className="bi bi-handbag"></i>
                  </a>
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
        })}
      </div>{" "}
      <Quickview />
    </div>
  );
}

export default ProductList;
