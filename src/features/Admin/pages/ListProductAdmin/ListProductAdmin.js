import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useContext, useEffect, useState } from "react";
import style from "./ListProductAdmin.module.scss";
import { useNavigate } from "react-router-dom";
import productApi from "api/productApi";
import ItemProductAdmin from "./ItemProductAdmin/ItemProductAdmin";
import { TextField } from "@material-ui/core";
import FormUpdateProduct from "../FormUpdateProduct/FormUpdateProduct";
import ListItemProductAdmin from "./ListItemProductAdmin/ListItemProductAdmin";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import Loading from "components/Loading";
import { Pagination } from "@material-ui/lab";
import productAdminApi from "api/admin/productAdminApi";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ul: {
    "& .MuiPaginationItem-root": {
      // color: "#ba933e",
      // background: "#ba933e",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      background: "#ba933e",
      color: "#fff",
    },
  },
  search: {
    background: "black",
    width: "100px",
    height: "40px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "30px",
    marginLeft: "20px",
    // fontSize: "15px",
    fontWeight: "500",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
  searchAll: {
    background: "black",
    width: "200px",
    height: "40px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "25px",
    marginLeft: "640px",
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
function ListProductAdmin(props) {
  const classes = useStyles();

  const [dataProduct, setDataProduct] = useState([]);
  const { dispatch, state } = useContext(GlobalContext);

  let navigate = useNavigate();

  const handleLinkAddProduct = () => {
    navigate("/admin/addproduct");
  };

  const [pagination, setPagination] = useState({
    limit: 2,
    total: 10,
    page: 1,
  });
  useEffect(() => {
    dispatch({
      type: ACTIOS.loadingAllProduct,
      payload: true,
    });
    const fetchRequestGetAllProduct = async () => {
      try {
        const requestGetAllProduct = await productAdminApi.getAllProduct(
          state.filterPagination._page,
          state.filterPagination._limit
        );
        setPagination(requestGetAllProduct.pagination);
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
  }, [state.filterPagination._page, state.filterPagination._limit]);
  const handlePageChange = (e, page) => {
    // setFilters({ _limit: 2, _page: page });
    dispatch({
      type: ACTIOS.filterPagination,
      payload: { _limit: 2, _page: page },
    });
  };

  const [title, setTitle] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleSearchTitle = (e) => {
    setTitle(e.target.value);
    // const fetchRequestGetProductByTitle = async () => {
    //   try {
    //     const requestGetAllProduct =
    //       await productAdminApi.getAllProductBySearchTitle(
    //         e.target.value,
    //         state.filterPagination._page,
    //         state.filterPagination._limit
    //       );
    //     console.log(requestGetAllProduct);
    //     dispatch({
    //       type: ACTIOS.dataAllProduct,
    //       payload: requestGetAllProduct.data,
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchRequestGetProductByTitle();
  };
  const handleSearch = () => {
    setLoadingSearch(true);
    const fetchRequestGetProductByTitle = async () => {
      try {
        const requestGetAllProduct =
          await productAdminApi.getAllProductBySearchTitle(
            title,
            state.filterPagination._page,
            state.filterPagination._limit
          );
        dispatch({
          type: ACTIOS.dataAllProduct,
          payload: requestGetAllProduct.data,
        });
        setLoadingSearch(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetProductByTitle();
  };
  const [loadingAll, setLoadingAll] = useState(false);
  const handleLoadingAll = () => {
    setLoadingAll(true);
    const fetchRequestGetAllProduct = async () => {
      try {
        const requestGetAllProduct = await productAdminApi.getAllProduct(
          state.filterPagination._page,
          state.filterPagination._limit
        );
        setPagination(requestGetAllProduct.pagination);
        dispatch({
          type: ACTIOS.dataAllProduct,
          payload: requestGetAllProduct.data,
        });
        setLoadingAll(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllProduct();
  };
  return (
    <div className="d-flex wrap">
      <AsideAdmin />
      <div className={style.listproduct_admin}>
        <div className={style.listproduct_admin_frame}>
          <div className={style.title_add_listproduct}>
            <span className={style.title_listproduct}>Danh sách sản phẩm</span>
            <span className={style.add_product} onClick={handleLinkAddProduct}>
              <i class="fas fa-plus-circle" style={{ marginRight: "10px" }}></i>
              Tạo mới
            </span>
          </div>
          <div className={`${style.searchListProduct} d-flex `}>
            <div className={`${style.searchNameProduct} d-flex flex-column`}>
              <h6> Lọc theo tên</h6>
              <input
                type="text"
                className={style.nameProduct}
                placeholder="Nhập tên sản phẩm"
                onChange={handleSearchTitle}
                value={title}
              ></input>
            </div>
            <div>
              <Button
                type="submit"
                className={classes.search}
                onClick={handleSearch}
              >
                {loadingSearch ? (
                  <div
                    class="spinner-border"
                    role="status"
                    style={{ width: "22px", height: "22px" }}
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <>
                    <i class="fas fa-search" style={{ marginRight: "5px" }}></i>
                    Tìm
                  </>
                )}
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                className={classes.searchAll}
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
                    <i class="fas fa-gift" style={{ marginRight: "10px" }}></i>
                    Hiển thị toàn bộ
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className={style.listproduct}>
            <div className={style.title_item_product}>
              <span className={style.title_image_item}>Hình ảnh</span>
              <span
                className={`${style.title_name_item}  d-flex justify-content-center`}
              >
                Tên sản phẩm
              </span>
              <span
                className={`${style.title_brand} d-flex justify-content-center`}
              >
                Thương hiệu
              </span>
              <span
                className={`${style.title_collar} d-flex justify-content-center`}
              >
                Cổ áo
              </span>
              <span
                className={`${style.title_fabricMaterial} d-flex justify-content-center`}
              >
                Chất liệu
              </span>
              <span
                className={`${style.title_origin} d-flex justify-content-center`}
              >
                <span>Xuất xứ</span>
              </span>
              <span
                className={`${style.title_close} d-flex justify-content-center`}
              >
                <i className="fas fa-ellipsis-h"></i>
              </span>
            </div>
            <div className={`${style.list_item_product}`}>
              {state.loadingAllProduct ? <Loading /> : <ListItemProductAdmin />}
            </div>
            <div
              className={`${style.pagination} d-flex justify-content-center`}
            >
              <Pagination
                classes={{ ul: classes.ul }}
                count={Math.ceil(pagination?.total / pagination.limit)}
                page={pagination?.page}
                onChange={handlePageChange}
              ></Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProductAdmin;
