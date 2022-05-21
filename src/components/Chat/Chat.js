import BoxChatClient from "components/BoxChatClient/BoxChatClient";
import React, { useState } from "react";
import style from "./Chat.module.scss";
import { Fragment } from "react";
function Chat(props) {
  const [activeBoxChat, setActiveBoxChat] = useState();
  const showBoxChat = () => {
    setActiveBoxChat(!activeBoxChat);
  };
  return (
    <>
      <div className={style.chat} onClick={showBoxChat}>
        <i className="fas fa-comment"></i>
      </div>
      {activeBoxChat ? <BoxChatClient /> : ""}
    </>
  );
}

export default Chat;
