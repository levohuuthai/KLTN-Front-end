import React from "react";
import PropTypes from "prop-types";
import style from "./ListService.module.scss";
import plane from "assets/images/list_service/plane.png";
import payment from "assets/images/list_service/payment.png";
import returnimg from "assets/images/list_service/return.png";

ListService.propTypes = {};

function ListService(props) {
  return (
    <div className={`${style.list_service} wrap `}>
      <div className="row">
        <div
          className={`${style.service} col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xlg-4`}
        >
          <div className={`${style.content_service}`}>
            <img src={plane} alt="plane" />
            <div className={`${style.title_service}`}>
              <h2>
                <a href="\">Miễn phí vận chuyển</a>
              </h2>
              <p>Cho đơn hàng từ 200.000 vnđ</p>
            </div>
          </div>
          <a href="\" className={`${style.learn_more_service}`}>
            Tìm hiểu thêm<i className="bi bi-chevron-right"></i>
          </a>
        </div>
        <div
          className={`${style.service} col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xlg-4`}
        >
          <div className={`${style.content_service} ${style.c_s_second}`}>
            <img src={payment} alt="payment" />
            <div className={`${style.title_service}`}>
              <h2>
                <a href="\">Mua trước trả sau</a>
              </h2>
              <p>Thanh toán sau cùng khi nhận hàng</p>
            </div>
          </div>
          <a href="\" className={`${style.learn_more_service}`}>
            Tìm hiểu thêm <i className="bi bi-chevron-right"></i>
          </a>
        </div>
        <div
          className={`${style.service} col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xlg-4`}
        >
          <div className={`${style.content_service} ${style.c_s_last}`}>
            <img src={returnimg} alt="return" />
            <div className={`${style.title_service}`}>
              <h2>
                <a href="\">Chính sách đổi trả</a>
              </h2>
              <p>Hỗ trợ đổi size</p>
            </div>
          </div>
          <a href="\" className={`${style.learn_more_service}`}>
            Tìm hiểu thêm <i className="bi bi-chevron-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ListService;
