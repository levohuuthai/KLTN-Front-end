import React, { useContext, useEffect, useState } from "react";
import imgbackground4 from "assets/images/auth/login/imgbackground4.jpg";
import style from "./MyAddress.module.scss";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import ao2_back from "assets/images/product_promotion/ao2_back.png";
import orderApi from "api/orderApi";
import { useSelector } from "react-redux";
import productApi from "api/productApi";
import MyOrderAside from "features/MyOrderGroup/components/MyOrderAside/MyOrderAside";
import { makeStyles } from "@material-ui/styles";
import { useForm } from "react-hook-form";
import InputField from "components/Form-control/InputField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import FormDeleteAddress from "features/Checkout/components/FormDeleteAddress/FormDeleteAddress";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import addressAPI from "api/addressAPI";
import Loading from "components/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles((theme) => ({
  submit: {
    background: "black",
    padding: "0.5rem 1rem",
    color: "#fff",
    transition: "all 0.6s",
    margin: "20px auto",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
  cancel: {
    background: "linear-gradient(rgb(255, 255, 255), rgb(247, 247, 247))",
    padding: "0.5rem 1rem",
    color: "black",
    border: "1px solid rgb(204, 204, 204)",
    marginRight: "20px",
  },
}));
function MyAddress(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const loggedInUser = useSelector((state) => state.user.current);
  const [arrcity, setArrCity] = useState([]);
  const [city, setCity] = useState([]);
  const [arrDistrict, setArrDistrict] = useState([]);
  const [district, setDistrict] = useState("");
  const [arrWard, setArrWard] = useState([]);
  const [ward, setWard] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState({
    value: "",
    errorAppartment: undefined,
  });
  const classes = useStyles();
  const [showFormAddress, setFormShowAddress] = useState(false);
  const [showFormUpdateAddress, setFormUpdateAddress] = useState(false);
  const [isOpenFormDeleteAddress, seIsOpenFormLDeleteAddress] = useState(false);
  const [idAddress, setIdAddress] = useState("");
  const [loadingAddress, setLoadingAddress] = useState(false);
  const { dispatch, state } = useContext(GlobalContext);

  const form = useForm({
    defaultValues: {
      street: "",
      city: "",
      password: "",
    },
  });
  const handleSubmit = (values) => {
    if (
      apartmentNumber.value !== "" &&
      city.length > 0 &&
      district.length > 0 &&
      ward.length > 0
    ) {
      if (showFormAddress) {
        setLoadingAddress(true);
        const fetchAddaddress = async () => {
          try {
            const requestAddaddress = await addressAPI.addAddress({
              apartmentNumber: apartmentNumber.value,
              ward: ward,
              district: district,
              city: city,
              active: false,
              userId: loggedInUser._id,
            });
            if (requestAddaddress.status === 200) {
              const fetchGetListAddressUser = async () => {
                try {
                  const requestGetListAddressUser =
                    await addressAPI.getListAddressUser(loggedInUser._id);
                  dispatch({
                    type: ACTIOS.dataAddress,
                    payload: requestGetListAddressUser.data,
                  });
                  setLoadingAddress(false);
                  window.scrollTo(0, 0);
                } catch (error) {
                  console.log(error);
                }
              };
              fetchGetListAddressUser();
              toast.success("Thêm địa chỉ thành công", {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000,
              });
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchAddaddress();
        form.reset();
      } else if (showFormUpdateAddress) {
        setLoadingAddress(true);
        const fetchUpdateaddress = async () => {
          try {
            const requestUpdateAddress = await addressAPI.updatesAddress(
              idAddress,
              {
                apartmentNumber: apartmentNumber.value,
                ward: ward,
                district: district,
                city: city,
                active: false,
                userId: loggedInUser._id,
              }
            );
            if (requestUpdateAddress.status === 200) {
              const fetchGetListAddressUser = async () => {
                try {
                  const requestGetListAddressUser =
                    await addressAPI.getListAddressUser(loggedInUser._id);
                  console.log(requestGetListAddressUser);
                  dispatch({
                    type: ACTIOS.dataAddress,
                    payload: requestGetListAddressUser.data,
                  });
                  setLoadingAddress(false);
                  window.scrollTo(0, 0);
                  toast.success("Cập nhật địa chỉ thành công", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                  });
                } catch (error) {
                  console.log(error);
                }
              };
              fetchGetListAddressUser();
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchUpdateaddress();
        form.reset();
      }
    } else {
      if (city.length === 0) {
        toast.error("Tỉnh/Thành phố không được trống", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      } else if (district.length === 0) {
        toast.error("Quận/Huyện phố không được trống", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      } else if (ward.length === 0) {
        toast.error("Phường/Xã phố không được trống", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      } else if (values.street === "") {
        toast.error("Địa chỉ không được trống", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
    }
  };
  const showAddressNew = () => {
    setFormShowAddress(true);
    setFormUpdateAddress(false);
  };
  const handleCancelShowAddress = () => {
    setFormShowAddress(false);
  };

  const handleSelectCity = (event) => {
    setCity(event.target.value);
  };
  const handleSelectDistrict = (event) => {
    setDistrict(event.target.value);
  };
  const handleSelectWard = (event) => {
    setWard(event.target.value);
  };
  useEffect(() => {
    const fetchGetListAddressUser = async () => {
      try {
        const requestGetListAddressUser = await addressAPI.getListAddressUser(
          loggedInUser._id
        );
        console.log(requestGetListAddressUser);
        dispatch({
          type: ACTIOS.dataAddress,
          payload: requestGetListAddressUser.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetListAddressUser();
  }, []);

  useEffect(() => {
    axios
      .get(`https://provinces.open-api.vn/api/p/`)
      .then((res) => {
        setArrCity(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  let navigate = useNavigate();

  const falseFromDeleteAddress = () => {
    seIsOpenFormLDeleteAddress(false);
    const fetchGetListAddressUser = async () => {
      try {
        const requestGetListAddressUser = await addressAPI.getListAddressUser(
          loggedInUser._id
        );
        dispatch({
          type: ACTIOS.dataAddress,
          payload: requestGetListAddressUser.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetListAddressUser();
  };
  const handleAppartmentNumber = (e) => {
    if (e.target.value === "") {
      setApartmentNumber({
        value: e.target.value,
        errorAppartment: "Vui lòng nhập số nhà",
      });
    } else {
      setApartmentNumber({
        value: e.target.value,
        errorAppartment: undefined,
      });
    }
  };
  return (
    <div>
      <div className={style.myorder}>
        <MyOrderAside />
        <div className={style.myaddress_right}>
          <h6 style={{ fontSize: "20px" }}>Sổ địa chỉ</h6>{" "}
          <div className={`${style.checkout_adress} wrap`}>
            {state.dataAddress.length > 0 && (
              <>
                <div className={`row ${style.list_address_current}`}>
                  {loadingAddress ? (
                    <Loading />
                  ) : (
                    state.dataAddress?.map((data, idx) => {
                      const handleDeleteAddress = () => {
                        seIsOpenFormLDeleteAddress(true);
                        setIdAddress(data._id);
                      };
                      const handleUpdateAddress = () => {
                        setFormUpdateAddress(true);
                        setFormShowAddress(false);
                        setIdAddress(data._id);
                        const fetchGetAddress = async () => {
                          try {
                            const requestGetAddress =
                              await addressAPI.getAddress(data._id);
                            setCity(requestGetAddress.data.city);
                            setDistrict(requestGetAddress.data.district);
                            setWard(requestGetAddress.data.ward);
                            setApartmentNumber({
                              value: requestGetAddress.data.apartmentNumber,
                              errorAppartment: "",
                            });
                          } catch (error) {
                            console.log(error);
                          }
                        };
                        fetchGetAddress();
                      };
                      return (
                        <div
                          key={idx}
                          className={`${style.address_current} col-5`}
                        >
                          <h5>{loggedInUser.userName}</h5>
                          <span className={style.address}>
                            Địa chỉ: {data.apartmentNumber}, {data.ward},
                            {data.district},{data.city}, Việt Nam
                          </span>

                          <p className={style.phone}>
                            Điện thoại: {loggedInUser.phone}
                          </p>
                          <div className={style.btn_group}>
                            <div
                              className={style.btn_update}
                              onClick={handleUpdateAddress}
                            >
                              Sửa
                            </div>
                            {/* <div
                              className={style.btn_delete}
                              onClick={handleDeleteAddress}
                            >
                              Xóa
                            </div> */}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </>
            )}
            {state.dataAddress.length > 0 && (
              <p style={{ marginBottom: "15px" }}>
                Bạn muốn thêm địa chỉ khác?
                <span onClick={showAddressNew}>
                  {" "}
                  Thêm địa chỉ giao hàng mới
                </span>
              </p>
            )}
            {state.dataAddress.length <= 0 && (
              <p style={{ marginBottom: "15px" }}>
                <span onClick={showAddressNew}>
                  {" "}
                  Thêm địa chỉ giao hàng mới
                </span>
              </p>
            )}
            <div
              className={`${style.address_new} ${
                showFormAddress || showFormUpdateAddress
                  ? style.active_address_new
                  : ""
              }`}
            >
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={`${style.form_adressnew} d-flex flex-column`}
              >
                <div
                  className={`${style.Name} d-flex  justify-content-between align-items-center`}
                >
                  <label className={style.title_lable}>Tỉnh/Thành phố</label>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Chọn Tỉnh/Thành phố
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={city}
                      onChange={handleSelectCity}
                      autoWidth
                      label="Chọn Tỉnh/Thành phố"
                      style={{ background: "#fff" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {arrcity?.map((data, idx) => {
                        const handProvinceCode = async () => {
                          //Khi chon tinh thi loc lai thanh pho
                          await axios
                            .get(`https://provinces.open-api.vn/api/d/`)
                            .then((res) => {
                              setArrDistrict(
                                res.data.filter((codeDistrict) => {
                                  return (
                                    data.code === codeDistrict.province_code
                                  );
                                })
                              );
                            })
                            .catch((error) => console.log(error));
                        };
                        return (
                          <MenuItem
                            key={idx}
                            value={data.name}
                            onClick={handProvinceCode}
                          >
                            {data.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div
                  className={`${style.Name} d-flex  justify-content-between align-items-center`}
                >
                  <label className={style.title_lable}>Quận/Huyện</label>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Chọn Quận/Huyện
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={district}
                      onChange={handleSelectDistrict}
                      autoWidth
                      label="Chọn Quận/Huyện"
                      style={{ background: "#fff" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {/* mảng quận huyện > 0 thì sẽ chọn lại, -0 thì sẽ hiện update */}
                      {/* {arrDistrict?.map((data, idx) => {
                    const handleDistrictCode = async () => {
                      //Khi chon thanh pho loc phuong
                      await axios
                        .get(`https://provinces.open-api.vn/api/w/`)
                        .then((res) => {
                          setArrWard(
                            res.data.filter((codeWard) => {
                              return data.code === codeWard.district_code;
                            })
                          );
                        })
                        .catch((error) => console.log(error));
                    };
                    return (
                      <MenuItem
                        key={idx}
                        value={data.name}
                        onClick={handleDistrictCode}
                      >
                        {data.name}
                      </MenuItem>
                    );
                  })} */}
                      {arrDistrict.length > 0 &&
                        arrDistrict?.map((data, idx) => {
                          const handleDistrictCode = async () => {
                            //Khi chon thanh pho loc phuong
                            await axios
                              .get(`https://provinces.open-api.vn/api/w/`)
                              .then((res) => {
                                setArrWard(
                                  res.data.filter((codeWard) => {
                                    return data.code === codeWard.district_code;
                                  })
                                );
                              })
                              .catch((error) => console.log(error));
                          };
                          return (
                            <MenuItem
                              key={idx}
                              value={data.name}
                              onClick={handleDistrictCode}
                            >
                              {data.name}
                            </MenuItem>
                          );
                        })}
                      {arrDistrict.length === 0 && (
                        <MenuItem value={district}>{district}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div
                  className={`${style.Name} d-flex  justify-content-between align-items-center`}
                >
                  <label className={style.title_lable}>Phường/Xã</label>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Chọn Phường/Xã
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={ward}
                      onChange={handleSelectWard}
                      autoWidth
                      label="Chọn Phường/Xã"
                      style={{ background: "#fff" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {arrWard.length > 0 &&
                        arrWard?.map((data, idx) => {
                          return (
                            <MenuItem key={idx} value={data.name}>
                              {data.name}
                            </MenuItem>
                          );
                        })}
                      {arrWard.length === 0 && (
                        <MenuItem value={ward}>{ward}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div
                  className={`${style.Name} d-flex  justify-content-between align-items-center`}
                >
                  <label className={style.title_lable}>Địa chỉ</label>
                  {/* <InputField
                name="street"
                label="Ví dụ: 52, Đường Trần Hưng Đạo"
                form={form}
              /> */}
                  <TextField
                    name="apartmentnumber"
                    label="Ví dụ: 52, Đường Trần Hưng Đạo"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    style={{ background: "#fff" }}
                    value={apartmentNumber.value}
                    onChange={handleAppartmentNumber}
                    error={!!apartmentNumber.errorAppartment}
                    helperText={
                      apartmentNumber.errorAppartment !== undefined
                        ? apartmentNumber.errorAppartment
                        : ""
                    }
                  />
                </div>
                <div className={style.group_btn_address_new}>
                  <Button
                    className={classes.cancel}
                    onClick={handleCancelShowAddress}
                  >
                    Hủy bỏ
                  </Button>

                  <Button type="submit" className={classes.submit}>
                    {showFormAddress && "Giao đến địa chỉ này"}
                    {showFormUpdateAddress && "Cập nhật"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <FormDeleteAddress
            isOpenFormDeleteAddress={isOpenFormDeleteAddress}
            onFormFalse={falseFromDeleteAddress}
            id={idAddress}
          ></FormDeleteAddress>
        </div>
      </div>
    </div>
  );
}

export default MyAddress;
