import classes from '../BoxChat.module.scss';
import { useContext, useState } from 'react';
import React, { useEffect } from 'react';
import { format } from 'timeago.js';
import { Fragment } from 'react';
// import FormViewImage from "./form-video/FormViewImage";
import moment from 'moment';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import userAdminApi from 'api/admin/userAdminApi';
import { GlobalContext } from 'store/store';
import { ACTIOS } from 'store/actions';

const Chat = (props) => {
  const [user, setUser] = useState(null);
  const [isOpenFormViewImage, setIsOpenFormViewImage] = useState(false);
  const [message, setMessage] = useState([]);
  const [dataTextForWard, setdatatTextFordWard] = useState(''); //lấy nội dung tin nhắn
  const [dataTypeForWard, setdatatTypeFordWard] = useState(''); //lấy type tin nhắn
  const [dataNameFileForWard, setdatatNameFileFordWard] = useState(''); //lấy type tin nhắn
  const loggedInUser = useSelector((state) => state.user.current);
  const avatar = loggedInUser.avatar;
  const { dispatch, state } = useContext(GlobalContext);

  const time = moment(props.data.createdAt);

  useEffect(() => {
    setMessage(props.data);
  }, [props.data]);
  useEffect(() => {
    const fetchRequestGetUserById = async () => {
      try {
        const requestGetUserById = await userAdminApi.getUserById(
          props.data?.sender
        );
        console.log(requestGetUserById);
        setUser(requestGetUserById.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetUserById();
  }, [props.data?.sender]);

  const uploadFile = props.data.text.split('.');
  const filesTypes = uploadFile[uploadFile.length - 1];

  // const viewImageHandler = () => {
  //   setIsOpenFormViewImage(true);
  // };
  // const falseFromViewImage = () => {
  //   setIsOpenFormViewImage(false);
  // };
  console.log(props.data);
  return (
    <Fragment>
      <div
        className={`${classes.container} ${
          props.own ? classes.message_own : ''
        }`}
      >
        {/* tin nhắn của bản thân */}
        {props.own && (
          <Fragment>
            <div className={`${classes.container_mess} `}>
              <div className={classes.message}>
                <div className={classes.messageTop}>
                  {message?.type === 'img' && message?.active ? (
                    <img
                      className={classes.messageImage}
                      alt=''
                      src={message?.text}
                      // onClick={viewImageHandler}
                    />
                  ) : message?.type === 'text' && message?.active ? (
                    <p className={classes.messageText}>{message?.text}</p>
                  ) : message?.type === 'gif' && message?.active ? (
                    <img
                      className={classes.messageImage}
                      alt=''
                      src={props.data.text}
                      // onClick={viewImageHandler}
                    />
                  ) : (
                    ''
                  )}
                </div>
                <div className={classes.messageBottom}>
                  <Moment format='HH:mm'>{time}</Moment>
                </div>
              </div>
            </div>
            <div className={classes.avatar}>
              <img src={loggedInUser.avatar} alt='avatar' />
            </div>
          </Fragment>
        )}
        {!props.own && (
          <Fragment>
            <div className={classes.avatar}>
              <img src={user?.avatar} alt='avatar' />
            </div>
            <div className={`${classes.container_mess} `}>
              <div className={classes.message}>
                <div className={classes.messageTop}>
                  <p className={classes.nameSender}>{user?.userName}</p>
                  {message?.type === 'img' && message?.active ? (
                    <img
                      className={classes.messageImage}
                      alt=''
                      src={message?.text}
                      // onClick={viewImageHandler}
                    />
                  ) : message?.type === 'text' && message?.active ? (
                    <p className={classes.messageText}>{message?.text}</p>
                  ) : message?.type === 'gif' && message?.active ? (
                    <img
                      className={classes.messageImage}
                      alt=''
                      src={props.data.text}
                      // onClick={viewImageHandler}
                    />
                  ) : null}
                </div>
                <div className={classes.messageBottom}>
                  <Moment format='HH:mm'>{time}</Moment>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>

      {/* <FormViewImage
        isOpenFormViewImage={isOpenFormViewImage}
        data={props.data}
        onFormFalse={falseFromViewImage}
        messages={props.messages}
        nameRoom={props.onSendNameRoomToChat}
      /> */}
    </Fragment>
  );
};

export default Chat;
