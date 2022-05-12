import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import couponAdminApi from "api/admin/couponAdminApi";
import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useContext, useEffect, useState } from "react";
import style from "./ListCoupon.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import ItemCoupon from "./ItemCoupon/ItemCoupon";
import FormAddCoupon from "../FormAddCoupon/FormAddCoupon";

function ListCoupon(props) {
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
  console.log(state.dataAllCoupon);
  const [isForm, setIsForm] = useState(false);
  const handleShowFormAdd = () => {
    setIsForm(true);
  };
  const formfalseHandler = (falseFromForm) => {
    setIsForm(falseFromForm);
  };
  return (
    <>
      <div className="d-flex wrap">
        <AsideAdmin />
        <div className={style.listCoupon_admin}>
          <div className={style.listCoupon_admin_frame}>
            <div className={style.title_add_listCoupon}>
              <span className={style.title_listCoupon}>
                Danh sách mã giảm giá (5 giảm giá)
              </span>
              <span className={style.add_Coupon} onClick={handleShowFormAdd}>
                Tạo mã giảm giá
              </span>
            </div>
            <div className={`${style.searchlistCoupon} d-flex `}>
              <div className={`${style.searchIdCoupon} d-flex flex-column`}>
                <h6> Lọc theo mã giảm giá</h6>
                <input
                  type="text"
                  className={style.idCoupon}
                  placeholder="Nhập mã giảm giá"
                  // onChange={handleSearchIdCoupon}
                  // value={idCoupon}
                ></input>
              </div>
              <div className={`${style.filterCoupon} d-flex flex-column`}>
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
                    //   value={dayFilter}
                    // error={!!size.errorSize}
                    //   onChange={handleFilter}
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
