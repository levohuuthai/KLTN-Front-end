import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useEffect, useState } from "react";
import style from "./AddProductAdmin.module.scss";
import { Button, TextField, Typography } from "@material-ui/core";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";
import productAdminApi from "api/admin/productAdminApi";
import typeProductApi from "api/typeProductApi";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
toast.configure();

const useStyles = makeStyles((theme) => ({
  // emailInput: { padding: theme.spacing(2) },
  title: {
    color: "#444",
    marginBottom: "-10px",
  },
  titlePassword: {
    color: "#444",
    paddingTop: "13px",
  },
  submit: {
    background: "black",
    width: "150px",
    height: "50px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "20px",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
  forgetPassword: {
    color: "#444",
    paddingTop: "30px",
  },
}));
function AddProductAdmin(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    nameProduct: yup.string().required("Vui lòng nhập mã tên sản phẩm"),
    brand: yup.string().required("Vui lòng nhập thương hiệu"),
    origin: yup.string().required("Vui lòng nhập xuất xứ"),
    collar: yup.string().required("Vui lòng nhập cổ áo"),
    fabricMaterial: yup.string().required("Vui lòng nhập chất liệu"),
    size: yup.string().required("Vui lòng nhập kích cỡ"),
    color: yup.string().required("Vui lòng nhập màu"),
    price: yup.string().required("Vui lòng nhập giá"),
    quantity: yup.string().required("Vui lòng nhập số lượng"),
    percentSaleOff: yup.string().required("Vui lòng nhập phần trăm giảm giá"),

    // Repassword: yup
    //   .string()
    //   .required("Vui lòng nhập lại mật khẩu")
    //   .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  });
  const { register } = useForm({
    defaultValues: {
      nameProduct: "",
      brand: "",
      origin: "",
      collar: "",
      fabricMaterial: "",
      size: "",
      color: "",
      price: "",
      quantity: "",
      percentSaleOff: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const [dataTypeProduct, setDataTypeProduct] = useState();
  // const [idTypeProduct, setIdTypeProduct] = useState();
  const [idProduct, setIdProduct] = useState();

  const [nameProduct, setNameProduct] = useState("");
  const [activeDropdown, setActiveDropdown] = useState("");
  const [arrayTitleProduct, setArrayTitleProduct] = useState([]);
  const [brand, setBrand] = useState({ value: "", errorBrand: undefined });
  const [origin, setOrigin] = useState({ value: "", errorOrigin: undefined });
  const [collar, setCollar] = useState({ value: "", errorCollar: undefined });
  const [fabricMaterial, setFabricMaterial] = useState({
    value: "",
    errorFabricMaterial: undefined,
  });
  const [size, setSize] = useState({ value: "", errorSize: undefined });
  const [color, setColor] = useState({ value: "", errorColor: undefined });
  const [price, setPrice] = useState({ value: "", errorPrice: undefined });
  const [percentSaleOff, setPercentSaleOff] = useState({
    value: "",
    errorPercentSaleOff: undefined,
  });

  const [quantity, setQuantity] = useState({
    value: "",
    errorQuantity: undefined,
  });
  const [describe, setDescribe] = useState();
  const [category, setCategory] = useState();
  const [imageFront, setImageFront] = useState({ img: "" });
  const [imageBack, setImageBack] = useState({ img: "" });
  const [imageDetail, setImageDetail] = useState({ img: "" });
  const [disable, setDisable] = useState(false);
  const [disableColor, setDisableColor] = useState(false);

  const handleFocusNameProduct = (e) => {
    setActiveDropdown("a");
  };
  const handleBlurNameProduct = (e) => {
    // setActiveDropdown("");
  };
  const handleNameProduct = (e) => {
    setActiveDropdown(e.target.value);
    setNameProduct(e.target.value);
    if (e.target.value !== "") {
      const fetchRequestGetProductByTitle = async () => {
        try {
          const requestGetGetProductByTitle =
            await productAdminApi.getProductByTitle(e.target.value);
          console.log(requestGetGetProductByTitle);
          setArrayTitleProduct(requestGetGetProductByTitle.data);
          // console.log(requestGetGetProductByTitle.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetProductByTitle();
    } else {
      setBrand({ ...brand, value: "" });
      setOrigin({ ...origin, value: "" });
      setCollar({ ...collar, value: "" });
      setFabricMaterial({ ...fabricMaterial, value: "" });
      setImageFront({ ...imageFront, img: "" });
      setImageBack({ ...imageBack, img: "" });
      setImageDetail({ ...imageDetail, img: "" });
      setDescribe("");

      // setOrigin("");
      // setCategory("");

      setDisable(false);
    }
  };

  useEffect(() => {
    const fetchRequestGetAllTypeProdcut = async () => {
      try {
        const requestGetAllTypeProduct =
          await typeProductApi.getAllTypeProduct();
        setDataTypeProduct(requestGetAllTypeProduct.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllTypeProdcut();
  }, []);
  const handleClickItemFirst = () => {
    setActiveDropdown("");
    setBrand({ ...brand, value: "" });
    setOrigin({ ...origin, value: "" });
    setCollar({ ...collar, value: "" });
    setFabricMaterial({ ...fabricMaterial, value: "" });
    setImageFront({ ...imageFront, img: "" });
    setImageBack({ ...imageBack, img: "" });
    setImageDetail({ ...imageDetail, img: "" });
    setPrice({ ...price, value: "" });
    setDescribe("");
    setColor({ ...color, value: "" });
    setSize({ ...size, value: "" });
    setDisable(false);
  };
  const handleBrand = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setBrand({
        value: e.target.value,
        errorBrand: "Vui lòng nhập thương hiệu",
      });
    } else {
      setBrand({ value: e.target.value, errorBrand: undefined });
    }
  };
  const handleDescribe = (e) => {
    setDescribe(e.target.value);
  };
  const handleOrigin = (e) => {
    if (e.target.value === "") {
      setOrigin({
        value: e.target.value,
        errorOrigin: "Vui lòng nhập Xuất xứ",
      });
    } else {
      setOrigin({ value: e.target.value, errorOrigin: undefined });
    }
  };
  const handlecollar = (e) => {
    if (e.target.value === "") {
      setCollar({
        value: e.target.value,
        errorCollar: "Vui lòng nhập cổ áo",
      });
    } else {
      setCollar({ value: e.target.value, errorCollar: undefined });
    }
  };
  const handleFabricMaterial = (e) => {
    if (e.target.value === "") {
      setFabricMaterial({
        value: e.target.value,
        errorFabricMaterial: "Vui lòng nhập cổ áo",
      });
    } else {
      setFabricMaterial({
        value: e.target.value,
        errorFabricMaterial: undefined,
      });
    }
  };
  const handleSize = (e) => {
    if (e.target.value === "") {
      setSize({
        value: e.target.value,
        errorSize: "Vui lòng nhập kích cỡ",
      });
    } else {
      setSize({
        value: e.target.value,
        errorSize: undefined,
      });
    }
  };
  const handleColor = (e) => {
    if (e.target.value === "") {
      setColor({
        value: e.target.value,
        errorColor: "Vui lòng nhập màu sắc",
      });
    } else {
      setColor({
        value: e.target.value,
        errorColor: undefined,
      });
      if (disable) {
        const fetchRequestgetImageByColorAndProductId = async () => {
          try {
            const requestGetImageByColorAndProductId =
              await productAdminApi.getImageByColorAndProductId(
                e.target.value,
                idProduct
              );
            if (requestGetImageByColorAndProductId.data !== null) {
              setImageDetail({ img: requestGetImageByColorAndProductId.data });
              setDisableColor(true);
            } else {
              setImageDetail({ img: "" });
              setDisableColor(false);
            }
            // console.log(requestGetgetImageByColorAndProductId.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchRequestgetImageByColorAndProductId();
      }
    }
  };
  const handlePrice = (e) => {
    if (e.target.value === "") {
      setPrice({
        value: e.target.value,
        errorPrice: "Vui lòng nhập giá tiền",
      });
    } else {
      let val = e.target.value;
      val = val.replace(/,/g, "");
      if (val.length > 3) {
        let noCommas = Math.ceil(val.length / 3) - 1;
        let remain = val.length - noCommas * 3;
        let newVal = [];
        for (let i = 0; i < noCommas; i++) {
          newVal.unshift(val.substr(val.length - i * 3 - 3, 3));
        }
        newVal.unshift(val.substr(0, remain));
        setPrice({
          value: newVal,
          errorPrice: undefined,
        });
      } else {
        setPrice({
          value: val,
          errorPrice: undefined,
        });
      }
    }

    // setPrice(e.target.value);
  };
  const handleQuantity = (e) => {
    if (e.target.value === "") {
      setQuantity({
        value: e.target.value,
        errorQuantity: "Vui lòng nhập số lượng",
      });
    } else {
      setQuantity({
        value: e.target.value,
        errorQuantity: undefined,
      });
    }
  };
  const handlePercentSaleOff = (e) => {
    if (e.target.value === "") {
      setPercentSaleOff({
        value: e.target.value,
        errorPercentSaleOff: "Vui lòng nhập phần trăm giảm giá",
      });
    } else {
      setPercentSaleOff({
        value: e.target.value,
        errorPercentSaleOff: undefined,
      });
    }
  };
  const handleAddImageFront = (e) => {
    e.preventDefault();
    const fileSelected = e.target.files[0];
    const fd = new FormData();
    fd.append("uploadFile", fileSelected);
    axios
      .post("//hientranbackend22.tk/products/addFile", fd)
      .then((res) => {
        setImageFront((pre) => {
          return { ...pre, img: res.data };
        });
      })
      .catch((aa) => {
        console.log("Khong Gui dc", aa);
      });
  };
  const handleAddImageBack = (e) => {
    e.preventDefault();
    const fileSelected = e.target.files[0];
    const fd = new FormData();
    fd.append("uploadFile", fileSelected);
    axios
      .post("//hientranbackend22.tk/products/addFile", fd)
      .then((res) => {
        setImageBack((pre) => {
          return { ...pre, img: res.data };
        });
      })
      .catch((aa) => {
        console.log("Khong Gui dc", aa);
      });
  };
  const handleAddImageDetail = (e) => {
    e.preventDefault();
    const fileSelected = e.target.files[0];
    const fd = new FormData();
    fd.append("uploadFile", fileSelected);
    axios
      .post("//hientranbackend22.tk/products/addFile", fd)
      .then((res) => {
        setImageDetail((pre) => {
          return { ...pre, img: res.data };
        });
      })
      .catch((aa) => {
        console.log("Khong Gui dc", aa);
      });
  };
  const handleAddProduct = (e) => {
    e.preventDefault();

    if (brand.value === "") {
      setBrand({ ...brand, errorBrand: "Vui lòng nhập thương hiệu" });
    }
    if (origin.value === "") {
      setOrigin({ ...brand, errorOrigin: "Vui lòng nhập xuất xứ" });
    }
    if (collar.value === "") {
      setCollar({ ...brand, errorCollar: "Vui lòng nhập cổ áo" });
    }
    if (fabricMaterial.value === "") {
      setFabricMaterial({
        ...fabricMaterial,
        errorFabricMaterial: "Vui lòng nhập chất liệu",
      });
    }
    if (size.value === "") {
      setSize({ ...size, errorSize: "Vui lòng nhập kích cỡ" });
    }
    if (color.value === "") {
      setColor({ ...color, errorColor: "Vui lòng nhập màu sắc" });
    }
    if (price.value === "") {
      setPrice({ ...price, errorPrice: "Vui lòng nhập giá tiền" });
    }
    if (quantity.value === "") {
      setQuantity({ ...quantity, errorQuantity: "Vui lòng nhập số lượng" });
    }
    if (percentSaleOff.value === "") {
      setPercentSaleOff({
        ...percentSaleOff,
        errorPercentSaleOff: "Vui lòng nhập phần trăm giảm giá",
      });
    }
    if (
      imageFront.img === "" ||
      imageBack.img === "" ||
      imageDetail.img === ""
    ) {
      toast.error("Cần chọn dầy đủ hình ảnh", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
    if (
      brand.value !== "" &&
      origin.value !== "" &&
      collar.value !== "" &&
      fabricMaterial.value !== "" &&
      size.value !== "" &&
      imageDetail.img !== "" &&
      imageBack.img !== "" &&
      imageFront.img !== ""
    ) {
      const fetchRequestGetAddProduct1 = async () => {
        try {
          const requestGetAddProduct1 = await productAdminApi.addProduct({
            title: nameProduct,
            desc: describe,
            brand: brand.value,
            image_front: imageFront.img,
            image_back: imageBack.img,
            category: category,
            origin: "Viet Nam",
            collar: collar.value,
            fabricMaterial: fabricMaterial.value,
          });
          console.log(requestGetAddProduct1);
          if (requestGetAddProduct1.status === 200) {
            const fetchRequestGetAddProduct2 = async () => {
              try {
                const requestGetAddProduct2 = await productAdminApi.addProduct2(
                  requestGetAddProduct1.data._id,
                  {
                    size: size.value,
                    price: {
                      original:
                        typeof price == "string"
                          ? price.value
                          : price.value.join(""),
                      discount: percentSaleOff.value / 100,
                      currency: "VNĐ",
                    },
                    color_image: {
                      color: color.value,
                      image: imageDetail.img || "",
                    },
                    countInStock: quantity.value,
                  }
                );
                console.log(requestGetAddProduct2);
                if (requestGetAddProduct2.status === 200) {
                  toast.success("Thêm sản phẩm thành công", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000,
                  });
                  setNameProduct("");
                  setBrand({ ...brand, value: "" });
                  setOrigin({ ...origin, value: "" });
                  setCollar({ ...collar, value: "" });
                  setFabricMaterial({ ...fabricMaterial, value: "" });
                  setImageFront({ ...imageFront, img: "" });
                  setImageBack({ ...imageBack, img: "" });
                  setImageDetail({ ...imageDetail, img: "" });
                  setPrice({ ...price, value: "" });
                  setDescribe("");
                  setColor({ ...color, value: "" });
                  setSize({ ...size, value: "" });
                  setDisable(false);
                }
              } catch (error) {
                console.log(error);
              }
            };
            fetchRequestGetAddProduct2();
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetAddProduct1();
    }
  };
  const [height_long, setHeight] = useState(false);
  useEffect(() => {
    if (arrayTitleProduct.length > 3) {
      setHeight(true);
    } else {
      setHeight(false);
    }
  }, [arrayTitleProduct]);
  console.log(imageFront);
  console.log(imageBack);
  console.log(imageDetail);
  console.log(disable);

  return (
    <div className="d-flex wrap">
      <AsideAdmin />
      <div className={style.addproduct_admin}>
        <div className={style.addproduct_admin_frame}>
          <h3>Thêm sản phẩm</h3>
          <form className={`${style.form}`}>
            <div className={style.form_left}>
              <div className={style.form_left1}>
                <div className={style.nameProductGroup}>
                  <Typography className={classes.title}>
                    Tên sản phẩm <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <input
                    type="text"
                    value={nameProduct}
                    onChange={handleNameProduct}
                    onFocus={handleFocusNameProduct}
                    onBlur={handleBlurNameProduct}
                    className={style.nameProduct}
                    placeholder="Nhập tên sản phẩm"
                  ></input>
                  {activeDropdown !== "" && (
                    <div
                      className={`${style.dropdownNameProduct} ${
                        height_long ? style.height_long : ""
                      }`}
                    >
                      <div className={style.listItemName}>
                        <div
                          className={style.itemName}
                          onClick={handleClickItemFirst}
                        >
                          {nameProduct} - Tìm kiếm trên hệ thống
                        </div>
                        {arrayTitleProduct?.map((data, idx) => {
                          console.log(data);
                          const parts = data.title.split(
                            new RegExp(`(${nameProduct})`, "gi")
                          );
                          const handleClickItemTitle = () => {
                            console.log(data);
                            setIdProduct(data._id);
                            setNameProduct(data.title);
                            setDescribe(data.desc);
                            setBrand({ ...brand, value: data.brand });
                            setOrigin({ ...origin, value: data.origin });
                            setCollar({ ...collar, value: data.collar });
                            setFabricMaterial({
                              ...fabricMaterial,
                              value: data.fabricMaterial,
                            });
                            setCategory(data.category);
                            setImageFront({ img: data.image_front });
                            setImageBack({ img: data.image_back });
                            setColor({ ...color, value: "" });
                            setSize({ ...size, value: "" });
                            setImageDetail({ ...imageDetail, img: "" });
                            setDisable(true);
                            setDisableColor(false);
                            setActiveDropdown("");
                          };
                          return (
                            <div
                              className={style.itemName}
                              key={idx}
                              onClick={handleClickItemTitle}
                            >
                              <div>
                                {parts.map((part, i) => {
                                  return (
                                    <span
                                      key={i}
                                      className={`${
                                        i % 2 === 1 ? style.hightlight : ""
                                      }`}
                                    >
                                      {part}
                                    </span>
                                  );
                                })}
                              </div>
                              <span className={style.image_namedropdown}>
                                <img
                                  src={data.image_front}
                                  alt="img title"
                                ></img>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="d-flex">
                  <div style={{ marginRight: "20px" }}>
                    <Typography className={classes.title}>
                      Thương hiệu <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <TextField
                      name="brand"
                      label="Nhập thương hiệu"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={brand.value}
                      onChange={handleBrand}
                      error={!!brand.errorBrand}
                      helperText={
                        brand.errorBrand !== undefined ? brand.errorBrand : ""
                      }
                      disabled={disable}
                    ></TextField>
                  </div>
                  <div style={{ marginRight: "20px" }}>
                    <Typography className={classes.title}>
                      Xuất xứ <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <TextField
                      name="origin"
                      label="Nhập xuất xứ"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={origin.value}
                      onChange={handleOrigin}
                      error={!!origin.errorOrigin}
                      helperText={
                        origin.errorOrigin !== undefined
                          ? origin.errorOrigin
                          : ""
                      }
                      disabled={disable}
                    />
                  </div>
                  <div>
                    <Typography className={classes.title}>
                      Cổ áo <span style={{ color: "red" }}>*</span>
                    </Typography>

                    <TextField
                      name="collar"
                      label="Nhập cổ áo"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={collar.value}
                      onChange={handlecollar}
                      inputRef={register}
                      error={!!collar.errorCollar}
                      helperText={
                        collar.errorCollar !== undefined
                          ? collar.errorCollar
                          : ""
                      }
                      disabled={disable}
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div style={{ marginRight: "20px" }}>
                    <Typography className={classes.title}>
                      Chất liệu <span style={{ color: "red" }}>*</span>
                    </Typography>

                    <TextField
                      name="fabricMaterial"
                      label="Nhập chất liệu"
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      value={fabricMaterial.value}
                      onChange={handleFabricMaterial}
                      error={!!fabricMaterial.errorFabricMaterial}
                      helperText={
                        fabricMaterial.errorFabricMaterial !== undefined
                          ? fabricMaterial.errorFabricMaterial
                          : ""
                      }
                      disabled={disable}
                    />
                  </div>
                  <div
                    // style={{ paddingRight: "165px" }}
                    style={{
                      paddingRight:
                        size.errorSize !== undefined ? "105px" : "165px",
                    }}
                  >
                    <Typography className={classes.title}>
                      Kích cỡ <span style={{ color: "red" }}>*</span>
                    </Typography>
                    <FormControl
                      variant="outlined"
                      name="size"
                      // inputRef={register}
                      error={!!size.errorSize}
                      style={{
                        width: size.errorSize !== undefined ? "165%" : "325%",
                        marginTop: "16px",
                      }}
                    >
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Chọn kích cỡ
                      </InputLabel>
                      <Select
                        name="size"
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={size.value}
                        inputRef={register}
                        error={!!size.errorSize}
                        onChange={handleSize}
                        label="Chọn Kích Cỡ"
                      >
                        <MenuItem value="M">M</MenuItem>
                        <MenuItem value="L">L</MenuItem>
                        <MenuItem value="XL">XL</MenuItem>
                        <MenuItem value="2XL">2XL</MenuItem>
                        <MenuItem value="3XL">3XL</MenuItem>
                      </Select>
                      {size.errorSize !== undefined && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            marginTop: "2px",
                            paddingLeft: "12px",
                            color: "#f44336",
                            fontWeight: "400",
                          }}
                        >
                          {size.errorSize}
                        </span>
                      )}
                    </FormControl>
                  </div>
                  <div>
                    <Typography className={classes.title}>
                      Màu sắc <span style={{ color: "red" }}>*</span>
                    </Typography>

                    <FormControl
                      variant="outlined"
                      name="size"
                      error={!!color.errorColor}
                      style={{
                        width: color.errorColor !== undefined ? "158%" : "292%",
                        marginTop: "16px",
                      }}
                    >
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Chọn màu sắc
                      </InputLabel>
                      <Select
                        name="size"
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={color.value}
                        error={!!color.errorColor}
                        onChange={handleColor}
                        label=" Chọn màu sắc"
                      >
                        <MenuItem value="Xanh lá">Xanh lá</MenuItem>
                        <MenuItem value="Đỏ">Đỏ</MenuItem>
                        <MenuItem value="Đen">Đen</MenuItem>{" "}
                        <MenuItem value="Trắng">Trắng</MenuItem>
                        <MenuItem value="Xanh dương">Xanh dương</MenuItem>{" "}
                        <MenuItem value="Nâu">Nâu</MenuItem>{" "}
                        <MenuItem value="Cam">Cam</MenuItem>{" "}
                        <MenuItem value="Hồng">Hồng</MenuItem>
                        <MenuItem value="Vàng">Vàng</MenuItem>
                        <MenuItem value="Tím">Tím</MenuItem>
                        <MenuItem value="Xám">Xám</MenuItem>
                      </Select>
                      {color.errorColor !== undefined && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            marginTop: "2px",
                            paddingLeft: "12px",
                            color: "#f44336",
                            fontWeight: "400",
                          }}
                        >
                          {color.errorColor}
                        </span>
                      )}
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className={style.form_left2}>
                <div className={style.image}>
                  <Typography className={classes.title}>
                    Hình ảnh trước <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <div className={style.image_product_group}>
                    {!disable && (
                      <span
                        className={`${style.select}`}
                        style={{ fontSize: "14px" }}
                      >
                        <i
                          class="fas fa-camera"
                          style={{ marginRight: "0px" }}
                        ></i>
                        Chọn ảnh
                        <input
                          type="file"
                          onChange={handleAddImageFront}
                          multiple
                        />
                      </span>
                    )}
                    <div className={style.image_product}>
                      {imageFront.img !== "" && (
                        <img src={imageFront.img} alt="image_product" />
                      )}
                    </div>
                  </div>
                </div>
                <div className={style.image}>
                  <Typography className={classes.title}>
                    Hình ảnh sau <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <div className={style.image_product_group}>
                    {!disable && (
                      <span
                        className={style.select}
                        style={{ fontSize: "14px" }}
                      >
                        <i
                          class="fas fa-camera"
                          style={{ marginRight: "0px" }}
                        ></i>{" "}
                        Chọn ảnh
                        <input
                          type="file"
                          onChange={handleAddImageBack}
                          multiple
                          // onFocus={InputHandler}
                        />
                      </span>
                    )}

                    <div className={style.image_product}>
                      {imageBack.img !== "" && (
                        <img src={imageBack.img} alt="image_product" />
                      )}
                    </div>
                  </div>
                </div>
                {/* Anh chi tiet */}
                <div className={style.image}>
                  <Typography className={classes.title}>
                    Hình ảnh chi tiết <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <div className={style.image_product_group}>
                    {!disableColor && (
                      <span
                        className={style.select}
                        style={{ fontSize: "14px" }}
                      >
                        <i
                          class="fas fa-camera"
                          style={{ marginRight: "0px" }}
                        ></i>{" "}
                        Chọn ảnh
                        <input
                          type="file"
                          onChange={handleAddImageDetail}
                          multiple
                          // onFocus={InputHandler}
                        />
                      </span>
                    )}

                    <div className={style.image_product}>
                      {imageDetail.img !== "" && (
                        <img src={imageDetail.img} alt="image_product" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.form_left3}>
                <div className={style.describe}>
                  <Typography className={classes.title}>
                    Mô tả <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <textarea
                    rows="4"
                    cols="38"
                    placeholder="Write your message"
                    onChange={handleDescribe}
                    className={`${style.area} pt-3`}
                    value={describe}
                    disabled={disable}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={style.form_right}>
              <div className={style.form_right1}>
                <div>
                  <Typography className={classes.title}>
                    Giá <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    name="price"
                    label="Nhập giá tiền"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={price.value}
                    onChange={handlePrice}
                    error={!!price.errorPrice}
                    helperText={
                      price.errorPrice !== undefined ? price.errorPrice : ""
                    }
                  />
                </div>{" "}
                <div>
                  <Typography className={classes.title}>
                    Phần trăm giảm giá <span style={{ color: "red" }}>*</span>
                  </Typography>

                  <TextField
                    name="percentSaleOff"
                    label="Nhập phần trăm giảm giá"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={percentSaleOff.value}
                    onChange={handlePercentSaleOff}
                    error={!!percentSaleOff.errorPercentSaleOff}
                    helperText={
                      percentSaleOff.errorPercentSaleOff !== undefined
                        ? percentSaleOff.errorPercentSaleOff
                        : ""
                    }
                  />
                </div>
                <div>
                  <Typography className={classes.title}>
                    Số lượng <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    name="quantity"
                    label="Nhập số lượng"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={quantity.value}
                    onChange={handleQuantity}
                    error={!!quantity.errorQuantity}
                    helperText={
                      quantity.errorQuantity !== undefined
                        ? quantity.errorQuantity
                        : ""
                    }
                  />
                </div>
                <div>
                  <span>
                    Loại
                    {dataTypeProduct?.map((data, idx) => {
                      const handleTypeProduct = () => {
                        setCategory(data._id);
                      };

                      return (
                        <div
                          className={`${style.radiobutton} d-flex align-items-center`}
                          key={idx}
                        >
                          <input
                            type="radio"
                            // name="typeProduct"
                            name={`typeProduct-${idx}`}
                            id={data.name}
                            onChange={handleTypeProduct}
                            checked={category === data._id}
                            disabled={category === data._id ? true : false}
                          />
                          <label htmlFor={data.name}>{data.name}</label>
                        </div>
                      );
                    })}
                  </span>
                </div>
              </div>{" "}
              <div style={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  className={classes.submit}
                  onClick={handleAddProduct}
                >
                  Thêm sản phẩm
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductAdmin;
