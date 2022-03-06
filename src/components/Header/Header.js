import React, { useContext, useState } from "react";
import style from "./Header.module.scss";
import logoRubic from "assets/images/logoRubic.png";
import { Link } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import BackToTop from "components/BackToTop/BackToTop";
import MyCartAside from "components/myCartAside/MyCartAside";

import { GlobalContext } from "../../store/store";
import { ACTIOS } from "../../store/actions";

Header.propTypes = {};

function Header(props) {
  const [showHeader, setShowHeader] = useState(false);
  const { dispatch, state } = useContext(GlobalContext);
  const { activeCart } = state;
  const showMyCart = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIOS.ActiveShowCart, payload: true });
  };
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < -160) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  });

  // const showMyCart = (e) => {
  //   e.preventDefault();
  //   setActive_cart(true);
  // };

  return (
    <>
      <div className="wrap">
        <div className={style.top_bar}>
          <div className={`${style.container_top}   `}>
            <div className={`${style.top_bar_left}  `}>
              <a href="tel:0327364753">
                <i className="bi bi-telephone-outbound"></i>
                {/* <span>
              <FiPhoneIncoming
                style={{ fontSize: "16px", color: "#444444" }}
              />
            </span> */}
                0327364753
              </a>

              <a href="mailto:levohuuthai1@gmail.com">
                <i className="far fa-envelope"></i>levohuuthai1@gmail.com
              </a>
            </div>
            <div className={`${style.top_bar_center} `}>
              <span>Miễn phí giao hàng hóa đơn trên 200.000 vnđ</span>
              <span href="/" className={style.shop_now}>
                Mua sắm ngay!
              </span>
            </div>
            <div className={`${style.top_bar_right} `}>
              <div
                className={`${style.social} d-flex justify-content-between align-items-end`}
              >
                <a href="\">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="\">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="\">
                  <i className="fab fa-youtube-square"></i>
                </a>
                <a href="\">
                  <i className="fab fa-pinterest"></i>
                </a>
                <a href="\">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${style.header} ${showHeader ? style.active_fixed : ""}`}
        >
          <div className={`${style.container_top} `}>
            <div className={`${style.menu_bar_reponsive}`}>
              <i className="bi bi-list"></i>
            </div>
            <div className={`${style.logo}`}>
              <a href="../html/Project.html">
                <img src={logoRubic} alt="" />
              </a>
            </div>
            {/* Menu */}
            <ul className={`${style.list_menu}`}>
              <li className={`${style.home_menu} `}>
                <a href="\" className={`${style.h} `}>
                  Trang chủ
                  <i className="bi bi-chevron-down"></i>
                </a>
              </li>

              <li className={`${style.product_menu}`}>
                <a href="\">
                  Sản phẩm<i className="bi bi-chevron-down"></i>{" "}
                </a>
                <div className={`${style.dropdown_product}  `}>
                  <ul className={`${style.shoplayout}`}>
                    <li>
                      <a href="\" className={`${style.title_product}`}>
                        Danh mục
                      </a>
                    </li>
                    <li>
                      <a href="\">Tất cả</a>
                    </li>
                    <li>
                      <a href="\">Áo thun trơn</a>
                    </li>
                    <li>
                      <a href="\">Áo thun sọc</a>
                    </li>
                    <li>
                      <a href="\">Áo thun in hình</a>
                    </li>
                    <li>
                      <a href="\">Áo thun nam</a>
                    </li>
                    <li>
                      <a href="\">Áo thun nữ</a>
                    </li>
                    <li>
                      <a href="\">Unisex</a>
                    </li>
                  </ul>
                  <ul className={`${style.productlayout}`}>
                    <li>
                      <a href="\" className={`${style.title_product}`}>
                        Xu hướng
                      </a>
                    </li>
                    <li>
                      <a href="\">Hàng mới về</a>
                    </li>
                    <li>
                      <a href="\">Giảm nhiều nhất</a>
                    </li>
                    <li>
                      <a href="\">Bán chạy nhất</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className={`${style.introduce_menu} `}>
                <a href="\">
                  Giới thiệu<i className="bi bi-chevron-down"></i>{" "}
                </a>
                <div className={`${style.dropdown_introduce} `}>
                  <ul>
                    <li>
                      <a href="\">Về chúng tôi</a>
                    </li>
                    <li>
                      <a href="\">Liên hệ</a>
                    </li>
                    <li>
                      <a href="\">Khách hàng hài lòng 100%</a>
                    </li>
                    <li>
                      <a href="\">Tài khoản của tôi</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={`${style.knowDress_menu} `}>
                <a href="\">
                  Kiến thức mặc đẹp<i className="bi bi-chevron-down"></i>{" "}
                </a>
                <div className={`${style.dropdown_knowDress} `}>
                  <ul>
                    <li>
                      <a href="\">Hướng dẫn chọn size</a>
                    </li>
                    <li>
                      <a href="\">Blog</a>
                    </li>
                    <li>
                      <a href="\">Nhóm mặc đẹp sống chất</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className={`${style.serviceCustom_menu} `}>
                <a href="\">
                  Dịch vụ khách hàng<i className="bi bi-chevron-down"></i>{" "}
                </a>
                <div className={`${style.dropdown_serviceCustom} `}>
                  <ul>
                    <li>
                      <a href="\">Hỏi đáp - FAQs</a>
                    </li>
                    <li>
                      <a href="\">Chính sách giao hàng</a>
                    </li>
                    <li>
                      <a href="\">Chính sách đổi trả</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

            <div className={`${style.header_right} `}>
              <div className={`${style.account}`}>
                <i className="far fa-user"></i>
                <Link to="/login">Đăng nhập /</Link>
                <Link to="/register"> Đăng ký</Link>
              </div>
              <div className={`${style.bar_vertical}`}></div>
              <div className={`${style.wishlist}`} title="View Wishlist">
                <a href="../html/wishlist.html">
                  <i className="bi bi-suit-heart"></i>
                </a>
                <p className={`${style.qty_wl}`}>
                  <a href="\">0</a>
                </p>
              </div>
              <div className={`${style.my_cart}`} onClick={showMyCart}>
                <a href="">
                  <i className="bi bi-handbag"></i>
                </a>
                <p className={`${style.qty_mc} `}>
                  <a href="\">0</a>
                </p>
              </div>
              <div className={`${style.search} `}>
                <a href="\">
                  <i className="bi bi-search"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
      </div>
      <MyCartAside active_cart={activeCart} />
    </>
  );
}

export default Header;
