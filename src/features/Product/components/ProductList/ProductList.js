import React from "react";
import aothuntron from "assets/images/type/aothuntron.jpg";
import aothuninhinh from "assets/images/type/aothuninhinh.jpg";
import style from "./ProductList.module.scss";

function ProductList(props) {
  return (
    <div>
      <div className="row ">
        <div className={`${style.item_product} col-3`}>
          <div className={`${style.img_product}`}>
            <a href="/">
              <img src={aothuntron} alt="" />
              <img src={aothuninhinh} className={style.img_hover} alt="" />
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

              <p className={`${style.detail_wishlist} `}>Thêm vào yêu thích</p>

              <a href="/" className={`${style.compare} `}>
                <i className="bi bi-sliders"></i>
              </a>
              <p className={`${style.detail_compare} `}>So sánh</p>
              <a href="/" className={`${style.quickview} `}>
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
          </div>
          <h2 className={`${style.title_trend_product} `}>
            <a href="/">ÁO THUN</a>
          </h2>
          <p className={`${style.price_trend_product} `}>$80.00</p>
        </div>
        <div className={`${style.item_product} col-3`}>
          <div className={`${style.img_product}`}>
            <a href="/">
              <img src={aothuntron} alt="" />
              <img src={aothuninhinh} className={style.img_hover} alt="" />
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

              <p className={`${style.detail_wishlist} `}>Thêm vào yêu thích</p>

              <a href="/" className={`${style.compare} `}>
                <i className="bi bi-sliders"></i>
              </a>
              <p className={`${style.detail_compare} `}>So sánh</p>
              <a href="/" className={`${style.quickview} `}>
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
          </div>
          <h2 className={`${style.title_trend_product} `}>
            <a href="/">ÁO THUN</a>
          </h2>
          <p className={`${style.price_trend_product} `}>$80.00</p>
        </div>
        <div className={`${style.item_product} col-3`}>
          <div className={`${style.img_product}`}>
            <a href="/">
              <img src={aothuntron} alt="" />
              <img src={aothuninhinh} className={style.img_hover} alt="" />
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

              <p className={`${style.detail_wishlist} `}>Thêm vào yêu thích</p>

              <a href="/" className={`${style.compare} `}>
                <i className="bi bi-sliders"></i>
              </a>
              <p className={`${style.detail_compare} `}>So sánh</p>
              <a href="/" className={`${style.quickview} `}>
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
          </div>
          <h2 className={`${style.title_trend_product} `}>
            <a href="/">ÁO THUN</a>
          </h2>
          <p className={`${style.price_trend_product} `}>$80.00</p>
        </div>
        <div className={`${style.item_product} col-3`}>
          <div className={`${style.img_product}`}>
            <a href="/">
              <img src={aothuntron} alt="" />
              <img src={aothuninhinh} className={style.img_hover} alt="" />
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

              <p className={`${style.detail_wishlist} `}>Thêm vào yêu thích</p>

              <a href="/" className={`${style.compare} `}>
                <i className="bi bi-sliders"></i>
              </a>
              <p className={`${style.detail_compare} `}>So sánh</p>
              <a href="/" className={`${style.quickview} `}>
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
          </div>
          <h2 className={`${style.title_trend_product} `}>
            <a href="/">ÁO THUN</a>
          </h2>
          <p className={`${style.price_trend_product} `}>$80.00</p>
        </div>
        <div className={`${style.item_product} col-3`}>
          <div className={`${style.img_product}`}>
            <a href="/">
              <img src={aothuntron} alt="" />
              <img src={aothuninhinh} className={style.img_hover} alt="" />
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

              <p className={`${style.detail_wishlist} `}>Thêm vào yêu thích</p>

              <a href="/" className={`${style.compare} `}>
                <i className="bi bi-sliders"></i>
              </a>
              <p className={`${style.detail_compare} `}>So sánh</p>
              <a href="/" className={`${style.quickview} `}>
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
          </div>
          <h2 className={`${style.title_trend_product} `}>
            <a href="/">ÁO THUN</a>
          </h2>
          <p className={`${style.price_trend_product} `}>$80.00</p>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
