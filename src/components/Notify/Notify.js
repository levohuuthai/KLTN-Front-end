import React, { useContext } from "react";
import style from "./Notify.module.scss";
import { GlobalContext } from "store/store";

function Notify({ children }) {
  const { state } = useContext(GlobalContext);

  return (
    <div
      className={`${style.notify} ${state.activeNotify ? style.active : ""}`}
    >
      <p>{children}</p>
    </div>
  );
}

export default Notify;
