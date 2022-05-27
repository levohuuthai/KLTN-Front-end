import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import { Button, makeStyles } from "@material-ui/core";

import React, { useContext, useEffect, useState } from "react";
import style from "./ListUserAdmin.module.scss";
import { useNavigate } from "react-router-dom";
import userAdminApi from "api/admin/userAdminApi";
import ItemUserAdmin from "./ItemUserAdmin/ItemUserAdmin";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import { Pagination } from "@material-ui/lab";
const useStyles = makeStyles((theme) => ({
  ul: {
    "& .MuiPaginationItem-root": {
      // color: "#ba933e",
      // background: "#ba933e",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      background: "#ba933e",
      color: "#fff",
    },
  },
  search: {
    background: "black",
    width: "100px",
    height: "40px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "25px",
    marginLeft: "20px",
    fontSize: "15px",
    fontWeight: "500",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
  searchAll: {
    background: "black",
    width: "200px",
    height: "40px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "25px",
    marginLeft: "420px",
    fontSize: "15px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
}));
function ListUserAdmin(props) {
  const classes = useStyles();
  const { dispatch, state } = useContext(GlobalContext);

  const [pagination, setPagination] = useState({
    limit: 2,
    total: 10,
    page: 1,
  });
  useEffect(() => {
    const fetchRequestGetAllUser = async () => {
      try {
        const requestGetAllUser = await userAdminApi.getAllUser(
          state.filterPaginationAllUser._page,
          state.filterPaginationAllUser._limit
        );

        dispatch({
          type: ACTIOS.dataAllUser,
          payload: requestGetAllUser.data.users,
        });
        setPagination(requestGetAllUser.pagination);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllUser();
  }, [
    state.filterPaginationAllUser._page,
    state.filterPaginationAllUser._limit,
  ]);
  const handlePageChange = (e, page) => {
    dispatch({
      type: ACTIOS.filterPaginationAllUser,
      payload: { _limit: 10, _page: page },
    });
  };
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleSearchPhone = (e) => {
    setPhone(e.target.value);
    // const fetchRequestGetUserByPhone = async () => {
    //   try {
    //     const requestGetUserByPhone = await userAdminApi.getUserByPhone(
    //       e.target.value
    //       // state.filterPagination._page,
    //       // state.filterPagination._limit
    //     );
    //     if (requestGetUserByPhone.data.length !== 0) {
    //       dispatch({
    //         type: ACTIOS.dataAllUser,
    //         payload: requestGetUserByPhone.data,
    //       });
    //     } else {
    //       const fetchRequestGetAllUser = async () => {
    //         try {
    //           const requestGetAllUser = await userAdminApi.getAllUser(
    //             state.filterPaginationAllUser._page,
    //             state.filterPaginationAllUser._limit
    //           );

    //           dispatch({
    //             type: ACTIOS.dataAllUser,
    //             payload: requestGetAllUser.data.users,
    //           });
    //           setPagination(requestGetAllUser.pagination);
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       };
    //       fetchRequestGetAllUser();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchRequestGetUserByPhone();
  };
  const handleSearchName = (e) => {
    setName(e.target.value);
    // const fetchRequestGetUserByName = async () => {
    //   try {
    //     const requestGetUserByName = await userAdminApi.getUserByName(
    //       e.target.value,
    //       state.filterPaginationAllUser._page,
    //       state.filterPaginationAllUser._limit
    //     );
    //     console.log(requestGetUserByName);
    //     if (requestGetUserByName.data.users.length !== 0) {
    //       dispatch({
    //         type: ACTIOS.dataAllUser,
    //         payload: requestGetUserByName.data.users,
    //       });
    //     } else {
    //       const fetchRequestGetAllUser = async () => {
    //         try {
    //           const requestGetAllUser = await userAdminApi.getAllUser(
    //             state.filterPaginationAllUser._page,
    //             state.filterPaginationAllUser._limit
    //           );

    //           dispatch({
    //             type: ACTIOS.dataAllUser,
    //             payload: requestGetAllUser.data.users,
    //           });
    //           setPagination(requestGetAllUser.pagination);
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       };
    //       fetchRequestGetAllUser();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchRequestGetUserByName();
  };
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleSearch = () => {
    setLoadingSearch(true);
    const fetchRequestGetUserByName = async () => {
      try {
        const requestGetUserByName = await userAdminApi.getUserByName(
          name,
          state.filterPaginationAllUser._page,
          state.filterPaginationAllUser._limit
        );
        dispatch({
          type: ACTIOS.dataAllUser,
          payload: requestGetUserByName.data.users,
        });
        setLoadingSearch(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetUserByName();
    if (name === "") {
      const fetchRequestGetUserByPhone = async () => {
        try {
          const requestGetUserByPhone = await userAdminApi.getUserByPhone(
            phone
          );
          console.log(requestGetUserByPhone);
          if (requestGetUserByPhone.data.length !== 0) {
            dispatch({
              type: ACTIOS.dataAllUser,
              payload: requestGetUserByPhone.data,
            });
            setLoadingSearch(false);
          } else {
            const fetchRequestGetAllUser = async () => {
              try {
                const requestGetAllUser = await userAdminApi.getAllUser(
                  state.filterPaginationAllUser._page,
                  state.filterPaginationAllUser._limit
                );

                dispatch({
                  type: ACTIOS.dataAllUser,
                  payload: requestGetAllUser.data.users,
                });
                setPagination(requestGetAllUser.pagination);
                setLoadingSearch(false);
              } catch (error) {
                console.log(error);
              }
            };
            fetchRequestGetAllUser();
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetUserByPhone();
    }
  };
  const [loadingAll, setLoadingAll] = useState(false);
  const handleLoadingAll = () => {
    setLoadingAll(true);
    const fetchRequestGetAllUser = async () => {
      try {
        const requestGetAllUser = await userAdminApi.getAllUser(
          state.filterPaginationAllUser._page,
          state.filterPaginationAllUser._limit
        );

        dispatch({
          type: ACTIOS.dataAllUser,
          payload: requestGetAllUser.data.users,
        });
        setPagination(requestGetAllUser.pagination);
        setLoadingAll(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllUser();
  };
  return (
    <div className="d-flex wrap">
      <AsideAdmin />
      <div className={style.listuser_admin}>
        <div className={style.listuser_admin_frame}>
          <div className={style.title_add_listuser}>
            <span className={style.title_listuser}>
              Danh sách người dùng ({pagination.total} người dùng)
            </span>
          </div>
          <div className={`${style.searchListUser} d-flex align-items-center`}>
            <div className={`${style.searchPhoneUser} d-flex flex-column`}>
              <h6> Lọc theo số điện thoại</h6>
              <input
                type="text"
                className={style.phoneUser}
                placeholder="Nhập số điện thoại"
                onChange={handleSearchPhone}
                value={phone}
              ></input>
            </div>
            <div className={`${style.searchNameUser} d-flex flex-column`}>
              <h6> Lọc theo tên</h6>
              <input
                type="text"
                className={style.nameUser}
                placeholder="Nhập tên"
                onChange={handleSearchName}
                value={name}
              ></input>
            </div>{" "}
            <div>
              <Button
                type="submit"
                className={classes.search}
                onClick={handleSearch}
              >
                {loadingSearch ? (
                  <div
                    class="spinner-border"
                    role="status"
                    style={{ width: "22px", height: "22px" }}
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
                    <i class="fas fa-search" style={{ marginRight: "5px" }}></i>
                    Tìm
                  </>
                )}
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                className={classes.searchAll}
                onClick={handleLoadingAll}
              >
                {loadingAll ? (
                  <div
                    class="spinner-border"
                    role="status"
                    style={{ width: "22px", height: "22px" }}
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
                    <i class="fas fa-gift" style={{ marginRight: "10px" }}></i>
                    Hiển thị toàn bộ
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className={style.listuser}>
            <div className={style.title_item_user}>
              <span className={style.title_image_item}>Hình ảnh</span>
              <span
                className={`${style.title_name_item}  d-flex justify-content-center`}
              >
                Tên người dùng
              </span>
              <span
                className={`${style.title_phone} d-flex justify-content-center`}
              >
                Số điện thoại
              </span>
              <span
                className={`${style.title_create_date} d-flex justify-content-center`}
              >
                <span>Ngày tạo</span>
              </span>

              <span
                className={`${style.title_close} d-flex justify-content-center`}
              >
                <i className="fas fa-ellipsis-h"></i>
              </span>
            </div>
            <div className={`${style.list_item_user}`}>
              {state.dataAllUser?.map((data, idx) => {
                return (
                  <div key={idx}>
                    <ItemUserAdmin data={data} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={`${style.pagination} d-flex justify-content-center`}>
            <Pagination
              classes={{ ul: classes.ul }}
              count={Math.ceil(pagination?.total / pagination.limit)}
              page={pagination?.page}
              onChange={handlePageChange}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListUserAdmin;
