import React from "react";
import style from "./Footer.module.scss";
import logo_footer_rubix from "assets/images/footer/logo-footer-rubix.png";
import logohand1 from "assets/images/footer/logohand1.jpg";
import logo_momo from "assets/images/footer/logo_momo.jpg";
import logovisa from "assets/images/footer/logovisa.jpg";
import logomastercard from "assets/images/footer/logomastercard.jpg";

Footer.propTypes = {};

function Footer(props) {
  return (
    <div className={`${style.footer} wrap`}>
      {" "}
      <div className={style.foot_top_group}>
        <div className=" d-flex justify-content-between">
          <div className={style.logo_social}>
            <img src={logo_footer_rubix} alt="Logo Rubix" />
            <div className={style.social}>
              <a href="/">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="/">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="/">
                <i className="fab fa-viber"></i>
              </a>
            </div>
          </div>
          <ul className={style.custom_service}>
            <li className={style.title_foot_top}>Hỗ trợ khách hàng</li>
            <li>
              <a href="/">Tài khoản của tôi</a>
            </li>
            <li>
              <a href="/">Yêu thích của tôi</a>
            </li>
            <li>
              <a href="/">Theo dõi đơn hàng của bạn</a>
            </li>
            <li>
              <a href="/">Hỏi đáp - FAQs</a>
            </li>
            <li>
              <a href="/">Phương thức thanh toán</a>
            </li>
            <li>
              <a href="/">Hướng dẫn chọn size</a>
            </li>
          </ul>
          <ul className={style.more_rubix}>
            <li className={style.title_foot_top}>Chính sách</li>
            <li>
              <a href="/">Chính sách đổi trả hàng</a>
            </li>
            <li>
              <a href="/">Chính sách giao hàng</a>
            </li>
            <li>
              <a href="/">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="/">Chính sách thanh toán</a>
            </li>
          </ul>
          <ul className={style.let}>
            <li className={style.title_foot_top_let}>Hỗ trợ</li>
            <li className="d-flex  align-items-start">
              <p>
                <i className="bi bi-headset"></i>
              </p>
              <div
                className={style.content_talk_find}
                style={{ marginLeft: "6px" }}
              >
                <p>
                  +84 (0)327364753 <br />
                  <span>levohuuthai1@gmail.com</span>{" "}
                </p>
              </div>
            </li>
            <li className={style.title_foot_top_let}>Địa chỉ</li>
            <li className="d-flex  align-items-start">
              <p>
                <i className="bi bi-geo-alt"></i>
              </p>
              <div
                className={style.content_talk_find}
                style={{ marginLeft: "6px" }}
              >
                <p>
                  566 Nguyễn Thái Sơn, Phường 5
                  <br />
                  <span>Quận Gò Vấp, Tp.HCM</span>{" "}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={style.horizontal_bar}></div>
      <div className={style.foot_bot}>
        <p>
          Copyright ©{" "}
          <span>
            <a href="/">Rubix</a>
          </span>{" "}
          all rights reserved. Powered by{" "}
          <span>
            <a href="/">ThaiHien Team</a>
          </span>
        </p>
        <div className={`${style.img_foot_bot} d-flex `}>
          {" "}
          <div>
            <img src={logohand1} alt="" />
          </div>
          <div>
            <img src={logo_momo} alt="" />
          </div>{" "}
          <div>
            <img src={logovisa} alt="" />
          </div>{" "}
          <div>
            <img src={logomastercard} alt="" />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default Footer;
