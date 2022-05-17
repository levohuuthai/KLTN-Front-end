import React, { useContext, useEffect, useState } from "react";
import ProductFilter from "features/Product/components/ProductFilter/ProductFilter";
import style from "./ListPage.module.scss";
import ProductList from "features/Product/components/ProductList/ProductList";
import ProductSkeletonList from "features/Product/components/ProductSkeletonList/ProductSkeletonList";
import productApi from "../../../../api/productApi";
import imgbackground4 from "assets/images/auth/login/imgbackground4.jpg";
import { useLocation } from "react-router-dom";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import FilterByType from "features/Product/components/Filters/FilterByType/FilterByType";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  ul: {
    "& .MuiPaginationItem-page.Mui-selected": {
      background: "#ba933e",
      color: "#fff",
    },
  },
}));
function ListPage(props) {
  const classes = useStyles();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [dataArrayBrand, setDataArrayBrand] = useState([]);
  const [dataArraySize, setDataArrayySize] = useState([]);
  const [dataArrayColor, setDataArrayColor] = useState([]);
  // const [dataTypeProduct, setDataTypeProduct] = useState("");

  const location = useLocation();
  const nameTypeProduct = location.state?.nameTypeProduct;
  const dataArrayTypeProduct = location.state?.dataArrayTypeProduct;
  const { dispatch, state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchRequestGetAllSizeByCategory = async () => {
      try {
        const requestGetAllSizeByCategory = await productApi.getAllSize(
          nameTypeProduct
        );
        setDataArrayySize(requestGetAllSizeByCategory.data.sizes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllSizeByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchRequestGetAllColorByCategory = async () => {
      try {
        const requestGetAllColorByCategory = await productApi.getAllColor(
          nameTypeProduct
        );
        setDataArrayColor(requestGetAllColorByCategory.data.colors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllColorByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchRequestGetAllBrandByCategory = async () => {
      try {
        const requestGetAllBrandByCategory = await productApi.getAllBrand(
          nameTypeProduct
        );
        setDataArrayBrand(requestGetAllBrandByCategory.data.brands);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetAllBrandByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReciveDataFilter = (data) => {
    // let arrayDataFilter = data.split(",");
    // setDataFilter(arrayDataFilter);
  };

  const handleReceiveDataType = (dataType) => {
    // setDataTypeProduct(dataType);
  };

  const handlePageChange = (e, page) => {
    dispatch({
      type: ACTIOS.page_limit_ByProduct,
      payload: { _limit: 10, _page: page },
    });
  };
  // console.log(state.filterPagination);
  useEffect(() => {
    if (
      state.dataFilterBrand.length +
        state.dataFilterSize.length +
        state.dataFilterColor.length +
        (!state.dataFilterPriceUnder200.active ? 0 : 1) +
        (!state.dataFilterPriceOver1000.active ? 0 : 1) +
        (!state.dataFilterPrice200To500.active ? 0 : 1) +
        (!state.dataFilterPrice200To500.active500To1000 ? 0 : 1) +
        state.dataFilterStyle.length +
        (!state.dataFilterStar.active ? 0 : 1) +
        (!state.dataFilterStar.active4 ? 0 : 1) +
        (!state.dataFilterStar.active3 ? 0 : 1) +
        (!state.dataFilterStar.active2 ? 0 : 1) ===
      0
    ) {
      console.log("ko loc");

      const fetchRequestGetAllProductByCategory = async () => {
        try {
          const requestGetAllProductByCategory =
            await productApi.getAllProductByCategory(
              nameTypeProduct,
              state.page_limit_ByProduct._page,
              state.page_limit_ByProduct._limit
            );
          console.log(requestGetAllProductByCategory);
          await dispatch({
            type: ACTIOS.dataProductFilter,
            payload: requestGetAllProductByCategory.data,
          });
          dispatch({
            type: ACTIOS.paginationByFilterProduct,
            payload: requestGetAllProductByCategory.pagination,
          });
          dispatch({
            type: ACTIOS.loading,
            payload: false,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetAllProductByCategory();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.dataFilterBrand,
    state.dataFilterSize,
    state.dataFilterColor,
    state.dataFilterPriceUnder200,
    state.dataFilterPriceOver1000,
    state.dataFilterPrice200To500,
    state.dataFilterStyle,
    state.dataFilterStar,
    state.page_limit_ByProduct,
  ]);
  const handleCancelPriceUnder200 = () => {
    dispatch({
      type: ACTIOS.dataFilterPriceUnder200,
      payload: { value: 199999, active: false },
    });
  };
  const handleCancelPriceOver1000 = () => {
    dispatch({
      type: ACTIOS.dataFilterPriceOver1000,
      payload: { value: 1000001, active: false },
    });
  };
  const handleCancelPrice500To1000 = () => {
    dispatch({
      type: ACTIOS.dataFilterPrice200To500,
      payload: {
        priceMin: undefined,
        priceMax: undefined,
        active: false,
        active500To1000: false,
      },
    });
  };
  const handleCancel5star = () => {
    dispatch({
      type: ACTIOS.dataFilterStar,
      payload: {
        value: 5,
        active: false,
        active4: false,
        active3: false,
        active2: false,
      },
    });
  };
  const handleCancel4star = () => {
    dispatch({
      type: ACTIOS.dataFilterStar,
      payload: {
        value: 4,
        active: false,
        active4: false,
        active3: false,
        active2: false,
      },
    });
  };
  const handleCancel3star = () => {
    dispatch({
      type: ACTIOS.dataFilterStar,
      payload: {
        value: 3,
        active: false,
        active4: false,
        active3: false,
        active2: false,
      },
    });
  };
  const handleCancel2star = () => {
    dispatch({
      type: ACTIOS.dataFilterStar,
      payload: {
        value: 2,
        active: false,
        active4: false,
        active3: false,
        active2: false,
      },
    });
  };
  return (
    <div>
      <div className={`${style.background_slider} `}>
        <div className={style.imgbackground}>
          <img src={imgbackground4} alt="" />
        </div>
        <div className={style.title_background}>
          Sản phẩm
          <p>
            Trang chủ /
            {state.dataFilterStyle.length > 0
              ? state.dataFilterStyle.join(" và ")
              : nameTypeProduct}
          </p>
        </div>
      </div>
      <div className={`${style.listPage} wrap d-flex`}>
        <div className={style.left}>
          <div className="d-flex justify-content-between ">
            <p>
              ĐÃ LỌC (
              {state.dataFilterBrand.length +
                state.dataFilterSize.length +
                state.dataFilterColor.length +
                (!state.dataFilterPriceUnder200.active ? 0 : 1) +
                (!state.dataFilterPriceOver1000.active ? 0 : 1) +
                (!state.dataFilterPrice200To500.active ? 0 : 1) +
                (!state.dataFilterPrice200To500.active500To1000 ? 0 : 1) +
                state.dataFilterStyle.length +
                (!state.dataFilterStar.active ? 0 : 1) +
                (!state.dataFilterStar.active2 ? 0 : 1) +
                (!state.dataFilterStar.active3 ? 0 : 1) +
                (!state.dataFilterStar.active4 ? 0 : 1)}
              )
            </p>
            <p className={style.cancel_all}>Xóa hết</p>
          </div>
          <div className={style.list_element_filtered}>
            {state.dataFilterBrand?.map((data, idx) => {
              const handleCancelElement = () => {
                let prev = state.dataFilterBrand;
                let itemIndex = prev.indexOf(data);
                if (itemIndex !== -1) {
                  prev.splice(itemIndex, 1);
                }
                dispatch({
                  type: ACTIOS.dataFilterBrand,
                  payload: [...prev],
                });
              };
              return data === "" ? (
                ""
              ) : (
                <span className={style.element_filtered} key={idx}>
                  <span className={style.name_element_filtered}> {data}</span>
                  <span
                    className={style.cancel_element_filtered}
                    onClick={handleCancelElement}
                  >
                    <i className="bi bi-x"></i>
                  </span>
                </span>
              );
            })}
            {state.dataFilterSize?.map((data, idx) => {
              const handleCancelElement = () => {
                let prev = state.dataFilterSize;
                let itemIndex = prev.indexOf(data);
                if (itemIndex !== -1) {
                  prev.splice(itemIndex, 1);
                }
                dispatch({
                  type: ACTIOS.dataFilterSize,
                  payload: [...prev],
                });
              };
              return data === "" ? (
                ""
              ) : (
                <span className={style.element_filtered} key={idx}>
                  <span className={style.name_element_filtered}> {data}</span>
                  <span
                    className={style.cancel_element_filtered}
                    onClick={handleCancelElement}
                  >
                    <i className="bi bi-x"></i>
                  </span>
                </span>
              );
            })}
            {state.dataFilterColor?.map((data, idx) => {
              const handleCancelElement = () => {
                let prev = state.dataFilterColor;
                let itemIndex = prev.indexOf(data);
                if (itemIndex !== -1) {
                  prev.splice(itemIndex, 1);
                }
                dispatch({
                  type: ACTIOS.dataFilterColor,
                  payload: [...prev],
                });
              };
              return data === "" ? (
                ""
              ) : (
                <span className={style.element_filtered} key={idx}>
                  <span className={style.name_element_filtered}> {data}</span>
                  <span
                    className={style.cancel_element_filtered}
                    onClick={handleCancelElement}
                  >
                    <i className="bi bi-x"></i>
                  </span>
                </span>
              );
            })}
            {state.dataFilterPriceUnder200.active && (
              <span className={style.element_filtered}>
                <span className={style.name_element_filtered}>
                  Dưới 200.000 đ
                </span>
                <span
                  className={style.cancel_element_filtered}
                  onClick={handleCancelPriceUnder200}
                >
                  <i className="bi bi-x"></i>
                </span>
              </span>
            )}
            {state.dataFilterPriceOver1000.active && (
              <span className={style.element_filtered}>
                <span className={style.name_element_filtered}>
                  Trên 1.000.000 đ
                </span>
                <span
                  className={style.cancel_element_filtered}
                  onClick={handleCancelPriceOver1000}
                >
                  <i className="bi bi-x"></i>
                </span>
              </span>
            )}
            {state.dataFilterPrice200To500.active && (
              <span className={style.element_filtered}>
                <span className={style.name_element_filtered}>
                  Từ 200.000 đ - 500.000 đ
                </span>
                <span
                  className={style.cancel_element_filtered}
                  onClick={handleCancelPrice500To1000}
                >
                  <i className="bi bi-x"></i>
                </span>
              </span>
            )}{" "}
            {state.dataFilterPrice200To500.active500To1000 && (
              <span className={style.element_filtered}>
                <span className={style.name_element_filtered}>
                  Từ 500.000 đ - 1.000.000 đ
                </span>
                <span
                  className={style.cancel_element_filtered}
                  onClick={handleCancelPrice500To1000}
                >
                  <i className="bi bi-x"></i>
                </span>
              </span>
            )}
            {state.dataFilterStyle?.map((data, idx) => {
              const handleCancelElement = () => {
                // dataFilter.splice(dataFilter.indexOf(data), 1);
              };
              return data === "" ? (
                ""
              ) : (
                <span className={style.element_filtered} key={idx}>
                  <span className={style.name_element_filtered}> {data}</span>
                  <span
                    className={style.cancel_element_filtered}
                    onClick={handleCancelElement}
                  >
                    <i className="bi bi-x"></i>
                  </span>
                </span>
              );
            })}{" "}
            {state.dataFilterStar.active && (
              <span className={style.element_filtered}>
                <span className={style.name_element_filtered}>Từ 5 sao</span>
                <span
                  className={style.cancel_element_filtered}
                  onClick={handleCancel5star}
                >
                  <i className="bi bi-x"></i>
                </span>
              </span>
            )}
            {state.dataFilterStar.active4 && (
              <span className={style.element_filtered}>
                <span className={style.name_element_filtered}>Từ 4 sao</span>
                <span
                  className={style.cancel_element_filtered}
                  onClick={handleCancel4star}
                >
                  <i className="bi bi-x"></i>
                </span>
              </span>
            )}{" "}
            {state.dataFilterStar.active3 && (
              <span className={style.element_filtered}>
                <span className={style.name_element_filtered}>Từ 3 sao</span>
                <span
                  className={style.cancel_element_filtered}
                  onClick={handleCancel3star}
                >
                  <i className="bi bi-x"></i>
                </span>
              </span>
            )}
            {state.dataFilterStar.active2 && (
              <span className={style.element_filtered}>
                <span className={style.name_element_filtered}>Từ 2 sao</span>
                <span
                  className={style.cancel_element_filtered}
                  onClick={handleCancel2star}
                >
                  <i className="bi bi-x"></i>
                </span>
              </span>
            )}
          </div>
          <ProductFilter
            dataArrayBrand={dataArrayBrand}
            dataArraySize={dataArraySize}
            dataArrayColor={dataArrayColor}
            onReciveDataFilter={handleReciveDataFilter}
          />
        </div>
        <div className={style.right}>
          <h6 style={{ fontSize: "22px" }}>
            {state.dataFilterStyle.length > 0
              ? state.dataFilterStyle.join(" và ")
              : nameTypeProduct}
          </h6>
          <div className={style.filter_box}>
            <div className={style.sort}>
              <span className={style.title_sort}>
                Sắp xếp theo <i className="bi bi-chevron-down"></i>
              </span>
              <div className={style.dropdown_sort}>
                <div className={style.style_filter}>
                  <div
                    className={`${style.checkbox} d-flex align-items-center`}
                  >
                    <input type="radio" name="sort" id="asc" />
                    <label htmlFor="asc">Giá: Tăng dần</label>
                  </div>
                  <div
                    className={`${style.checkbox}  d-flex align-items-center`}
                  >
                    <input type="radio" name="sort" id="desc" />
                    <label htmlFor="desc">Giá: Giảm dần</label>
                  </div>
                  <div
                    className={`${style.checkbox} d-flex align-items-center`}
                  >
                    <input type="radio" name="sort" id="a-z" />
                    <label htmlFor="a-z">Tên: A-Z</label>
                  </div>
                  <div
                    className={`${style.checkbox} d-flex align-items-center`}
                  >
                    <input type="radio" name="sort" id="z-a" />
                    <label htmlFor="z-a">Tên: Z-A</label>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.filter}>
              <span className={style.title_filter}>
                LỌC THEO <i className="bi bi-chevron-down"></i>
              </span>
              <div className={`${style.dropdown_filter} d-flex`}>
                <div className={style.style_filter}>
                  <h6>Phong cách</h6>
                  <FilterByType
                    dataArrayTypeProduct={dataArrayTypeProduct}
                    onReceiveDataTypeProduct={handleReceiveDataType}
                  />
                </div>
                <div className={style.collar_filter}>
                  <h6>Cổ áo</h6>
                  <div
                    className={`${style.checkbox} d-flex align-items-center`}
                  >
                    <input type="checkbox" id="cotron" />
                    <label htmlFor="cotron">Cổ tròn</label>
                  </div>
                  <div
                    className={`${style.checkbox} d-flex align-items-center`}
                  >
                    <input type="checkbox" id="cotim" />
                    <label htmlFor="cotim">Cổ tim</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {state.loading ? (
            <ProductSkeletonList length={6 || state.dataProductFilter.length} />
          ) : (
            <ProductList />
          )}{" "}
          {/* <ProductSkeletonList /> */}
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "50px" }}
          >
            <Pagination
              classes={{ ul: classes.ul }}
              count={Math.ceil(
                state.paginationByFilterProduct?.total /
                  state.paginationByFilterProduct.limit
              )}
              page={state.paginationByFilterProduct?.page}
              onChange={handlePageChange}
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
