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

function ListPage(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [dataArrayBrand, setDataArrayBrand] = useState([]);
  const [dataArraySize, setDataArrayySize] = useState([]);
  const [dataArrayColor, setDataArrayColor] = useState([]);
  const [dataTypeProduct, setDataTypeProduct] = useState("");

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
  const handleCancelPriceUnder200 = () => {
    dispatch({
      type: ACTIOS.dataFilterPriceUnder200,
      payload: undefined,
    });
    // dataFilter.splice(dataFilter.indexOf(data), 1);
  };

  const handleReceiveDataType = (dataType) => {
    setDataTypeProduct(dataType);
  };
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 2,
  });
  const [pagination, setPagination] = useState({
    limit: 2,
    total: 10,
    page: 1,
  });
  useEffect(() => {
    if (
      state.dataFilterBrand.length +
        state.dataFilterSize.length +
        state.dataFilterColor.length +
        (state.dataFilterPriceUnder200 === undefined ? 0 : 1) +
        state.dataFilterStyle.length ===
      0
    ) {
      const fetchRequestGetAllProductByCategory = async () => {
        try {
          const requestGetAllProductByCategory =
            await productApi.getAllProductByCategory(nameTypeProduct, filters);
          // if (requestGetAllProductByCategory.status == 200) {
          await dispatch({
            type: ACTIOS.dataProductFilter,
            payload: requestGetAllProductByCategory.data,
          });
          dispatch({
            type: ACTIOS.loading,
            payload: false,
          });
          // setPagination(requestGetAllProductByCategory.pagination);
          // }
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetAllProductByCategory();
    }
  }, [filters]);
  // console.log(pagination);
  // const handlePageChange = (e, page) => {
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     _page: page,
  //   }));
  // };
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
                (state.dataFilterPriceUnder200 === undefined ? 0 : 1) +
                state.dataFilterStyle.length}
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
            })}
            {state.dataFilterPriceUnder200 !== undefined && (
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
            })}
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
          {state.loading ? <ProductSkeletonList /> : <ProductList />}{" "}
          <div className="d-flex justify-content-center">
            {/* <Pagination
              color="primary"
              count={Math.ceil(pagination?.total / pagination?.limit)}
              page={pagination?.page}
              onChange={handlePageChange}
            ></Pagination> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
