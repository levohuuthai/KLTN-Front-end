import React, { useContext } from "react";
import style from "../WishList.module.scss";
import { GlobalContext } from "store/store";
import ItemProductWishList from "../ItemProductWishList/ItemProductWishList";
function ListProductWishList(props) {
  const { state } = useContext(GlobalContext);

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
