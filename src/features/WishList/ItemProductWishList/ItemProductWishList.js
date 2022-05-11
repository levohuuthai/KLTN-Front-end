import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "../WishList.module.scss";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import productApi from "api/productApi";
import useCallAPI from "customHooks/useCallAPI";
import FormDelete from "components/FormDelete/FormDelete";
import wishlishApi from "api/wishlishApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import { useSelector } from "react-redux";

ItemProductWishList.propTypes = {};

function ItemProductWishList(props) {
  const [dataProduct, setDataProduct] = useState();
  const { dispatch, state } = useContext(GlobalContext);
  const loggedInUser = useSelector((state) => state.user.current);

  // console.log(props?.idData);
  useEffect(() => {
    const fetchGetProductId = async () => {
      try {
        const requestGetProductId = await productApi.getIdProduct(
          props?.idData
        );
        // console.log(requestGetProductId);
        if (requestGetProductId.status === 200) {
          setDataProduct(requestGetProductId.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetProductId();
  }, []);
  const { response, loading, error } = useCallAPI({
    url: productApi.getIdProduct,
    body: props.idData,
  });
  useEffect(() => {
    if (response?.status === 200) {
      setDataProduct(response?.data);
    }
  }, [response]);
  //   }, []);
  const [isOpenFormDelete, seIsOpenFormDelete] = useState(false);
  const handleShowFormDeleteWishList = () => {
    seIsOpenFormDelete(true);
  };
  const falseFromLogOut = () => {
    seIsOpenFormDelete(false);
  };
  console.log(dataProduct);
  return (
    <>
      <td
        className={style.close_product_wishlist}
        onClick={handleShowFormDeleteWishList}
      >
        <i className="far fa-times-circle"></i>
      </td>
      <td className={style.img_product_wishlist}>
        <img src={dataProduct?.image_front} alt="image" />
      </td>
      <td className={style.name_product_wishlist}>{dataProduct?.title}</td>
      <td className={style.unitprice_product_wishlist}>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(dataProduct?.priceMin) +
          ` - ` +
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(dataProduct?.priceMax)}
      </td>
      <td className={style.brand}>{dataProduct?.brand}</td>
      <td className={style.detail_product}>
        <a href="#">Xem chi tiết</a>
      </td>
      <FormDelete
        isOpenFormDelete={isOpenFormDelete}
        onFormFalse={falseFromLogOut}
        // idData={props.idData}
        // idUser={loggedInUser._id}
        methodDeleteApi={wishlishApi.deleteWishList}
        dataDeleteApi={loggedInUser._id}
        data2DeleteApi={props.idData}
        methodGetApi={wishlishApi.getWishListUser}
        dataGetApi={loggedInUser._id}
        action={ACTIOS.dataWishList}
      >
        Bạn có muốn xóa
        <b>
          <i> {dataProduct?.title} </i>
        </b>
        này khỏi danh sách yêu thích
      </FormDelete>
    </>
  );
}

export default ItemProductWishList;
