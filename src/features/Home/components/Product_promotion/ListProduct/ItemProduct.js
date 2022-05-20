import TotalStar from "components/TotalStar/TotalStar";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../Product_promotion.module.scss";
import wishlishApi from "api/wishlishApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import { useSelector } from "react-redux";
import productApi from "api/productApi";

function ItemProduct({ data, onReceiveActiveWishlist }) {
  const { dispatch, state } = useContext(GlobalContext);
  const loggedInUser = useSelector((state) => state.user.current);
  const showQuickView = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIOS.loadingQuickView, payload: true });

    const fetchRequestGetIdProdcut = async () => {
      try {
        const requestGetIdProduct = await productApi.getIdProduct(data._id);
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
    await onReceiveActiveWishlist(true);

    await setTimeout(() => {
      onReceiveActiveWishlist(false);
    }, 2000);
    const fetchAddProductWishList = async () => {
      try {
        const requestAddProductWishList = await wishlishApi.AddProductWishList({
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
  const [activeButtonWishList, setActiveButtonWishList] = useState(false);

  useEffect(() => {
    // state.dataWishList?.map((itemWishList, idx) => {
    //   return itemWishList === data._id
    //     ? setActiveButtonWishList(true)
    //     : setActiveButtonWishList(false);
    //   //   return itemWishList === data._id ? "#ba933e" : "";
    // });
  }, []);
  let a = state.dataWishList?.map((itemWishList, idx) => {
    return itemWishList === data._id ? style.activeButton : "";
  });

  return (
    <div className="d-flex justify-content-center">
      <div className={`${style.item_trend_product}`}>
        <div className={`${style.img_trend_product}`}>
          <Link to={`/products/detail`} state={{ dataProduct: data }}>
            <img src={data.image_front} alt="" />
            <img src={data.image_back} className={style.img_hover} alt="" />
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
              className={`${style.wishlist} ${state.dataWishList
                ?.map((itemWishList, idx) => {
                  return itemWishList === data._id ? style.activeButton : "";
                })
                .join("")} `}
              onClick={addWWishlist}
            >
              <i className="bi bi-suit-heart"></i>
            </a>

            <p className={`${style.detail_wishlist} `}>Thêm vào yêu thích</p>
            <a href="#" className={`${style.compare} `}>
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
    </div>
  );
}

export default ItemProduct;
