import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import React, { useContext, useEffect } from "react";
import style from "./WishList.module.scss";
import imgbackground4 from "assets/images/auth/login/imgbackground4.jpg";
import { GlobalContext } from "../../store/store";
import { ACTIOS } from "../../store/actions";
import wishlishApi from "api/wishlishApi";
import { useSelector } from "react-redux";
import ListProductWishList from "./ListProductWishList/ListProductWishList";

function WishList(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { dispatch, state } = useContext(GlobalContext);
  const loggedInUser = useSelector((state) => state.user.current);

  useEffect(() => {
    const fetchGetProductWishList = async () => {
      try {
        const requestGetProductWishList = await wishlishApi.getWishListUser(
          loggedInUser._id
        );
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
  }, []);
  return (
    <>
      <Header />
      <div className={`${style.background_slider}`}>
        <div className={style.imgbackground}>
          <img src={imgbackground4} alt="" />
        </div>
        <div className={style.title_background}>
          Yêu thích của tôi <p>Trang chủ / Yêu thích</p>
        </div>
      </div>
      <div className={style.my_cart_wishtlist}>
        <table className={style.table_wishlist}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th style={{ paddingLeft: "21px" }}>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Thương hiệu</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={style.tbody_wishlist}>
            <ListProductWishList />
          </tbody>
        </table>
        <div className={style.share_on}>
          <h2>Chia sẻ:</h2>
          <div className={style.share_social}>
            <a href="" className={style.face}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="" className={style.twitter}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="" className={style.pin}>
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="" className={style.em}>
              <i className="far fa-envelope"></i>
            </a>
            <a href="" className={style.vi}>
              <i className="fab fa-viber"></i>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WishList;
