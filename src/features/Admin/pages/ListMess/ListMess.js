import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useContext, useEffect, useState } from "react";
import style from "./ListMess.module.scss";
import { Scrollbars } from "react-custom-scrollbars";
import Mess from "./Mess/Mess";
import BoxChat from "./BoxChat/BoxChat";
import roomAdminAPI from "api/admin/roomAdminAPI";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import { useSelector } from "react-redux";

function ListMess(props) {
  //   const [arrayMess, setArrayMess] = useState([]);
  const { dispatch, state } = useContext(GlobalContext);

  const [activeToggleMess, setActiveToggleMess] = useState({
    activeObject: null,
    objects: state.arrayMess,
  });
  const loggedInUser = useSelector((state) => state.user.current);
  const idLogin = loggedInUser?._id;

  useEffect(() => {
    const fetchGetRoomAfterLogin = async () => {
      try {
        const requestGetRoomAfterLogin = await roomAdminAPI.getRoomAfterLogin();
        console.log(requestGetRoomAfterLogin);
        dispatch({
          type: ACTIOS.arrayMess,
          payload: requestGetRoomAfterLogin.data,
        });
        setActiveToggleMess((pre) => {
          return { ...pre, objects: requestGetRoomAfterLogin.data };
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchGetRoomAfterLogin();
  }, []);

  return (
    <>
      <div className="d-flex wrap">
        <AsideAdmin />
        <div className={style.listmess_admin}>
          <div className={style.listmess_admin_frame}>
            <div className={style.title_add_listmess}>
              <span className={style.title_listmess}>
                Nhắn tin với người dùng
              </span>
            </div>
            <div className={style.list_mess}>
              <div className={`${style.list_mess_left}`}>
                <Scrollbars
                  style={{ height: "610px" }}
                  className={style["list-mess"]}
                  id="style-2"
                >
                  {state.arrayMess.map((data, index) => {
                    //console.log(Math.floor(Math.random() * 10000) + 100);
                    const toggleActive = (index) => {
                      setActiveToggleMess({
                        ...activeToggleMess,
                        activeObject: activeToggleMess.objects[index],
                      });
                    };
                    const toggleActiveStyle = (index) => {
                      if (
                        activeToggleMess.objects[index] ===
                        activeToggleMess.activeObject
                      ) {
                        return style.activeToggleMess;
                      } else {
                        return style.inactiveToggleMess;
                      }
                    };
                    const inActiveMess = (e) => {
                      toggleActive(index);
                    };

                    return (
                      <div
                        className={`${style.messParent} ${toggleActiveStyle(
                          index
                        )}`}
                        onClick={inActiveMess}
                        key={data._id}
                      >
                        <Mess
                          // socket={props.onSendSocketToListMess}
                          data={data}
                          idLogin={idLogin}
                          // index={index}
                          // onSendListMess={onReceiveFromMess}
                          // onNameMess={props.onNameMess}
                        />
                      </div>
                    );
                  })}
                </Scrollbars>
              </div>
              <BoxChat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListMess;
