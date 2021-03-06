import React from "react";
import style from "./Header.module.scss";
import logoRubic from "assets/images/logoRubic.png";

Header.propTypes = {};

function Header(props) {
  return (
    <div>
      <div class={style.top_bar}>
        <div
          class={`${style.container_top}    d-flex justify-content-between align-items-center`}
        >
          <div class={`${style.top_bar_left} d-flex `}>
            <a href="tel:0327364753">
              <i class="bi bi-telephone-outbound"></i>
              {/* <span>
                <FiPhoneIncoming
                  style={{ fontSize: "16px", color: "#444444" }}
                />
              </span> */}
              0327364753
            </a>

            <a href="mailto:levohuuthai1@gmail.com">
              <i class="far fa-envelope"></i>levohuuthai1@gmail.com
            </a>
          </div>
          <div class={`${style.top_bar_center} `}>
            <span>Miễn phí giao hàng hóa đơn trên 200.000 vnđ</span>
            <span href="/" class={style.shop_now}>
              Mua sắm ngay!
            </span>
          </div>
          <div
            class={`${style.top_bar_right} d-flex justify-content-between align-items-center`}
          >
            <div
              class={`${style.social} d-flex justify-content-between align-items-end`}
            >
              <a href="\">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="\">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="\">
                <i class="fab fa-youtube-square"></i>
              </a>
              <a href="\">
                <i class="fab fa-pinterest"></i>
              </a>
              <a href="\">
                <i class="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className={style.header}>
        <div
          className={`${style.container_top} d-flex justify-content-between align-items-center`}
        >
          <div className={`${style.menu_bar_reponsive}`}>
            <i className="bi bi-list"></i>
          </div>
          <div className={`${style.logo}`}>
            <a href="../html/Project.html">
              <img src={logoRubic} alt="" />
            </a>
          </div>
          {/* Menu */}
          <ul className={`${style.list_menu} d-flex `}>
            <li className={`${style.home_menu} `}>
              <a href="\" className={`${style.h} `}>
                Trang chủ
                <i className="bi bi-chevron-down"></i>
              </a>
            </li>

            <li className={`${style.product_menu} position-relative`}>
              <a href="\">
                Sản phẩm<i class="bi bi-chevron-down"></i>{" "}
              </a>
              <div className={`${style.dropdown_product} d-flex `}>
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
                Giới thiệu<i class="bi bi-chevron-down"></i>{" "}
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
                Kiến thức mặc đẹp<i class="bi bi-chevron-down"></i>{" "}
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
                Dịch vụ khách hàng<i class="bi bi-chevron-down"></i>{" "}
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

          <div className={`${style.header_right} d-flex`}>
            <div className={`${style.account}`}>
              <i class="far fa-user"></i>
              <a href="\" title="Login">
                Đăng nhập /
              </a>
              <a href="\"> Đăng ký</a>
            </div>
            <div className={`${style.bar_vertical}`}></div>
            <div className={`${style.wishlist} d-flex`} title="View Wishlist">
              <a href="../html/wishlist.html">
                <i class="bi bi-suit-heart"></i>
              </a>
              <p className={`${style.qty_wl}`}>
                <a href="\">0</a>
              </p>
            </div>
            <div className={`${style.my_cart} d-flex`}>
              <a href="\">
                <i class="bi bi-handbag"></i>
              </a>
              <p className={`${style.qty_mc} `}>
                <a href="\">0</a>
              </p>
            </div>
            <div className={`${style.search} `}>
              <a href="\">
                <i class="bi bi-search"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
