import React from "react";
import style from "./LoadingCart.module.scss";
import { useLoading, Puff } from "@agney/react-loading";
LoadingCart.propTypes = {};

function LoadingCart(props) {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    loaderProps: {
      style: { color: "#fff" },
    },
    indicator: <Puff width="50" />,
  });
  return (
    <div className={style.loading_showcart}>
      <div className={style.backdrop_loading}></div>
      <div {...containerProps} className={style.itemLoading}>
        {indicatorEl}
      </div>
    </div>
  );
}

export default LoadingCart;
