import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import couponAdminApi from "api/admin/couponAdminApi";
import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useContext, useEffect, useState } from "react";
import style from "./ListCoupon.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import ItemCoupon from "./ItemCoupon/ItemCoupon";
import FormAddCoupon from "../FormAddCoupon/FormAddCoupon";
import { Button, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  search: {
    background: "black",
    width: "200px",
    height: "40px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "25px",
    marginLeft: "520px",
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
function ListCoupon(props) {
  const classes = useStyles();
  const { dispatch, state } = useContext(GlobalContext);
  useEffect(() => {
    const fetchRequestGetAllCoupon = async () => {
      try {
        const requestGetAllCoupon = await couponAdminApi.getAllCouponAdmin();
        dispatch({
          type: ACTIOS.dataAllCoupon,
          payload: requestGetAllCoupon.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllCoupon();
  }, []);
  const [isForm, setIsForm] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const handleShowFormAdd = () => {
    setIsForm(true);
  };
  const formfalseHandler = (falseFromForm) => {
    setIsForm(falseFromForm);
  };
  const handleLoadingAll = () => {
    setLoadingAll(true);
    const fetchRequestGetAllCoupon = async () => {
      try {
        const requestGetAllCoupon = await couponAdminApi.getAllCouponAdmin();
        dispatch({
          type: ACTIOS.dataAllCoupon,
          payload: requestGetAllCoupon.data,
        });
        setLoadingAll(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllCoupon();
  };

  //Loc theo trang thai
  const handleFilterStatus = (e) => {
    setStatusFilter(e.target.value);
    const fetchRequestGetAllCouponByDate = async () => {
      try {
        const requestGetAllCouponByDate = await couponAdminApi.getCouponByDate(
          e.target.value
        );
        dispatch({
          type: ACTIOS.dataAllCoupon,
          payload: requestGetAllCouponByDate.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllCouponByDate();
  };
  //Loc theo loại
  const handleFilterType = (e) => {
    setTypeFilter(e.target.value);
    const fetchRequestGetAllCouponByType = async () => {
      try {
        const requestGetAllCouponByType = await couponAdminApi.getCouponByType(
          e.target.value
        );
        dispatch({
          type: ACTIOS.dataAllCoupon,
          payload: requestGetAllCouponByType.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllCouponByType();
  };
  return (
    <>
      <div className="d-flex wrap">
        <AsideAdmin />
        <div className={style.listCoupon_admin}>
          <div className={style.listCoupon_admin_frame}>
            <div className={style.title_add_listCoupon}>
              <span className={style.title_listCoupon}>
                Danh sách mã giảm giá ({state.dataAllCoupon.length} giảm giá)
              </span>
              <span
                className={`${style.add_Coupon} d-flex align-items-center`}
                onClick={handleShowFormAdd}
              >
                <i
                  class="fas fa-plus-circle"
                  style={{ marginRight: "10px" }}
                ></i>{" "}
                Tạo mã giảm giá
              </span>
            </div>
            <div className={`${style.searchlistCoupon} d-flex `}>
              <div
                className={`${style.filterOrder} d-flex flex-column`}
                style={{ width: "25%", marginRight: "25px" }}
              >
                <h6>Lọc theo loại </h6>
                <div>
                  <FormControl
                    variant="outlined"
                    name="arange"
                    style={{
                      width: "100%",
                    }}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Chọn loại
                    </InputLabel>
                    <Select
                      name="size"
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={typeFilter}
                      onChange={handleFilterType}
                      label="Chọn loại"
                    >
                      <MenuItem value="ship">Phí Giao Hàng </MenuItem>
                      <MenuItem value="product">Phí Đơn Hàng</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div
                className={`${style.filterOrder} d-flex flex-column`}
                style={{ width: "30%" }}
              >
                <h6> Lọc theo trạng thái</h6>{" "}
                <div style={{ width: "100%" }}>
                  <FormControl
                    variant="outlined"
                    name="arange"
                    style={{
                      width: "100%",
                    }}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Chọn trạng thái
                    </InputLabel>
                    <Select
                      name="size"
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={statusFilter}
                      onChange={handleFilterStatus}
                      label=" Chọn trạng thái"
                      style={{
                        width: "100%",
                      }}
                    >
                      <MenuItem value="het">Đã hết hạn</MenuItem>
                      <MenuItem value="con">Chưa hết hạn</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className={classes.search}
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
            <div className={style.listCoupon}>
              <div className={style.title_item_coupon}>
                <span
                  className={`${style.title_conditionToDiscount} d-flex justify-content-center`}
                >
                  Điều kiện giảm giá
                </span>
                <span
                  className={`${style.title_priceOff} d-flex justify-content-center`}
                >
                  <span>Số tiền giảm</span>
                </span>
                <span
                  className={`${style.title_category} d-flex justify-content-center`}
                >
                  <span>Loại</span>
                </span>
                <span
                  className={`${style.title_endDay} d-flex justify-content-center`}
                >
                  Ngày hết hạn
                </span>
                <span
                  className={`${style.title_close} d-flex justify-content-center`}
                >
                  <i className="fas fa-ellipsis-h"></i>
                </span>
              </div>
              <div className={`${style.list_item_Coupon}`}>
                {state.dataAllCoupon?.map((data, idx) => {
                  return (
                    <div key={idx}>
                      <ItemCoupon data={data} idx={idx} />
                    </div>
                  );
                })}
                {/* {state.dataAllCoupon?.map((data, idx) => {
                return (
                  <div key={idx}>
                    <ItemCouponAdmin data={data} idx={idx} />
                  </div>
                );
              })} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormAddCoupon isForm={isForm} onFormFalse={formfalseHandler} />
    </>
  );
}

export default ListCoupon;
