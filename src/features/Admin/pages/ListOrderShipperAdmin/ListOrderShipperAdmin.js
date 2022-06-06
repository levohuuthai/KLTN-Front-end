import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useContext, useEffect, useState } from "react";
import ItemShipperOrderAdmin from "./ItemShipperOrderAdmin/ItemShipperOrderAdmin";
import style from "./ListOrderShipperAdmin.module.scss";
import orderAdminApi from "api/admin/orderAdminApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import { Pagination } from "@material-ui/lab";
import { Button, makeStyles } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  ul: {
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
    marginTop: "30px",
    marginLeft: "0px",
    fontSize: "15px",
    fontWeight: "500",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
}));
function ListOrderShipperAdmin(props) {
  const classes = useStyles();
  const loggedInUser = useSelector((state) => state.user.current);
  const [phone, setPhone] = useState("");
  const [idOrder, setIdOrder] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const { dispatch, state } = useContext(GlobalContext);
  const [pagination, setPagination] = useState({
    limit: 10,
    total: 10,
    page: 1,
  });
  const [dayFilter, setDayFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Đang Giao Hàng");
  useEffect(() => {
    const fetchRequestGetAllOrder = async () => {
      try {
        const requestGetAllOrder = await orderAdminApi.getAllOrderShipper(
          state.filterPaginationAllOrder._page,
          state.filterPaginationAllOrder._limit,
          "",
          "",
          statusFilter,
          loggedInUser._id
        );
        dispatch({
          type: ACTIOS.dataAllOrderShipper,
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
  };
  const handleSearchPhone = (e) => {
    setPhone(e.target.value);
  };
  const handlePageChange = (e, page) => {
    dispatch({
      type: ACTIOS.filterPaginationAllOrder,
      payload: { _limit: 10, _page: page },
    });
  };

  const handleFilter = (e) => {
    setDayFilter(e.target.value);
    const fetchRequestGetAllOrder = async () => {
      try {
        const requestGetAllOrder = await orderAdminApi.getAllOrderShipper(
          state.filterPaginationAllOrder._page,
          state.filterPaginationAllOrder._limit,
          e.target.value,
          e.target.value,
          statusFilter,
          loggedInUser._id
        );
        console.log(requestGetAllOrder);
        setPagination(requestGetAllOrder.pagination);
        dispatch({
          type: ACTIOS.dataAllOrderShipper,
          payload: requestGetAllOrder.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllOrder();
  };
  const handleFilterStatus = (e) => {
    setStatusFilter(e.target.value);
    const fetchRequestGetAllOrder = async () => {
      try {
        const requestGetAllOrder = await orderAdminApi.getAllOrderShipper(
          state.filterPaginationAllOrder._page,
          state.filterPaginationAllOrder._limit,
          dayFilter,
          dayFilter,
          e.target.value,
          loggedInUser._id
        );
        console.log(requestGetAllOrder);
        setPagination(requestGetAllOrder.pagination);
        dispatch({
          type: ACTIOS.dataAllOrderShipper,
          payload: requestGetAllOrder.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllOrder();
  };
  const handleSearch = () => {
    setLoadingSearch(true);

    // const fetchRequestGetOrderById = async () => {
    //   try {
    //     const requestGetOrderById = await orderAdminApi.getOrderById(idOrder);
    //     console.log(requestGetOrderById);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchRequestGetOrderById();
    const fetchRequestGetOrderByPhone = async () => {
      try {
        const requestGetOrderByPhone = await orderAdminApi.getOrderByPhone(
          phone
        );
        console.log(requestGetOrderByPhone.status === 200);
        if (requestGetOrderByPhone.status === 200) {
          dispatch({
            type: ACTIOS.dataAllOrderShipper,
            payload: requestGetOrderByPhone.data,
          });
          setLoadingSearch(false);
        }
      } catch (error) {
        // const fetchRequestGetAllOrder = async () => {
        //   try {
        //     const requestGetAllOrder = await orderAdminApi.getAllOrder(
        //       state.filterPaginationAllOrder._page,
        //       state.filterPaginationAllOrder._limit
        //     );
        //     setPagination(requestGetAllOrder.pagination);
        //     dispatch({
        //       type: ACTIOS.dataAllOrder,
        //       payload: requestGetAllOrder.data,
        //     });
        //   } catch (error) {
        //     console.log(error);
        //   }
        // };
        // fetchRequestGetAllOrder();
      }
    };
    fetchRequestGetOrderByPhone();
  };

  return (
    <div className="d-flex wrap">
      <AsideAdmin />
      <div className={style.listorder_admin}>
        <div className={style.listorder_admin_frame}>
          <div className={style.title_add_listorder}>
            <span className={style.title_listorder}>
              Danh sách hóa đơn ({pagination.total} hóa đơn)
            </span>
          </div>
          <div className={`${style.searchListorder} d-flex `}>
            <div className={`${style.search_input} d-flex`}>
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
            </div>
            <div className={`${style.search_filter} d-flex`}>
              <div
                className={`${style.filterOrder} d-flex flex-column`}
                style={{ width: "40%" }}
              >
                <h6> Sắp xếp theo </h6>
                <div>
                  <FormControl
                    variant="outlined"
                    name="arange"
                    style={{
                      width: "100%",
                    }}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Chọn sắp xếp
                    </InputLabel>
                    <Select
                      name="size"
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={dayFilter}
                      onChange={handleFilter}
                      label="Chọn sắp xếp"
                    >
                      <MenuItem value="ngaymoinhat">Ngày: Mới nhất </MenuItem>
                      <MenuItem value="ngaycunhat">Ngày: Cũ nhất</MenuItem>
                      <MenuItem value="giatangdan">
                        Tổng tiền: Tăng dần
                      </MenuItem>
                      <MenuItem value="giagiamdan">
                        Tổng tiền: Giảm dần
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div
                className={`${style.filterOrder} d-flex flex-column`}
                style={{ width: "60%" }}
              >
                <h6> Lọc theo trạng thái đơn hàng</h6>{" "}
                <div style={{ width: "100%" }}>
                  <FormControl
                    variant="outlined"
                    name="arange"
                    style={{
                      width: "100%",
                    }}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Lọc theo trạng thái
                    </InputLabel>
                    <Select
                      name="size"
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={statusFilter}
                      onChange={handleFilterStatus}
                      label="Lọc theo trạng thái"
                      style={{
                        width: "100%",
                      }}
                    >
                      <MenuItem value="Đang Xử Lý">Đang xử lý </MenuItem>
                      <MenuItem value="Đang Giao Hàng">Đang giao hàng</MenuItem>
                      <MenuItem value="Đã Giao">Đã giao</MenuItem>
                      <MenuItem value="Đã Hủy">Đã hủy</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
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
              {state.dataAllOrderShipper?.map((data, idx) => {
                return (
                  <div key={idx}>
                    <ItemShipperOrderAdmin data={data} idx={idx} />
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

export default ListOrderShipperAdmin;
