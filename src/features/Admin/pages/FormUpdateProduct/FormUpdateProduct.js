import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import typeProductApi from "api/typeProductApi";
import React, { useContext, useEffect, useState } from "react";
import style from "./FormUpdateProduct.module.scss";
import productAdminApi from "api/admin/productAdminApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import productApi from "api/productApi";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  // emailInput: { padding: theme.spacing(2) },
  title: {
    color: "#444",
    marginBottom: "-10px",
  },
  submit: {
    background: "black",
    width: "170px",
    height: "50px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "20px",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
}));
function FormUpdateProduct(props) {
  const [dataTypeProduct, setDataTypeProduct] = useState();
  const classes = useStyles();
  const [isOpenForm, setIsOpenForm] = useState("");
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    if (props.isForm) {
      setIsOpenForm(style.active);
    } else {
      setIsOpenForm("");
    }
  }, [props.isForm]);
  const cancelHandler = () => {
    setIsOpenForm("");
    props.onFormFalse(false);
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

  const [name, setName] = useState({ value: "", errorName: undefined });
  const [brand, setBrand] = useState({ value: "", errorBrand: undefined });
  const [origin, setOrigin] = useState({ value: "", errorOrigin: undefined });
  const [collar, setCollar] = useState({ value: "", errorCollar: undefined });
  const [fabricMaterial, setFabricMaterial] = useState({
    value: "",
    errorFabricMaterial: undefined,
  });
  const [desc, setDesc] = useState({ value: "", errorDesc: undefined });
  const [category, setCategory] = useState();
  const [imageFront, setImageFront] = useState({ img: "" });
  const [imageBack, setImageBack] = useState({ img: "" });
  const handleName = (e) => {
    if (e.target.value === "") {
      setName({
        value: e.target.value,
        errorName: "Vui lòng nhập tên sản phẩm",
      });
    } else {
      setName({ value: e.target.value, errorName: undefined });
    }
  };
  const handleBrand = (e) => {
    if (e.target.value === "") {
      setBrand({
        value: e.target.value,
        errorBrand: "Vui lòng nhập thương hiệu",
      });
    } else {
      setBrand({ value: e.target.value, errorBrand: undefined });
    }
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

  useEffect(() => {
    setName({ ...name, value: props.dataProduct.title });
    setBrand({ ...brand, value: props.dataProduct.brand });
    setOrigin({ ...origin, value: props.dataProduct.origin });
    setCollar({ ...collar, value: props.dataProduct.collar });
    setFabricMaterial({
      ...fabricMaterial,
      value: props.dataProduct.fabricMaterial,
    });
    setDesc({ ...desc, value: props.dataProduct.desc });
    setCategory(props.dataProduct.category);
    setImageFront({ img: props.dataProduct.image_front });
    setImageBack({ img: props.dataProduct.image_back }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataProduct]);

  const handleUpdateProduct = () => {
    if (
      brand.value !== "" &&
      origin.value !== "" &&
      collar.value !== "" &&
      fabricMaterial.value !== "" &&
      imageBack.img !== "" &&
      imageFront.img !== "" &&
      category !== ""
    ) {
      const fetchRequestUpdateProduct = async () => {
        try {
          const requestUpdateProduct = await productAdminApi.updateProduct(
            props.dataProduct._id,
            {
              title: name.value,
              desc: desc.value,
              brand: brand.value,
              image_front: imageFront.img,
              image_back: imageBack.img,
              category: category,
              origin: origin.value,
              collar: collar.value,
              fabricMaterial: fabricMaterial.value,
            }
          );
          console.log(requestUpdateProduct);
          if (requestUpdateProduct.status === 200) {
            dispatch({
              type: ACTIOS.loadingAllProduct,
              payload: true,
            });
            props.onFormFalse(false);
            const fetchRequestGetAllProduct = async () => {
              try {
                const requestGetAllProduct = await productApi.getAllProduct();

                dispatch({
                  type: ACTIOS.dataAllProduct,
                  payload: requestGetAllProduct.data,
                });
                dispatch({
                  type: ACTIOS.loadingAllProduct,
                  payload: false,
                });
              } catch (error) {
                console.log(error);
              }
            };
            fetchRequestGetAllProduct();
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestUpdateProduct();
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
  return (
    <div className={style.modalView}>
      <div className={`${style.backdropViewInformation} ${isOpenForm}`}></div>
      <div className={`${style.viewInformation} ${isOpenForm}`}>
        <div className={style.header}>
          <p>Cập nhật thông tin sản phẩm</p>
          <div onClick={cancelHandler}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className={style.formUpdateProduct}>
          <div className={`${style.form0} d-flex justify-content-between`}>
            <div className={`${style.image}`}>
              <Typography className={classes.title}>
                Hình ảnh trước <span style={{ color: "red" }}>*</span>
              </Typography>
              <div className={style.image_product_group}>
                <span className={style.select}>
                  <i class="fas fa-camera" style={{ marginRight: "5px" }}></i>{" "}
                  Chọn ảnh
                  <input type="file" onChange={handleAddImageFront} multiple />
                </span>
                <div className={style.image_product}>
                  <img src={imageFront.img} alt="image_product" />
                </div>
              </div>
            </div>
            <div className={style.image}>
              <Typography className={classes.title}>
                Hình ảnh sau <span style={{ color: "red" }}>*</span>
              </Typography>
              <div className={style.image_product_group}>
                <span className={style.select}>
                  <i class="fas fa-camera" style={{ marginRight: "5px" }}></i>{" "}
                  Chọn ảnh
                  <input
                    type="file"
                    onChange={handleAddImageBack}
                    multiple
                    // onFocus={InputHandler}
                  />
                </span>
                <div className={style.image_product}>
                  <img src={imageBack.img} alt="image_product" />
                </div>
              </div>
            </div>
          </div>
          <div className={style.form1_form2}>
            <div className={`${style.form1} d-flex`}>
              <div style={{ marginRight: "20px" }}>
                <Typography className={classes.title}>
                  Tên sản phẩm <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  name="origin"
                  label="Nhập tên sản phẩm"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={name.value}
                  onChange={handleName}
                  error={!!name.errorName}
                  helperText={
                    name.errorName !== undefined ? name.errorName : ""
                  }
                />
              </div>
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
                ></TextField>
              </div>
              <div>
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
                    origin.errorOrigin !== undefined ? origin.errorOrigin : ""
                  }
                />
              </div>
            </div>
            <div className={`${style.form2} d-flex`}>
              <div style={{ marginRight: "20px" }}>
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
                  error={!!collar.errorCollar}
                  helperText={
                    collar.errorCollar !== undefined ? collar.errorCollar : ""
                  }
                />
              </div>
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
                />
              </div>
            </div>
          </div>

          <div className={`${style.form3} d-flex`}>
            <div className={style.describe}>
              <Typography className={classes.title}>
                Mô tả <span style={{ color: "red" }}>*</span>
              </Typography>
              <textarea
                rows="4"
                cols="50"
                placeholder="Nhập mô tả"
                // onChange={handleDescribe}
                className={`${style.area} pt-3`}
                value={desc.value}
              ></textarea>
            </div>
            <div
              className={`${style.typeproduct} d-flex flex-column`}
              style={{ width: "40%" }}
            >
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
                        name={`typeProduct-${idx}`}
                        id={data.name}
                        onChange={handleTypeProduct}
                        checked={category === data._id}
                        // disabled={category === data._id ? true : false}
                      />
                      <label htmlFor={data.name}>{data.name}</label>
                    </div>
                  );
                })}
              </span>{" "}
              <div style={{ textAlign: "right" }}>
                <Button
                  type="submit"
                  className={classes.submit}
                  onClick={handleUpdateProduct}
                >
                  Cập nhật sản phẩm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormUpdateProduct;
