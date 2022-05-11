import React, { useContext, useEffect, useState } from "react";
import style from "./ProductList.module.scss";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import ao2_back from "assets/images/product_promotion/ao2_back.png";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "store/store";
import productApi from "api/productApi";
function ProductList(props) {
  // const { state } = useContext(GlobalContext);
  const [arrProductSearch, setArrProductSearch] = useState([]);
  const location = useLocation();
  const dataTitle = location.state?.dataTitle;
  const showMyCart = (e) => {
    e.preventDefault();
  };
  const showQuickView = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const fetchRequestGetAllProductBySearch = async () => {
      try {
        const requestGetAllProductBySearch =
          await productApi.getAllProductBySearchTD(dataTitle);
        setArrProductSearch(requestGetAllProductBySearch.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllProductBySearch();
  }, [, dataTitle]);

  return (
    <div>
      <div className="row ">
        {arrProductSearch.length > 0 ? (
          arrProductSearch?.map((data, idx) => {
            // console.log(data);
            return (
              <div className={`${style.item_product} col-3`} key={idx}>
                <div className={`${style.img_trend_product}`}>
                  <Link to={`/products/detail`} state={{ dataProduct: data }}>
                    <img src={aothun2_front} alt="" />
                    <img src={ao2_back} className={style.img_hover} alt="" />
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
                  <div className={style.sale}>
                    <span>Sale!</span>
                  </div>
                </div>
                <h2 className={`${style.title_trend_product} `}>
                  <a href="/">{data.title}</a>
                </h2>
                <p className={`${style.price_trend_product} `}>
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
                </p>
              </div>
            );
          })
        ) : (
          <h2 style={{ textAlign: "center" }}>Không tìm thấy sản phẩm</h2>
        )}
      </div>
    </div>
  );
}

export default ProductList;
