import BoxChatClient from "components/BoxChatClient/BoxChatClient";
import React, { useEffect, useRef, useState } from "react";
import style from "./Chat.module.scss";
import io from "socket.io-client";

function Chat(props) {
  const [activeBoxChat, setActiveBoxChat] = useState();
  const showBoxChat = () => {
    setActiveBoxChat(!activeBoxChat);
  }; //socket
  // const socket = useRef();
  // const ENDPOINT = "localhost:3333";
  // useEffect(() => {
  //   socket.current = io(ENDPOINT, {
  //     transports: ["websocket", "polling", "flashsocket"],
  //   });
  // }, []);

  return (
    <>
      <div className={style.chat} onClick={showBoxChat}>
        <i class="fas fa-comment"></i>
      </div>
      {activeBoxChat ? <BoxChatClient /> : ""}
    </>
  );
}

export default Chat;
