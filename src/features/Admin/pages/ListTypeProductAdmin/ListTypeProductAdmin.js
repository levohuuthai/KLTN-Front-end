import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useContext, useEffect, useState } from "react";
import style from "./ListTypeProductAdmin.module.scss";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import typeProductAdminApi from "api/admin/typeProductAdminApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import ItemTypeProductAdmin from "./ItemTypeProductAdmin/ItemTypeProductAdmin";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
const useStyles = makeStyles((theme) => ({
  title: {
    color: "#444",
    marginBottom: "-10px",
  },
  submit: {
    background: "black",
    width: "180px",
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
function ListTypeProductAdmin(props) {
  const { dispatch, state } = useContext(GlobalContext);
  const [imageTypeProduct, setImageTypeProduct] = useState({ img: "" });

  const classes = useStyles();
  useEffect(() => {
    const fetchRequestGetAllTypeProdcut = async () => {
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
    fetchRequestGetAllTypeProdcut();
  }, []);
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
  const [nameTypeProduct, setNameTypeProduct] = useState({
    value: "",
    errorNameTypeProduct: undefined,
  });
  const [searchName, setSearchName] = useState("");

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
  const handleSearchNameTypeProduct = (e) => {
    setSearchName(e.target.value);
    const fetchRequestGetNameTypeProduct = async () => {
      try {
        const requestGetNameTypeProduct =
          await typeProductAdminApi.getNameTypeProduct(e.target.value);
        console.log(requestGetNameTypeProduct);
        // dispatch({
        //   type: ACTIOS.dataAllTypeProduct,
        //   payload: requestGetNameTypeProduct.data,
        // });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetNameTypeProduct();
  };
  const handleAddTypeProduct = (e) => {
    e.preventDefault();
    if (nameTypeProduct.value === "") {
      setNameTypeProduct({
        ...nameTypeProduct,
        errorNameTypeProduct: "Vui lòng nhập tên sản phẩm",
      });
    }
    if (nameTypeProduct.value !== "" && imageTypeProduct.img !== "") {
      const fetchRequestAddTypeProduct = async () => {
        try {
          const requestAddTypeProduct =
            await typeProductAdminApi.addTypeProduct({
              name: nameTypeProduct.value,
              image: imageTypeProduct.img,
            });
          console.log(requestAddTypeProduct);
          if (requestAddTypeProduct.status === 200) {
            props.onFormFalse(false);
            const fetchRequestGetAllTypeProduct = async () => {
              try {
                const requestGetAllTypeProduct =
                  await typeProductAdminApi.getAllTypeProduct();
                dispatch({
                  type: ACTIOS.dataAllTypeProduct,
                  payload: requestGetAllTypeProduct.data,
                });
                toast.success("Thêm loại sản phẩm thành công", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 2000,
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
      fetchRequestAddTypeProduct();
    } else {
      toast.error("Cần nhập tên sản phẩm và chọn ảnh", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
    }
  };
  console.log(imageTypeProduct.img);
  return (
    <div className="d-flex wrap">
      <AsideAdmin />
      <div className={style.listtypeproduct_admin}>
        <div className={style.listtypeproduct_admin_left}>
          <div className={style.listtypeproduct_admin_frame1}>
            <h4>Tìm kiếm loại sản phẩm</h4>
            <div className={style.frame1}>
              <Typography className={classes.title}>
                Tên loại sản phẩm <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                name="brand"
                label="Nhập tên loại sản phẩm"
                margin="normal"
                variant="outlined"
                fullWidth
                value={searchName}
                onChange={handleSearchNameTypeProduct}
              ></TextField>
            </div>
          </div>

          <div className={style.listtypeproduct_admin_frame3}>
            <h4>Danh sách loại sản phẩm(5)</h4>
            <div className={style.listtypeproduct}>
              <div className={style.title_item_typeproduct}>
                <span className={style.title_image_item}>Hình ảnh</span>
                <span
                  className={`${style.title_name_item}  d-flex justify-content-center`}
                >
                  Tên loại sản phẩm
                </span>
                <span
                  className={`${style.title_close} d-flex justify-content-center`}
                >
                  <i className="fas fa-ellipsis-h"></i>
                </span>
              </div>
              <div className={`${style.list_item_typeproduct}`}>
                {state.dataAllTypeProduct?.map((data, idx) => {
                  return (
                    <div key={idx}>
                      <ItemTypeProductAdmin data={data} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className={style.listtypeproduct_admin_right}>
          <div className={style.listtypeproduct_admin_frame2}>
            <h4>Thêm loại sản phẩm</h4>
            <div
              className={`${style.frame2} ${
                imageTypeProduct.img !== "" ? style.active_image : ""
              }`}
            >
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
                    Chọn ảnh
                    <input
                      type="file"
                      onChange={handleAddImageTypeProduct}
                      multiple
                      // onFocus={InputHandler}
                    />
                  </span>
                  {imageTypeProduct.img !== "" && (
                    <div className={style.image_product}>
                      <img src={imageTypeProduct.img} alt="image_product" />
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  className={classes.submit}
                  onClick={handleAddTypeProduct}
                >
                  Thêm loại sản phẩm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListTypeProductAdmin;
