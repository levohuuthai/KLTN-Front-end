import React, { useContext, useEffect, useState } from "react";
import style from "../WishList.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import productApi from "api/productApi";
import { useSelector } from "react-redux";
import ItemProductWishList from "../ItemProductWishList/ItemProductWishList";
function ListProductWishList(props) {
  const { dispatch, state } = useContext(GlobalContext);
  const [dataProduct, setDataProduct] = useState();
  const loggedInUser = useSelector((state) => state.user.current);
  return (
    <>
      {state.dataWishList?.map((data, idx) => {
        return (
          <tr className={style.product_wishlist} key={idx}>
            <ItemProductWishList idData={data} />
          </tr>
        );
      })}
    </>
  );
}

export default ListProductWishList;
