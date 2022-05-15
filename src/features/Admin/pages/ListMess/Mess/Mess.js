import style from "../ListMess.module.scss";
import { useContext, useState } from "react";
import React, { Fragment, useEffect } from "react";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import messageAdminAPI from "api/admin/messageAdminAPI";
import userAdminApi from "api/admin/userAdminApi";

// import messageAPI from "../../api/messageAPI";
// import moment from "moment";
// import Moment from "react-moment";
import { format, register } from "timeago.js";
// import "moment/locale/vi";
import config from "config/config";

const Mess = (props) => {
  const [user, setUser] = useState(null);
  const [userLastMess, setUserLastMess] = useState(null);

  const [messages, setMessages] = useState([]);
  const [lastMess, setLastMess] = useState("");
  const [nameSender, setNameSender] = useState("");
  const { dispatch, state } = useContext(GlobalContext);

  // register your locale with timeago
  register("my-locale", config);

  const isChatHandler = (e) => {
    dispatch({
      type: ACTIOS.dataBoxChat,
      payload: {
        room: props.data,
      },
    });
    //Đã xem(true) và chưa xem(false)
    const ReadMessage = async () => {
      try {
        const ReadMessageAPI = await messageAdminAPI.readMessage(lastMess?._id);
        if (ReadMessageAPI.status === 200) {
          setLastMess(ReadMessageAPI.data);
          //console.log(cancelMess.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    ReadMessage();
  };
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await messageAdminAPI.GetMessage({
          idRoom: props.data._id,
        });
        setLastMess(res.data.pop());
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, [props.onSendRoomToBoxChat]);
  const time = format(lastMess?.createdAt, "my-locale");
  //Lay nguoi gui tin nhan cuoi cung
  useEffect(() => {
    const fetchRequestGetUserById = async () => {
      try {
        const requestGetUserById = await userAdminApi.getUserById(
          lastMess?.sender
        );
        setUserLastMess(requestGetUserById.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetUserById();
  }, [lastMess]);
  return (
    <div
      className={`${style.mess}`}
      //key={user?._id}
      data-id={props.data._id}
      onClick={isChatHandler}
    >
      <div className={style.avatar}>
        <img src={props.data?.avatar} alt="" />
      </div>
      <div className={style.background_name_lasttext}>
        <div className={style.name}>
          {lastMess?.readMessage ? (
            <p>{props.data?.name}</p>
          ) : (
            <p className={style.unreadMessage}>{props.data?.name}</p>
          )}

          <p className={style.timeago}>{time}</p>
        </div>

        <div className={style.Lasttext}>
          {/* Là mình */}
          {props.idLogin === lastMess?.sender && lastMess?.type === "img" && (
            <p>
              <p>
                Bạn: <i className="far fa-image"></i> Hình ảnh
              </p>
            </p>
          )}
          {props.idLogin === lastMess?.sender && lastMess?.type === "text" && (
            <p>
              <p>Bạn: {lastMess?.text}</p>
            </p>
          )}
          {props.idLogin === lastMess?.sender && lastMess?.type === "gif" && (
            <p>
              <p>
                Bạn: <i className="fab fa-waze"></i> GIF
              </p>
            </p>
          )}
          {/* Nếu không phải là mình */}
          {props.idLogin !== lastMess?.sender && lastMess?.type === "img" && (
            <p>
              {lastMess?.readMessage ? (
                <p>
                  {userLastMess.userName}: <i className="far fa-image"></i> Hình
                  ảnh
                </p>
              ) : (
                <Fragment>
                  <p className={style.unreadMessage}>
                    {nameSender}: <i className="far fa-image"></i> Hình ảnh
                  </p>
                  <div className={style.signalUnreadMessage}>
                    <span>!</span>
                  </div>
                </Fragment>
              )}
            </p>
          )}
          {props.idLogin !== lastMess?.sender && lastMess?.type === "text" && (
            <p>
              {lastMess?.readMessage ? (
                <p>
                  {userLastMess?.userName}: {lastMess?.text}
                </p>
              ) : (
                <Fragment>
                  <p className={style.unreadMessage}>
                    {userLastMess?.userName}: {lastMess?.text}
                  </p>
                  <div className={style.signalUnreadMessage}>
                    <span>!</span>
                  </div>
                </Fragment>
              )}
            </p>
          )}
          {props.idLogin !== lastMess?.sender && lastMess?.type === "gif" && (
            <p>
              {lastMess?.readMessage ? (
                <p>
                  {userLastMess?.userName}: <i className="fab fa-waze"></i> GIF
                </p>
              ) : (
                <Fragment>
                  <p className={style.unreadMessage}>
                    {userLastMess?.userName}: <i className="fab fa-waze"></i>{" "}
                    GIF
                  </p>
                  <div className={style.signalUnreadMessage}>
                    <span>!</span>
                  </div>
                </Fragment>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mess;
