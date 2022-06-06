import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import { Button, makeStyles } from "@material-ui/core";

import React, { useContext, useEffect, useState } from "react";
import style from "./ListShipperAdmin.module.scss";
import { useNavigate } from "react-router-dom";
import userAdminApi from "api/admin/userAdminApi";
import ItemShipper from "./ItemShipper/ItemShipper";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import { Pagination } from "@material-ui/lab";
import FormAddShipper from "../FormAddShipper/FormAddShipper";
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
function ListShipperAdmin(props) {
  const classes = useStyles();
  const { dispatch, state } = useContext(GlobalContext);
  const [isForm, setIsForm] = useState(false);
  const handleShowFormAdd = () => {
    setIsForm(true);
  };
  const formfalseHandler = (falseFromForm) => {
    setIsForm(falseFromForm);
  };

  const [pagination, setPagination] = useState({
    limit: 2,
    total: 10,
    page: 1,
  });
  useEffect(() => {
    const fetchRequestGetAllShipper = async () => {
      try {
        const requestGetAllShipper = await userAdminApi.getAllShipper(
          state.filterPaginationAllUser._page,
          state.filterPaginationAllUser._limit,
          "shipper"
        );

        dispatch({
          type: ACTIOS.dataAllShipper,
          payload: requestGetAllShipper.data.users,
        });
        setPagination(requestGetAllShipper.pagination);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllShipper();
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
  };
  const handleSearchName = (e) => {
    setName(e.target.value);
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
          type: ACTIOS.dataAllShipper,
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
              type: ACTIOS.dataAllShipper,
              payload: requestGetUserByPhone.data,
            });
            setLoadingSearch(false);
          } else {
            const fetchRequestGetAllShipper = async () => {
              try {
                const requestGetAllShipper = await userAdminApi.getAllShipper(
                  state.filterPaginationAllUser._page,
                  state.filterPaginationAllUser._limit,
                  "shipper"
                );

                dispatch({
                  type: ACTIOS.dataAllShipper,
                  payload: requestGetAllShipper.data.users,
                });
                setPagination(requestGetAllShipper.pagination);
              } catch (error) {
                console.log(error);
              }
            };
            fetchRequestGetAllShipper();
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
    const fetchRequestGetAllShipper = async () => {
      try {
        const requestGetAllShipper = await userAdminApi.getAllShipper(
          state.filterPaginationAllUser._page,
          state.filterPaginationAllUser._limit,
          "shipper"
        );

        dispatch({
          type: ACTIOS.dataAllShipper,
          payload: requestGetAllShipper.data.users,
        });
        setLoadingAll(false);

        setPagination(requestGetAllShipper.pagination);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllShipper();
  };
  return (
    <>
      <div className="d-flex wrap">
        <AsideAdmin />
        <div className={style.listshipper_admin}>
          <div className={style.listshipper_admin_frame}>
            <div className={style.title_add_listshipper}>
              <span className={style.title_listshipper}>
                Danh sách người giao hàng ({pagination.total} người)
              </span>
              <span
                className={`${style.add_shipper} d-flex align-items-center`}
                onClick={handleShowFormAdd}
              >
                <i
                  class="fas fa-plus-circle"
                  style={{ marginRight: "10px" }}
                ></i>{" "}
                Thêm người giao hàng
              </span>
            </div>
            <div
              className={`${style.searchlistshipper} d-flex align-items-center`}
            >
              <div className={` d-flex align-items-center`}>
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
                        <i
                          class="fas fa-search"
                          style={{ marginRight: "5px" }}
                        ></i>
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
                        <i
                          class="fas fa-gift"
                          style={{ marginRight: "10px" }}
                        ></i>
                        Hiển thị toàn bộ
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <div className={style.listshipper}>
              <div className={style.title_item_user}>
                <span className={style.title_image_item}>Hình ảnh</span>
                <span
                  className={`${style.title_name_item}  d-flex justify-content-center`}
                >
                  Tên người giao hàng
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
                {state.dataAllShipper?.map((data, idx) => {
                  return (
                    <div key={idx}>
                      <ItemShipper data={data} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className={`${style.pagination} d-flex justify-content-center`}
            >
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
      <FormAddShipper isForm={isForm} onFormFalse={formfalseHandler} />
    </>
  );
}

export default ListShipperAdmin;
