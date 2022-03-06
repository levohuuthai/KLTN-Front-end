import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./BackToTop.module.scss";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

BackToTop.propTypes = {};

function BackToTop(props) {
  const [showToTop, setShowToTop] = useState(false);

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < -460) {
      setShowToTop(true);
    } else {
      setShowToTop(false);
    }
  });
  const handlerToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div
      className={`${
        showToTop ? style.toTop : ""
      } d-flex justify-content-center align-items-center`}
      onClick={handlerToTop}
    ></div>
  );
}

export default BackToTop;
