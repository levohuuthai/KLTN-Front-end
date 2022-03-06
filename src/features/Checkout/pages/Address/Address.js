import React, { useState } from "react";
import PropTypes from "prop-types";
import style from "./Address.module.scss";
import { useForm } from "react-hook-form";
import InputField from "components/Form-control/InputField";
import { makeStyles } from "@material-ui/styles";
import PasswordField from "components/Form-control/PasswordField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
Address.propTypes = {};
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
    marginLeft: "20px",
  },
}));
function Address(props) {
  const classes = useStyles();
  const [showFormAddress, setFormShowAddress] = useState(false);
  const form = useForm({
    defaultValues: {
      SDT: "",
      password: "",
    },
    //  resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };
  const showAddressNew = () => {
    setFormShowAddress(!showFormAddress);
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className={`${style.checkout_adress} wrap`}>
      <h6>2. Địa chỉ giao hàng</h6>
      <p>Chọn địa chỉ giao hàng có sẵn bên dưới:</p>
      <div className={style.address_current}>
        <h6>Lê Võ Hửu Thái</h6>
        <p>
          Địa chỉ: 84/20 Huỳnh Khương An, phường 5, quận Gò Vấp, Hồ Chí Minh,
          Việt Nam
        </p>
        <p>Điện thoại: 0327364753</p>
        <div className={style.btn_group}>
          <div className={style.btn_address_current}>Giao đến địa chỉ này</div>
          <div className={style.btn_update}>Sửa</div>
        </div>
      </div>
      <p>
        Bạn muốn giao hàng đến địa chỉ khác?
        <span onClick={showAddressNew}> Thêm địa chỉ giao hàng mới</span>
      </p>
      <div
        className={`${style.address_new} ${
          showFormAddress ? style.active_address_new : ""
        }`}
      >
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={`${style.form_adressnew} d-flex flex-column`}
        >
          <div
            className={`${style.Name} d-flex  justify-content-between align-items-center`}
          >
            <label className={style.title_lable}>Họ tên</label>
            <InputField name="SDT" label="Nhập họ tên" form={form} />
          </div>
          <div
            className={`${style.Name} d-flex  justify-content-between align-items-center`}
          >
            <label className={style.title_lable}>Số điện thoại</label>
            <InputField name="SDT" label="Nhập số điện thoại" form={form} />
          </div>
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
                value={age}
                onChange={handleChange}
                autoWidth
                label="Chọn Tỉnh/Thành phố"
                style={{ background: "#fff" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Bà Rịa - Vũng Tàu</MenuItem>
                <MenuItem value={21}>Cà Mau</MenuItem>
                <MenuItem value={22}>Sài Gòn</MenuItem>
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
                value={age}
                onChange={handleChange}
                autoWidth
                label="Chọn Quận/Huyện"
                style={{ background: "#fff" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Bà Rịa - Vũng Tàu</MenuItem>
                <MenuItem value={21}>Cà Mau</MenuItem>
                <MenuItem value={22}>Sài Gòn</MenuItem>
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
                value={age}
                onChange={handleChange}
                autoWidth
                label="Chọn Phường/Xã"
                style={{ background: "#fff" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Bà Rịa - Vũng Tàu</MenuItem>
                <MenuItem value={21}>Cà Mau</MenuItem>
                <MenuItem value={22}>Sài Gòn</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div
            className={`${style.Name} d-flex  justify-content-between align-items-center`}
          >
            <label className={style.title_lable}>Địa chỉ</label>
            <InputField
              name="SDT"
              label="Ví dụ: 52, Đường Trần Hưng Đạo"
              form={form}
            />
          </div>
          <div className={style.group_btn_address_new}>
            <Button type="submit" className={classes.submit}>
              Giao đến địa chỉ này
            </Button>
            <Button className={classes.cancel}>Hủy bỏ</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Address;
