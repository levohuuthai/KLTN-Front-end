import React from "react";
import PropTypes from "prop-types";
import style from "./Subscribe.module.scss";

Subscribe.propTypes = {};

function Subscribe(props) {
  return (
    <section className={`${style.subcribe_bg} wrap section`}>
      <div className=" d-flex justify-content-center">
        <div className={style.subcribe}>
          <h2>Đăng ký nhận bản tin của chúng tôi</h2>

          <div className={style.input_sub_group}>
            <input type="text" placeholder="Nhập email của bạn vào đây" />
            <a href="\">Subscribe</a>
          </div>
          <p>
            Chúng tôi tôn trọng quyền riêng tư của bạn, vì vậy chúng tôi không
            bao giờ chia sẻ thông tin của bạn.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Subscribe;
