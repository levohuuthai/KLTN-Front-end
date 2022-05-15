import React, { useState, useEffect, useContext } from "react";
import style from "./Address.module.scss";
import { useForm } from "react-hook-form";
import InputField from "components/Form-control/InputField";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import addressAPI from "api/addressAPI";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import FormDeleteAddress from "features/Checkout/components/FormDeleteAddress/FormDeleteAddress";
import Loading from "components/Loading";
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
function Address(props) {
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
  // const [idAddress, setIdAddress] = useState("");

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
    //  resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    console.log(values);
    console.log(city);
    if (
      values.street !== "" &&
      city.length > 0 &&
      district.length > 0 &&
      ward.length > 0
    ) {
      if (showFormAddress) {
        setLoadingAddress(true);
        const fetchAddaddress = async () => {
          try {
            const requestAddaddress = await addressAPI.addAddress({
              apartmentNumber: values.street,
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
                apartmentNumber: values.street,
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
  // console.log(state.dataAddress);
  return (
    <>
      <div className={`${style.checkout_adress} wrap`}>
        <h6>2. Địa chỉ giao hàng</h6>
        {state.dataAddress.length > 0 && (
          <>
            <p style={{ marginBottom: "10px" }}>
              Chọn địa chỉ giao hàng có sẵn bên dưới:
            </p>
            <div className={`row ${style.list_address_current}`}>
              {loadingAddress ? (
                <Loading />
              ) : (
                state.dataAddress?.map((data, idx) => {
                  const handleLinkPayment = () => {
                    setTimeout(() => {
                      setLoadingAddress(true);
                    }, 500);
                    setTimeout(() => {
                      setLoadingAddress(false);
                      navigate("/checkout/payment", {
                        state: {
                          dataAddress: data,
                          userName: loggedInUser.userName,
                          phone: loggedInUser.phone,
                        },
                      });
                    }, 700);
                  };
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
                        const requestGetAddress = await addressAPI.getAddress(
                          data._id
                        );
                        setCity(requestGetAddress.data.city);

                        setDistrict(requestGetAddress.data.district);

                        setWard(requestGetAddress.data.ward);
                      } catch (error) {
                        console.log(error);
                      }
                    };
                    fetchGetAddress();
                  };
                  return (
                    <div key={idx} className={`${style.address_current} col-5`}>
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
                          className={style.btn_address_current}
                          onClick={handleLinkPayment}
                        >
                          Giao đến địa chỉ này
                        </div>
                        <div
                          className={style.btn_update}
                          onClick={handleUpdateAddress}
                        >
                          Sửa
                        </div>
                        <div
                          className={style.btn_update}
                          onClick={handleDeleteAddress}
                        >
                          Xóa
                        </div>
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
            Bạn muốn giao hàng đến địa chỉ khác?
            <span onClick={showAddressNew}> Thêm địa chỉ giao hàng mới</span>
          </p>
        )}
        {state.dataAddress.length <= 0 && (
          <p style={{ marginBottom: "15px" }}>
            <span onClick={showAddressNew}> Thêm địa chỉ giao hàng mới</span>
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
                              return data.code === codeDistrict.province_code;
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
                  {arrDistrict?.map((data, idx) => {
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
                  {/* <MenuItem value={10}>Quận 9</MenuItem>
                <MenuItem value={21}>Cà Mau</MenuItem>
                <MenuItem value={22}>Sài Gòn</MenuItem> */}
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
                  {arrWard?.map((data, idx) => {
                    return (
                      <MenuItem key={idx} value={data.name}>
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
              <label className={style.title_lable}>Địa chỉ</label>
              <InputField
                name="street"
                label="Ví dụ: 52, Đường Trần Hưng Đạo"
                form={form}
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
    </>
  );
}

export default Address;
