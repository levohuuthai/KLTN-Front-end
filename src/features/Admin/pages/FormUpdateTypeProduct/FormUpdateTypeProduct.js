import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import style from "./FormUpdateTypeProduct.module.scss";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import typeProductAdminApi from "api/admin/typeProductAdminApi";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#444",
    marginBottom: "-10px",
  },
  submit: {
    background: "black",
    width: "140px",
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
function FormUpdateTypeProduct(props) {
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

  const [nameTypeProduct, setNameTypeProduct] = useState({
    value: "",
    errorNameTypeProduct: undefined,
  });
  const [imageTypeProduct, setImageTypeProduct] = useState({ img: "" });
  const handleAddImageTypeProduct = (e) => {
    e.preventDefault();
    const fileSelected = e.target.files[0];
    const fd = new FormData();
    fd.append("uploadFile", fileSelected);
    axios
      .post("//localhost:3333/products/addFile", fd)
      .then((res) => {
        console.log(res);
        setImageTypeProduct((pre) => {
          return { ...pre, img: res.data };
        });
      })
      .catch((aa) => {
        console.log("Khong Gui dc", aa);
      });
  };
  const handleNameTypeProduct = (e) => {
    if (e.target.value === "") {
      setNameTypeProduct({
        value: e.target.value,
        errorNameTypeProduct: "Vui lòng nhập tên loại sản phẩm",
      });
    } else {
      setNameTypeProduct({
        value: e.target.value,
        errorNameTypeProduct: undefined,
      });
    }
  };
  useEffect(() => {
    setNameTypeProduct({
      ...nameTypeProduct,
      value: props.dataTypeProduct?.name,
    });
    setImageTypeProduct({
      ...imageTypeProduct,
      img: props.dataTypeProduct?.image,
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dataTypeProduct]);

  const handleUpdateTypeProduct = (e) => {
    e.preventDefault();
    const fetchRequestUpdateTypeProduct = async () => {
      try {
        const requestUpdateTypeProduct =
          await typeProductAdminApi.updateTypeProduct(
            props.dataTypeProduct._id,
            {
              name: nameTypeProduct.value,
              image: imageTypeProduct.img,
            }
          );
        if (requestUpdateTypeProduct.status === 200) {
          props.onFormFalse(false);
          const fetchRequestGetAllTypeProduct = async () => {
            try {
              const requestGetAllTypeProduct =
                await typeProductAdminApi.getAllTypeProduct();
              dispatch({
                type: ACTIOS.dataAllTypeProduct,
                payload: requestGetAllTypeProduct.data,
              });
            } catch (error) {
              console.log(error);
            }
          };
          fetchRequestGetAllTypeProduct();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestUpdateTypeProduct();
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
        <div className={style.formUpdateTypeProduct}>
          <div className={style.nameTypeproduct}>
            <Typography className={classes.title}>
              Tên loại sản phẩm <span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              name="brand"
              label="Nhập tên loại sản phẩm"
              margin="normal"
              variant="outlined"
              fullWidth
              value={nameTypeProduct.value}
              onChange={handleNameTypeProduct}
              error={!!nameTypeProduct.errorNameTypeProduct}
              helperText={
                nameTypeProduct.errorNameTypeProduct !== undefined
                  ? nameTypeProduct.errorNameTypeProduct
                  : ""
              }
            ></TextField>
          </div>
          <div className={style.image}>
            <Typography className={classes.title}>
              Hình ảnh <span style={{ color: "red" }}>*</span>
            </Typography>
            <div className={style.image_product_group}>
              <span className={style.select}>
                <i class="fas fa-camera" style={{ marginRight: "5px" }}></i>{" "}
                Chọn ảnh
                <input
                  type="file"
                  onChange={handleAddImageTypeProduct}
                  multiple
                  // onFocus={InputHandler}
                />
              </span>
              <div className={style.image_product}>
                <img src={imageTypeProduct.img} alt="image_product" />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              className={classes.submit}
              onClick={handleUpdateTypeProduct}
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormUpdateTypeProduct;
