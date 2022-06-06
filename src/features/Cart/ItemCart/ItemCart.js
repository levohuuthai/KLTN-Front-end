import cartApi from "api/cartApi";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import style from "../Cart.module.scss";
import { GlobalContext } from "../../../store/store";
import { ACTIOS } from "../../../store/actions";
import aothuninhinh from "assets/images/type/aothuninhinh.jpg";
import FormDelete from "components/FormDelete/FormDelete";

function ItemCart(props) {
  //   const [data, setData] = useState(props.data);
  const [enterQuantity, setEnterQuantity] = useState({ quantity: null });
  const loggedInUser = useSelector((state) => state.user.current);
  const { dispatch, state } = useContext(GlobalContext);
  const handlePlus = (e) => {
    e.preventDefault();
    setEnterQuantity({ quantity: props.data.product.quantity + 1 });
    const fetchAddToCart = async () => {
      dispatch({
        type: ACTIOS.loadingPageCart,
        payload: true,
      });
      try {
        const requestAddToCart = await cartApi.updateQuantityToCart(
          loggedInUser._id,
          props.data.product.quantity + 1,
          {
            title: props.data.product.title,
            size: props.data.product.size,
            color: props.data.product.color,
            image: "",
            discount: props.data.product.discount,
            priceAfter: props.data.product.priceAfter,
            priceBefore: props.data.product.priceBefore,
            productDetailId: props.data.product.productDetailId,
          }
        );

        if (requestAddToCart.status == 200) {
          const fetchGetProductCartByUserId = async () => {
            try {
              const requestGetProductCartByUserId =
                await cartApi.getProductCartByUserId(loggedInUser._id);
              dispatch({
                type: ACTIOS.dataCart,
                payload: requestGetProductCartByUserId.data,
              });
              await dispatch({
                type: ACTIOS.loadingPageCart,
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
    fetchAddToCart();
  };
  const handleMinus = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIOS.loadingPageCart,
      payload: true,
    });
    if (props.data.product.quantity > 1) {
      setEnterQuantity({ quantity: props.data.product.quantity - 1 });
      const fetchAddToCart = async () => {
        try {
          const requestAddToCart = await cartApi.updateQuantityToCart(
            loggedInUser._id,
            props.data.product.quantity - 1,
            {
              title: props.data.product.title,
              size: props.data.product.size,
              color: props.data.product.color,
              image: "",
              discount: props.data.product.discount,
              priceAfter: props.data.product.priceAfter,
              priceBefore: props.data.product.priceBefore,
              productDetailId: props.data.product.productDetailId,
            }
          );

          if (requestAddToCart.status == 200) {
            const fetchGetProductCartByUserId = async () => {
              try {
                const requestGetProductCartByUserId =
                  await cartApi.getProductCartByUserId(loggedInUser._id);
                dispatch({
                  type: ACTIOS.dataCart,
                  payload: requestGetProductCartByUserId.data,
                });
                await dispatch({
                  type: ACTIOS.loadingPageCart,
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
      fetchAddToCart();
    }
  };
  const closeMyProductCart = () => {
    dispatch({
      type: ACTIOS.loadingPageCart,
      payload: true,
    });
    const fetchDeleteProductCart = async () => {
      try {
        const requestDeleteProductCart = await cartApi.deleteProductToCart(
          props.data._id
        );
        console.log(requestDeleteProductCart);
        if (requestDeleteProductCart.status == 200) {
          const fetchGetProductCartByUserId = async () => {
            try {
              const requestGetProductCartByUserId =
                await cartApi.getProductCartByUserId(loggedInUser._id);
              dispatch({
                type: ACTIOS.dataCart,
                payload: requestGetProductCartByUserId.data,
              });
              dispatch({
                type: ACTIOS.loadingPageCart,
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
  const handleChangeQuantity = (event) => {
    setEnterQuantity({ quantity: event.target.value });
    setTimeout(() => {
      dispatch({
        type: ACTIOS.loadingPageCart,
        payload: true,
      });
      const fetchAddToCart = async () => {
        try {
          const requestAddToCart = await cartApi.updateQuantityToCart(
            loggedInUser._id,
            event.target.value,
            {
              title: props.data.product.title,
              size: props.data.product.size,
              color: props.data.product.color,
              image: "",
              discount: props.data.product.discount,
              priceAfter: props.data.product.priceAfter,
              priceBefore: props.data.product.priceBefore,
              productDetailId: props.data.product.productDetailId,
            }
          );

          if (requestAddToCart.status == 200) {
            const fetchGetProductCartByUserId = async () => {
              try {
                const requestGetProductCartByUserId =
                  await cartApi.getProductCartByUserId(loggedInUser._id);
                dispatch({
                  type: ACTIOS.dataCart,
                  payload: requestGetProductCartByUserId.data,
                });
                dispatch({
                  type: ACTIOS.loadingPageCart,
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
      fetchAddToCart();
    }, 3000);
  };

  const [isOpenFormDelete, seIsOpenFormDelete] = useState(false);
  const handleShowFormDeleteItemCart = () => {
    seIsOpenFormDelete(true);
  };
  const falseFromLogOut = () => {
    seIsOpenFormDelete(false);
  };
  return (
    <>
      <div
        className={`${style.item_cart} d-flex justify-content-between align-items-center`}
        //   key={idx}
      >
        {/* <div className={`${style.checkbox} d-flex align-items-center`}>
          <input type="checkbox" id="item" />
          <label htmlFor="item"></label>
        </div> */}
        <p className={`${style.image_item_cart}`}>
          <img src={props.data?.product.image}></img>
        </p>
        <span
          className={`${style.name_item}  d-flex justify-content-center flex-column`}
        >
          {props.data.product.title}
          <span>
            Size: <b>{props.data.product.size}</b>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              Màu: <b>{props.data.product.color}</b>
            </span>
          </span>
        </span>
        <span className={`${style.price1} d-flex justify-content-center`}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.data.product.priceAfter)}
        </span>
        <div
          className={`${style.group_quantity} d-flex justify-content-center`}
        >
          <div className={style.quantity}>
            <span onClick={handleMinus}>-</span>
            <input
              type="text"
              value={
                enterQuantity.quantity == null
                  ? props.data.product.quantity
                  : enterQuantity.quantity
              }
              onChange={handleChangeQuantity}
            />
            <span onClick={handlePlus}>+</span>
          </div>
        </div>
        <span className={`${style.price2} d-flex justify-content-center`}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(
            props.data.product.priceAfter * props.data.product.quantity
          )}
        </span>
        <span
          className={`${style.close} d-flex justify-content-center`}
          onClick={handleShowFormDeleteItemCart}
        >
          <i className="far fa-times-circle"></i>
        </span>
      </div>
      <FormDelete
        isOpenFormDelete={isOpenFormDelete}
        onFormFalse={falseFromLogOut}
        methodDeleteApi={cartApi.deleteProductToCart}
        dataDeleteApi={props.data._id}
        // data2DeleteApi={props.idData}
        methodGetApi={cartApi.getProductCartByUserId}
        dataGetApi={loggedInUser._id}
        action={ACTIOS.dataCart}
      >
        Bạn có muốn xóa
        <b>
          <i> {props.data.product.title} </i>
        </b>
        khỏi giỏ hàng
      </FormDelete>
    </>
  );
}

export default ItemCart;
