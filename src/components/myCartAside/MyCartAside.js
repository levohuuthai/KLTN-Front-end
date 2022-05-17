import React, { useContext, useEffect, useState } from "react";
import style from "./MyCartAside.module.scss";
import { GlobalContext } from "../../store/store";
import { ACTIOS } from "../../store/actions";
import cartApi from "api/cartApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartSkeletonList from "./CartSkeletonList";
import LoadingCart from "./LoadingCart";

function MyCartAside(props) {
  const { dispatch, state } = useContext(GlobalContext);
  const { activeCart } = state;
  const loggedInUser = useSelector((state) => state.user.current);
  const [totalMoney, setTotalMoney] = useState();

  const closeMyCart = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIOS.ActiveShowCart, payload: false });
  };

  useEffect(() => {
    var rs = state.dataCart.reduce((acc, val) => {
      return acc + val.product.priceAfter * val.product.quantity;
    }, 0);
    setTotalMoney(rs);
  }, [state.dataCart]);
  let navigate = useNavigate();

  const handleTurnOffMyCartAside = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIOS.ActiveShowCart, payload: false });
    if (loggedInUser !== null) {
      navigate("/cart", {
        state: {
          totalMoney: totalMoney,
        },
      });
    } else {
      navigate("/auth/login");
    }
  };
  const handleLinkPayment = (e) => {
    if (state.dataCart.length > 0) {
      e.preventDefault();
      dispatch({ type: ACTIOS.ActiveShowCart, payload: false });
      navigate("/checkout/address");
    } else {
      e.preventDefault();
    }
  };
  return (
    <>
      {state.loadingCart ? (
        <LoadingCart />
      ) : (
        <aside
          className={`${style.my_cart_aside} ${
            activeCart ? style.active_my_cart_aside : ""
          }`}
        >
          <div className={style.blur_cart_aside}></div>
          <div className={style.container_cart}>
            <div
              className={`${style.title_cart} d-flex align-items-center justify-content-between`}
            >
              <h2>Giỏ hàng của bạn</h2>
              <a href="/" className={style.close_cart} onClick={closeMyCart}>
                <i className="bi bi-x"></i>
              </a>
            </div>
            <div className={`${style.mini_cart} flex-column`}>
              <div className={style.list_cart_product} id="scroll-2">
                {state.loadingDeleteCart ? (
                  <CartSkeletonList length={state.dataCart.length} />
                ) : (
                  state.dataCart?.map((data, idx) => {
                    const closeMyProductCart = () => {
                      console.log(data._id);
                      const fetchDeleteProductCart = async () => {
                        try {
                          const requestDeleteProductCart =
                            await cartApi.deleteProductToCart(data._id);
                          await dispatch({
                            type: ACTIOS.loadingDeleteCart,
                            payload: true,
                          });
                          if (requestDeleteProductCart.status === 200) {
                            const fetchGetProductCartByUserId = async () => {
                              try {
                                const requestGetProductCartByUserId =
                                  await cartApi.getProductCartByUserId(
                                    loggedInUser._id
                                  );
                                await dispatch({
                                  type: ACTIOS.dataCart,
                                  payload: requestGetProductCartByUserId.data,
                                });
                                await dispatch({
                                  type: ACTIOS.loadingDeleteCart,
                                  payload: false,
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            };
                            fetchGetProductCartByUserId();
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      };
                      fetchDeleteProductCart();
                    };
                    return (
                      <div
                        className={`${style.item_product_cart} d-flex align-items-start`}
                        key={idx}
                      >
                        <div className={style.img_product_cart}>
                          <a href="#/">
                            <img src={data.product.image} alt="ao thun 2" />
                          </a>
                        </div>
                        <div className={style.name_product_cart}>
                          <a href="#/">{data.product.title}</a>
                          <span>
                            {data.product.quantity} x{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(data.product.priceAfter)}
                          </span>
                          <span>
                            {data.product.size} - {data.product.color}
                          </span>
                        </div>
                        <div
                          className={style.close_product_cart}
                          onClick={closeMyProductCart}
                        >
                          <i className="bi bi-x"></i>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className={style.minicart_bot}>
                <div
                  className={`${style.subtotal_group} d-flex justify-content-between align-items-center`}
                >
                  <h2>Tổng tiền:</h2>
                  <p className={style.subtotal}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalMoney)}
                  </p>
                </div>
                <div>
                  <a
                    // to="/cart"
                    href="/"
                    state={{ totalMoney: totalMoney }}
                    className={style.view_cart}
                    onClick={handleTurnOffMyCartAside}
                  >
                    Xem chi tiết giỏ hàng
                  </a>
                </div>
                <div>
                  <a
                    href="/"
                    className={`${style.checkout} ${
                      state.dataCart.length > 0 ? style.active : ""
                    }`}
                    onClick={handleLinkPayment}
                  >
                    Thanh toán
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default MyCartAside;
