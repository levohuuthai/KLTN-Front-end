import BoxChatClient from 'components/BoxChatClient/BoxChatClient';
import React, { useEffect, useRef, useState } from 'react';
import style from './Chat.module.scss';
import io from 'socket.io-client';
import { useContext } from 'react';
import { format } from 'timeago.js';
import { Fragment } from 'react';
// import FormViewImage from "./form-video/FormViewImage";
import moment from 'moment';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import userAdminApi from '../../api/admin/userAdminApi';
import { GlobalContext } from 'store/store';
import { ACTIOS } from 'store/actions';
function Chat(props) {
  const [activeBoxChat, setActiveBoxChat] = useState();
  const showBoxChat = () => {
    setActiveBoxChat(!activeBoxChat);
  };
  return (
    <>
      <div className={style.chat} onClick={showBoxChat}>
        <i class='fas fa-comment'></i>
      </div>
      {activeBoxChat ? <BoxChatClient /> : ''}
    </>
  );
}

export default Chat;
