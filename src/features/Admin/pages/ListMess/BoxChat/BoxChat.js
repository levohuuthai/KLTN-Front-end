import React, { Fragment, useContext, useEffect } from 'react';
import classes from './BoxChat.module.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import Picker from 'emoji-picker-react';
import { Scrollbars } from 'react-custom-scrollbars';
import { GlobalContext } from 'store/store';
import { ACTIOS } from 'store/actions';
import messageAdminAPI from 'api/admin/messageAdminAPI';
import Chat from './Chat/Chat';
import axios from 'axios';
import io from 'socket.io-client';
import logoRubic from 'assets/images/logoRubic.png';

const BoxChat = (props) => {
  const [enteredChat, setEnteredChat] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const loggedInUser = useSelector((state) => state.user.current);
  const idLogin = loggedInUser?._id;
  const { dispatch, state } = useContext(GlobalContext);
  //socket
  const socket = useRef();
  const ENDPOINT = 'hientranbackend22.tk';
  useEffect(() => {
    socket.current = io(ENDPOINT, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
  }, []);

  const chatHandler = (event) => {
    setEnteredChat(event.target.value);
    //enter gửi tin nhắn
    if (event.charCode === 13) {
      const newMessage = {
        sender: idLogin,
        type: 'text',
        text: event.target.value,
        active: true,
        RoomId: state.dataBoxChat.room?._id,
      };
      console.log(newMessage);
      const fetchAddMessage = async () => {
        try {
          const res = await messageAdminAPI.AddMessage(newMessage);
          console.log(res.data);
          dispatch({
            type: ACTIOS.arrayChat,
            payload: [...state.arrayChat, res.data],
          });
          setEnteredChat('');
          // setShowEmoji(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAddMessage();
    }
  };
  const SendMessageHandler = async (e) => {
    e.preventDefault();
    const newMessage = {
      sender: idLogin,
      type: 'text',
      text: enteredChat,
      active: true,
      RoomId: state.dataBoxChat.room?._id,
    };
    const fetchAddMessage = async () => {
      try {
        const res = await messageAdminAPI.AddMessage(newMessage);
        console.log(res.data);
        dispatch({
          type: ACTIOS.arrayChat,
          payload: [...state.arrayChat, res.data],
        });
        setEnteredChat('');
        // setShowEmoji(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddMessage();
  };

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await messageAdminAPI.GetMessage({
          idRoom: state.dataBoxChat?.room?._id,
        });
        dispatch({
          type: ACTIOS.arrayChat,
          payload: res.data,
        });
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.dataBoxChat]);

  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    socket.current.on('send-message', (data) => {
      if (state.dataBoxChat?.room?._id === data.RoomId) {
        setArrivalMessage({
          sender: data.sender,
          type: data.type,
          text: data.text,
          active: data.active,
          createdAt: Date.now(),
        });
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.dataBoxChat]);

  useEffect(() => {
    arrivalMessage &&
      dispatch({
        type: ACTIOS.arrayChat,
        payload: [...state.arrayChat, arrivalMessage],
      });
    // }
  }, [arrivalMessage]);

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [enteredChat, state.arrayChat]);

  const onEmojiClick = (event, emojiObject) => {
    setEnteredChat(enteredChat + emojiObject.emoji);
  };

  const showEmojiHandler = () => {
    setShowEmoji(!showEmoji);
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const fileSelected = e.target.files[0];
    const fd = new FormData();
    fd.append('uploadFile', fileSelected);
    axios
      .post('//hientranbackend22.tk/products/addFile', fd)
      .then((res) => {
        console.log(res.data);
        // if();
        const uploadFile = res.data.split('.');
        const filesTypes = uploadFile[uploadFile.length - 1];
        let newMessage;
        if (
          filesTypes === 'png' ||
          filesTypes === 'jpg' ||
          filesTypes === 'gif' ||
          filesTypes === 'jpeg'
        ) {
          newMessage = {
            sender: idLogin,
            text: res.data,
            RoomId: state.dataBoxChat.room?._id,
            type: 'img',
          };
        }
        const fetchAddMessage = async () => {
          try {
            const res = await messageAdminAPI.AddMessage(newMessage);
            console.log(res);
            dispatch({
              type: ACTIOS.arrayChat,
              payload: [...state.arrayChat, res.data],
            });
          } catch (error) {
            console.log(error);
          }
        };
        fetchAddMessage();
      })
      .catch((aa) => {
        console.log('Khong Gui dc', aa);
      });
  };
  // console.log(state.dataBoxChat);
  // console.log(JSON.stringify(state.dataBoxChat) === "{}" ? "rong" : "haha");
  return (
    <Fragment>
      {JSON.stringify(state.dataBoxChat) === '{}' ? (
        <div className={`${classes.second} `}>
          <div
            className='d-flex justify-content-center'
            style={{ width: '100%', height: '100%' }}
          >
            <span className={classes.img_rubix}>
              <span className={classes.chatvoi}>CHAT VỚI </span>{' '}
              <img src={logoRubic} alt='' />
            </span>
          </div>
        </div>
      ) : (
        <div className={classes.second}>
          <div className={`${classes.secondLeft} `}>
            <div className={classes['top-right']}>
              <div className={classes.topName}>
                <div className={classes.avatar}>
                  <img src={state.dataBoxChat.room?.avatar} alt='' />
                </div>
                <div className={classes.name}>
                  <h2>{state.dataBoxChat.room?.name}</h2>
                </div>
              </div>
            </div>
            <div className={`${classes['center-right']}`}>
              <Scrollbars
                // style={{ height: "610px" }}
                className={classes['list-mess']}
                id='style-2'
                renderTrackHorizontal={(props) => (
                  <div
                    {...props}
                    style={{ display: 'none' }}
                    className='track-horizontal'
                  />
                )}
              >
                {state.arrayChat?.map((data, index) => {
                  return (
                    <div
                      ref={scrollRef}
                      className={`${classes.listChat} ${
                        data.sender === idLogin ? classes.message_own : ''
                      }`}
                      key={index}
                    >
                      <Chat
                        // onSendSocketToChat={props.onSendSocketToBoxChat}
                        index={index}
                        // messages={messages}
                        data={data}
                        key={data._id}
                        own={data.sender === idLogin}
                      />
                    </div>
                  );
                })}
              </Scrollbars>
              <div className={classes.emoji}>
                {showEmoji && <Picker onEmojiClick={onEmojiClick} />}
              </div>
            </div>
            <div className={classes['botom-right']}>
              <div className={classes.toolbar}>
                <i className='bi bi-image'>
                  <input type='file' onChange={fileUploadHandler} multiple />
                </i>
                {/* <i className="fab fa-waze" onClick={gifHandler}></i> */}
              </div>
              <div className={classes['input-chat']}>
                <input
                  type='text'
                  placeholder={
                    `Nhập tin nhắn tới ` + state.dataBoxChat.room?.name
                  }
                  onChange={chatHandler}
                  value={enteredChat}
                  onKeyPress={chatHandler}
                />
                <i
                  className='far fa-paper-plane'
                  onClick={SendMessageHandler}
                ></i>
                <i className='far fa-laugh-beam' onClick={showEmojiHandler}></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default BoxChat;
