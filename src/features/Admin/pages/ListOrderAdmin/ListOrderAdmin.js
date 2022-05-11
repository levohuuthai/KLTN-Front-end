import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useContext, useEffect, useState } from "react";
import ItemOrderAdmin from "./ItemOrderAdmin/ItemOrderAdmin";
import style from "./ListOrderAdmin.module.scss";
import orderAdminApi from "api/admin/orderAdminApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  ul: {
    "& .MuiPaginationItem-page.Mui-selected": {
      background: "#ba933e",
      color: "#fff",
    },
  },
}));
function ListOrderAdmin(props) {
  const classes = useStyles();
  const [phone, setPhone] = useState("");
  const [idOrder, setIdOrder] = useState("");
  const { dispatch, state } = useContext(GlobalContext);
  const [pagination, setPagination] = useState({
    limit: 2,
    total: 10,
    page: 1,
  });
  useEffect(() => {
    const fetchRequestGetAllOrder = async () => {
      try {
        const requestGetAllOrder = await orderAdminApi.getAllOrder(
          state.filterPaginationAllOrder._page,
          state.filterPaginationAllOrder._limit
        );
        setPagination(requestGetAllOrder.pagination);
        dispatch({
          type: ACTIOS.dataAllOrder,
          payload: requestGetAllOrder.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllOrder();
  }, [
    state.filterPaginationAllOrder._page,
    state.filterPaginationAllOrder._limit,
  ]);

  const handleSearchIdOrder = (e) => {
    setIdOrder(e.target.value);
    const fetchRequestGetOrderById = async () => {
      try {
        const requestGetOrderById = await orderAdminApi.getOrderById(
          e.target.value
        );
        console.log(requestGetOrderById);
        // if (requestGetUserByName.data.users.length !== 0) {
        //   dispatch({
        //     type: ACTIOS.dataAllUser,
        //     payload: requestGetUserByName.data.users,
        //   });
        // } else {
        //   const fetchRequestGetAllOrder = async () => {
        //     try {
        //       const requestGetAllOrder = await orderAdminApi.getAllOrder(
        //         state.filterPaginationAllOrder._page,
        //         state.filterPaginationAllOrder._limit
        //       );
        //       setPagination(requestGetAllOrder.pagination);
        //       dispatch({
        //         type: ACTIOS.dataAllOrder,
        //         payload: requestGetAllOrder.data,
        //       });
        //     } catch (error) {
        //       console.log(error);
        //     }
        //   };
        //   fetchRequestGetAllOrder();
        // }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetOrderById();
  };
  const handleSearchPhone = (e) => {
    setPhone(e.target.value);
    const fetchRequestGetOrderByPhone = async () => {
      try {
        const requestGetOrderByPhone = await orderAdminApi.getOrderByPhone(
          e.target.value
        );
        // console.log(requestGetOrderByPhone.status === 200);
        if (requestGetOrderByPhone.status === 200) {
          dispatch({
            type: ACTIOS.dataAllOrder,
            payload: requestGetOrderByPhone.data,
          });
        }
      } catch (error) {
        console.log(error);
        const fetchRequestGetAllOrder = async () => {
          try {
            const requestGetAllOrder = await orderAdminApi.getAllOrder(
              state.filterPaginationAllOrder._page,
              state.filterPaginationAllOrder._limit
            );
            setPagination(requestGetAllOrder.pagination);
            dispatch({
              type: ACTIOS.dataAllOrder,
              payload: requestGetAllOrder.data,
            });
          } catch (error) {
            console.log(error);
          }
        };
        fetchRequestGetAllOrder();
      }
    };
    fetchRequestGetOrderByPhone();
  };
  const handlePageChange = (e, page) => {
    dispatch({
      type: ACTIOS.filterPaginationAllOrder,
      payload: { _limit: 2, _page: page },
    });
  };
  const [dayFilter, setDayFilter] = useState("");

  const handleFilter = (e) => {
    setDayFilter(e.target.value);
    const fetchRequestGetAllOrder = async () => {
      try {
        const requestGetAllOrder = await orderAdminApi.getAllOrder(
          state.filterPaginationAllOrder._page,
          state.filterPaginationAllOrder._limit,
          e.target.value,
          e.target.value
        );
        console.log(requestGetAllOrder);
        setPagination(requestGetAllOrder.pagination);
        dispatch({
          type: ACTIOS.dataAllOrder,
          payload: requestGetAllOrder.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllOrder();
  };

  return (
    <div className="d-flex wrap">
      <AsideAdmin />
      <div className={style.listorder_admin}>
        <div className={style.listorder_admin_frame}>
          <div className={style.title_add_listorder}>
            <span className={style.title_listorder}>
              Danh sách hóa đơn (5 hóa đơn)
            </span>
          </div>
          <div className={`${style.searchListorder} d-flex `}>
            <div className={`${style.searchIdOrder} d-flex flex-column`}>
              <h6> Lọc theo mã đơn hàng</h6>
              <input
                type="text"
                className={style.idOrder}
                placeholder="Nhập mã đơn hàng"
                onChange={handleSearchIdOrder}
                value={idOrder}
              ></input>
            </div>
            <div className={`${style.searchPhoneorder} d-flex flex-column`}>
              <h6> Lọc theo số điện thoại</h6>
              <input
                type="text"
                className={style.phoneorder}
                placeholder="Nhập số điện thoại"
                onChange={handleSearchPhone}
                value={phone}
              ></input>
            </div>
            <div className={`${style.filterOrder} d-flex flex-column`}>
              <h6> Sắp xếp theo</h6>
              <FormControl
                variant="outlined"
                name="size"
                style={{
                  width: "150%",
                  paddingTop: "-20px",
                }}
              >
                <InputLabel
                  id="demo-simple-select-autowidth-label"
                  style={{
                    marginTop: "-5px",
                  }}
                >
                  Chọn sắp xếp
                </InputLabel>
                <Select
                  name="size"
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={dayFilter}
                  // error={!!size.errorSize}
                  onChange={handleFilter}
                  label="Chọn sắp xếp"
                  style={{
                    height: "82%",
                  }}
                >
                  <MenuItem value="AZ">Ngày: Mới nhất </MenuItem>
                  <MenuItem value="ZA">Ngày: Cũ nhất</MenuItem>
                  <MenuItem value="AZ">Tổng tiền: Tăng dần</MenuItem>
                  <MenuItem value="ZA">Tổng tiền: Giảm dần</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={style.listorder}>
            <div className={style.title_item_order}>
              <span
                className={`${style.title_id}  d-flex justify-content-center`}
              >
                Mã đơn hàng
              </span>
              <span
                className={`${style.title_nameuser} d-flex justify-content-center`}
              >
                Số điện thoại
              </span>
              <span
                className={`${style.title_total_money} d-flex justify-content-center`}
              >
                <span>Tổng tiền</span>
              </span>
              <span
                className={`${style.title_create_date} d-flex justify-content-center`}
              >
                <span>Ngày tạo</span>
              </span>
              <span
                className={`${style.title_stateorder} d-flex justify-content-center`}
              >
                Trạng thái
              </span>
              <span
                className={`${style.title_close} d-flex justify-content-center`}
              >
                <i className="fas fa-ellipsis-h"></i>
              </span>
            </div>
            <div className={`${style.list_item_order}`}>
              {state.dataAllOrder?.map((data, idx) => {
                return (
                  <div key={idx}>
                    <ItemOrderAdmin data={data} idx={idx} />
                  </div>
                );
              })}
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
    </div>
  );
}

export default ListOrderAdmin;
