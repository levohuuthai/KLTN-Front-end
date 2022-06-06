import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import React, { useContext, useEffect, useState } from "react";
import style from "./Statistic.module.scss";
import SkeletonArray from "./SkeletonArray";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import MomentUtils from "@date-io/moment";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import "moment/locale/vi";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import statisticAdminApi from "api/admin/statisticAdminApi";
import ItemStatisticProduct from "./ItemStatisticProduct/ItemStatisticProduct";
import ItemStatisticOrder from "./ItemStatisticOrder/ItemStatisticOrder";

const useStyles = makeStyles((theme) => ({
  submit: {
    background: "black",
    width: "50px",
    height: "40px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "20px",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
}));
function Statistic(props) {
  const classes = useStyles();
  const [fromDay, setFromDay] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [toDay, setToDay] = useState(
    new Date(new Date().setHours(23, 59, 59, 0))
  );
  const [quater, setQuater] = useState();
  const [arrayProduct, setArrayProduct] = useState([]);
  const [arrayOrder, setArrayOrder] = useState([]);
  const [totalCountProduct, setTotalCountProduct] = useState();
  const [totalCountOrder, setTotalCountOrder] = useState();
  const [totalCountCustomer, setTotalCountCustomer] = useState();
  const [totalMoney, setTotalMoney] = useState();
  const [titleTopProduct, setTitleTopProduct] = useState("Top sản phẩm đã bán");
  const [titleTopOrder, setTitleTopOrder] = useState(
    "Top hóa đơn có doanh thu cao nhất"
  );
  const [loadingDate, setLoadingDate] = useState(false);
  const [loadingDateArray, setLoadingArray] = useState(false);

  const handleChangeFromDate = (date) => {
    let day = new Date(date._d.setHours(0, 0, 0, 0));
    setFromDay(day);
  };
  const handleChangeToDate = (date) => {
    let day = new Date(date._d.setHours(23, 59, 59, 0));
    setToDay(day);
  };
  const handleChangeQuater = (e) => {
    setQuater(e.target.value);
    setLoadingArray(true);
    setTitleTopProduct("Top sản phẩm đã bán trong quý " + e.target.value);
    setTitleTopOrder(
      "Top hóa đơn có doanh thu cao nhất trong quý " + e.target.value
    );
    const fetchRequestGetAllOrderThongKe = async () => {
      try {
        const requestGetAllOrderThongKe =
          await statisticAdminApi.getAllOrderThongKe(e.target.value);
        setArrayProduct(requestGetAllOrderThongKe.data.products);
        setArrayOrder(requestGetAllOrderThongKe.data.orders);
        setTotalCountProduct(requestGetAllOrderThongKe.data.TongSLBan);
        setTotalCountOrder(requestGetAllOrderThongKe.data.TongSLHoaDon);
        setTotalCountCustomer(requestGetAllOrderThongKe.data.TongSLKhachHang);
        setTotalMoney(requestGetAllOrderThongKe.data.TongTien);
        if (requestGetAllOrderThongKe.status === 200) {
          setLoadingArray(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllOrderThongKe();
  };
  // useEffect(() => {
  //   setTitleDay(fromDay + " đến ngày " + toDay);
  //   // setQuater(undefined);
  // }, [fromDay, toDay]);
  // useEffect(() => {
  //   setTitleDay(quater);
  //   // setFromDay(undefined);
  //   // setToDay(undefined);
  // }, [quater]);
  const handleFilterDateStatistic = () => {
    setLoadingDate(true);
    if (fromDay.getDate() === toDay.getDate()) {
      setTitleTopProduct(
        "Top sản phẩm đã bán trong ngày " +
          toDay.getDate() +
          " tháng " +
          (toDay.getMonth() + 1)
      );
      setTitleTopOrder(
        "Top hóa đơn có doanh thu cao nhất trong ngày " +
          toDay.getDate() +
          " tháng " +
          (toDay.getMonth() + 1)
      );
    } else {
      setTitleTopProduct(
        "Top sản phẩm đã bán từ ngày " +
          fromDay.getDate() +
          " đến ngày " +
          toDay.getDate() +
          " tháng " +
          (toDay.getMonth() + 1)
      );
      setTitleTopOrder(
        "Top hóa đơn có doanh thu cao nhất từ ngày " +
          fromDay.getDate() +
          " đến ngày " +
          toDay.getDate() +
          " tháng " +
          (toDay.getMonth() + 1)
      );
    }
    const fetchRequestGetAllOrderThongKe = async () => {
      try {
        const requestGetAllOrderThongKe =
          await statisticAdminApi.getAllOrderThongKeByDate(fromDay, toDay);
        console.log(requestGetAllOrderThongKe);
        setArrayProduct(requestGetAllOrderThongKe.data.products);
        setArrayOrder(requestGetAllOrderThongKe.data.orders);
        setTotalCountProduct(requestGetAllOrderThongKe.data.TongSLBan);
        setTotalCountOrder(requestGetAllOrderThongKe.data.TongSLHoaDon);
        setTotalCountCustomer(requestGetAllOrderThongKe.data.TongSLKhachHang);
        setTotalMoney(requestGetAllOrderThongKe.data.TongTien);
        if (requestGetAllOrderThongKe.status === 200) {
          setLoadingDate(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllOrderThongKe();
  };
  console.log(fromDay);
  console.log(toDay);

  return (
    <>
      <div className="d-flex wrap">
        <AsideAdmin />
        <div className={style.statistic_admin}>
          <div className={style.statistic_admin_frame}>
            <div className={style.title_add_statistic}>
              <span className={style.title_statistic}>Thống kê</span>
            </div>
            <div className={style.list_block_statistic}>
              <div className={`${style.block_statistic} ${style.block1}`}>
                <div className={style.left_block_statistic}>
                  <span>Tổng doanh thu</span>
                  <span className={style.price_today}>
                    {totalMoney === undefined
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(0)
                      : new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(totalMoney)}
                  </span>
                </div>
                <div className={style.right_block_statistic}>
                  <i className="fas fa-credit-card"></i>
                </div>
              </div>
              <div className={`${style.block_statistic} ${style.block2}`}>
                <div className={style.left_block_statistic}>
                  <span>Tổng sổ lượng sản phẩm đã bán</span>
                  <span className={style.price_today}>
                    {totalCountProduct === undefined ? 0 : totalCountProduct}{" "}
                    sản phẩm
                  </span>
                </div>
                <div className={style.right_block_statistic}>
                  <i className="fas fa-tshirt"></i>
                </div>
              </div>
              <div className={`${style.block_statistic} ${style.block3}`}>
                <div className={style.left_block_statistic}>
                  <span>Tổng số lượng hóa đơn</span>
                  <span className={style.price_today}>
                    {totalCountOrder === undefined ? 0 : totalCountOrder} hóa
                    đơn
                  </span>
                </div>
                <div className={style.right_block_statistic}>
                  <i class="fas fa-receipt"></i>
                </div>
              </div>
              <div className={`${style.block_statistic} ${style.block4}`}>
                <div className={style.left_block_statistic}>
                  <span>Tổng số lượng khách hàng mua</span>
                  <span className={style.price_today}>
                    {totalCountCustomer === undefined ? 0 : totalCountCustomer}{" "}
                    khách hàng
                  </span>
                </div>
                <div className={style.right_block_statistic}>
                  <i class="fas fa-user"></i>
                </div>
              </div>
            </div>
            <div className={`${style.search_statistic} d-flex `}>
              <div className={`${style.searchDay} d-flex`}>
                <div
                  style={{
                    marginRight: "20px",
                    // border: "1px solid rgb(167, 167, 167)",
                  }}
                >
                  <h6>Từ ngày</h6>
                  <MuiPickersUtilsProvider locale="vi" utils={MomentUtils}>
                    <KeyboardDatePicker
                      keyboard
                      placeholder="DD/MM/YYYY"
                      format={"DD/MM/YYYY"}
                      value={fromDay}
                      onChange={handleChangeFromDate}
                      animateYearScrolling={false}
                      autoOk={true}
                      clearable
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div style={{ marginRight: "20px" }}>
                  <h6>Đến ngày</h6>
                  <MuiPickersUtilsProvider locale="vi" utils={MomentUtils}>
                    <KeyboardDatePicker
                      keyboard
                      placeholder="DD/MM/YYYY"
                      format={"DD/MM/YYYY"}
                      value={toDay}
                      onChange={handleChangeToDate}
                      animateYearScrolling={false}
                      autoOk={true}
                      clearable
                      minDate={fromDay}
                      // maxDate={!access ? lastDay : undefined}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className={`${style.buttonFilterDay}`}>
                  <Button
                    type="submit"
                    className={classes.submit}
                    onClick={handleFilterDateStatistic}
                  >
                    {loadingDate ? (
                      <div
                        class="spinner-border"
                        role="status"
                        style={{ width: "22px", height: "22px" }}
                      >
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : (
                      <span> Lọc</span>
                    )}
                  </Button>
                </div>
              </div>
              <div className={`${style.filterQuater} d-flex flex-column`}>
                <h6> Lọc theo quý</h6>
                <div style={{ width: "100%" }}>
                  <FormControl
                    variant="outlined"
                    name="quater"
                    style={{
                      width: "100%",
                    }}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Chọn quý
                    </InputLabel>
                    <Select
                      name="quater"
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={quater}
                      // error={!!size.errorSize}
                      onChange={handleChangeQuater}
                      label="Chọn quý"
                    >
                      <MenuItem value="1">Quý I </MenuItem>
                      <MenuItem value="2">Quý II</MenuItem>
                      <MenuItem value="3">Quý III</MenuItem>
                      <MenuItem value="4">Quý IV</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className={style.list_table}>
              <div className={style.list_product_left}>
                <h5>{titleTopProduct}</h5>{" "}
                <div className={style.list_product_frame}>
                  <div
                    className={`${style.title_item_product} d-flex justify-content-between`}
                  >
                    <span
                      className={`${style.title_top} d-flex justify-content-center`}
                    >
                      Top
                    </span>
                    <span
                      className={`${style.title_name_product} d-flex justify-content-center`}
                    >
                      <span>Sản phẩm</span>
                    </span>
                    <span
                      className={`${style.title_quantityPurchase} d-flex justify-content-center`}
                    >
                      <span>Số lượng đã bán</span>
                    </span>
                    <span
                      className={`${style.title_quantityStock} d-flex justify-content-center`}
                    >
                      Số lượng còn lại
                    </span>
                  </div>
                  <div className={`${style.list_item_product} `}>
                    {arrayProduct?.map((data, idx) => {
                      return (
                        <div key={idx}>
                          <ItemStatisticProduct data={data} idx={idx} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={style.list_order_right}>
                <h5 style={{ fontSize: "19px" }}> {titleTopOrder} </h5>
                <div className={style.list_order_frame}>
                  <div className={`${style.title_item_order} d-flex`}>
                    <span
                      className={`${style.title_top} d-flex justify-content-center`}
                    >
                      Top
                    </span>
                    <span
                      className={`${style.title_id_order} d-flex justify-content-center`}
                    >
                      <span>Mã hóa đơn</span>
                    </span>
                    <span
                      className={`${style.title_totalMoney} d-flex justify-content-center`}
                    >
                      <span>Tổng tiền</span>
                    </span>
                    <span
                      className={`${style.title_nameCustomer} d-flex justify-content-center`}
                    >
                      Tên khách hàng
                    </span>
                    <span
                      className={`${style.title_createDate} d-flex justify-content-center`}
                    >
                      Ngày tạo
                    </span>
                  </div>
                  <div className={`${style.list_item_order} `}>
                    {loadingDateArray ? (
                      <SkeletonArray length={arrayOrder?.length} />
                    ) : (
                      arrayOrder?.map((data, idx) => {
                        return (
                          <div key={idx}>
                            <ItemStatisticOrder data={data} idx={idx} />
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistic;
