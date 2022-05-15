import React, { useEffect, useRef, useState } from "react";
import style from "./BoxChatClient.module.scss";
import { Scrollbars } from "react-custom-scrollbars";
import Picker from "emoji-picker-react";
import aothuninhinh from "assets/images/type/aothuninhinh.jpg";
import ChatClient from "./ChatClient/ChatClient";
import { useSelector } from "react-redux";
import roomApi from "api/roomApi";
import messageApi from "api/messageApi";
import messageAdminAPI from "api/admin/messageAdminAPI";
import axios from "axios";
import io from "socket.io-client";

function BoxChatClient(props) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [enteredChat, setEnteredChat] = useState("");
  const loggedInUser = useSelector((state) => state.user.current);
  const idLogin = loggedInUser?._id;
  const [roomUser, setRoomUser] = useState([]);
  const [arrayChat, setArrayChat] = useState([]);
  // //socket
  // const socket = useRef();
  // const ENDPOINT = "localhost:3333";
  // useEffect(() => {
  //   socket.current = io(ENDPOINT, {
  //     transports: ["websocket", "polling", "flashsocket"],
  //   });
  // }, []);

  useEffect(() => {
    const fetchGetRoom = async () => {
      try {
        const res = await roomApi.getRoomAfterLoginClient();
        setRoomUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetRoom();
  }, []);
  useEffect(() => {
    const fetchGetMessage = async () => {
      try {
        const res = await messageApi.getMessage(roomUser[0]?._id);
        setArrayChat(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetMessage();
  }, [roomUser]);

  const chatHandler = (event) => {
    setEnteredChat(event.target.value);
    //enter gửi tin nhắn
    if (event.charCode === 13) {
      const newMessage = {
        sender: idLogin,
        type: "text",
        text: event.target.value,
        active: true,
        RoomId: roomUser[0]?._id,
      };
      console.log(newMessage);
      const fetchAddMessage = async () => {
        try {
          const res = await messageAdminAPI.AddMessage(newMessage);
          console.log(res.data);
          if (res.status === 200) {
            setEnteredChat("");
            const fetchGetMessage = async () => {
              try {
                const res = await messageApi.getMessage(roomUser[0]?._id);
                setArrayChat(res.data);
              } catch (error) {
                console.log(error);
              }
            };
            fetchGetMessage();
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAddMessage();
    }
  };
  const onEmojiClick = (event, emojiObject) => {
    setEnteredChat(enteredChat + emojiObject.emoji);
    setShowEmoji(!showEmoji);
  };
  const showEmojiHandler = () => {
    setShowEmoji(!showEmoji);
  };
  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const fileSelected = e.target.files[0];
    const fd = new FormData();
    fd.append("uploadFile", fileSelected);
    axios
      .post("//localhost:3333/products/addFile", fd)
      .then((res) => {
        const uploadFile = res.data.split(".");
        const filesTypes = uploadFile[uploadFile.length - 1];
        let newMessage;
        if (
          filesTypes === "png" ||
          filesTypes === "jpg" ||
          filesTypes === "gif" ||
          filesTypes === "jpeg"
        ) {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: roomUser[0]?._id,
            type: "img",
          };
        }
        const fetchAddMessage = async () => {
          try {
            const res = await messageAdminAPI.AddMessage(newMessage);
            console.log(res);
            setArrayChat((pre) => {
              return [...pre, res.data];
            });
          } catch (error) {
            console.log(error);
          }
        };
        fetchAddMessage();
      })
      .catch((aa) => {
        console.log("Khong Gui dc", aa);
      });
  };
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [, enteredChat, arrayChat]);
  useEffect(() => {
    // socket.current.on("send-message", (data) => {
    //   if (roomUser[0]?._id === data.RoomId) {
    //     setArrayChat((pre) => {
    //       return [...pre, data];
    //     });
    //   }
    // });
  }, [arrayChat]);
  return (
    <div className={style.frame_boxchat}>
      <div className={style.boxChat_top}>
        <div className={style.topName}>
          <div className={style.avatar}>
            <img src={aothuninhinh} alt="avatar" />
          </div>
          <div className={style.name}>
            <h2>aaa</h2>
          </div>
        </div>
      </div>
      <div className={style.boxChat_center}>
        <Scrollbars
          className={style["list-mess"]}
          id="style-2"
          renderTrackHorizontal={(props) => (
            <div
              {...props}
              style={{ display: "none" }}
              className="track-horizontal"
            />
          )}
        >
          {arrayChat?.map((data, index) => {
            return (
              <div
                ref={scrollRef}
                className={`${style.listChat} ${
                  data.sender === idLogin ? style.message_own : ""
                }`}
                key={index}
              >
                <ChatClient
                  // onSendSocketToChat={props.onSendSocketToBoxChat}
                  //   index={index}
                  // messages={messages}
                  data={data}
                  //   key={data._id}
                  own={data.sender === idLogin}
                />
              </div>
            );
          })}
        </Scrollbars>
        <div className={style.emoji}>
          {showEmoji && <Picker onEmojiClick={onEmojiClick} />}
        </div>
      </div>
      <div className={style.boxChat_bottom}>
        <div className={style.toolbar}>
          <i className="bi bi-image">
            <input type="file" onChange={fileUploadHandler} multiple />
          </i>
          {/* <i className="fab fa-waze" onClick={gifHandler}></i> */}
        </div>
        <div className={style["input-chat"]}>
          <input
            type="text"
            placeholder={`Nhập tin nhắn tới RUBIX`}
            onChange={chatHandler}
            value={enteredChat}
            onKeyPress={chatHandler}
          />
          {/* <i className="far fa-paper-plane" onClick={SendMessageHandler}></i> */}
          <i className="far fa-laugh-beam" onClick={showEmojiHandler}></i>
        </div>
      </div>
    </div>
  );
}

export default BoxChatClient;
