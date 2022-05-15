import AsideAdmin from "features/Admin/components/AsideAdmin/AsideAdmin";
import React, { useContext, useEffect, useState } from "react";
import style from "./ListProductDetailAdmin.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import productApi from "api/productApi";
import { TextField } from "@material-ui/core";
import ItemProductDetailAdmin from "./ItemProductDetailAdmin/ItemProductDetailAdmin";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function ListProductDetailAdmin(props) {
  // const [arrayProductDetail, setArrayProductDetail] = useState([]);
  const { dispatch, state } = useContext(GlobalContext);

  const handleLinkAddProduct = () => {
    props.onReiceveLinkAddProduct("/admin/addproduct");
  };
  const location = useLocation();
  const dataProduct = location.state?.dataProduct;

  useEffect(() => {
    const fetchRequestGetProductDetail = async () => {
      try {
        dataProduct.productDetail.map(async (data) => {
          const requestGetProductDetail = await productApi.getIdProductDetail(
            dataProduct._id
          );
          dispatch({
            type: ACTIOS.dataAllProductDetail,
            payload: requestGetProductDetail.data,
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestGetProductDetail();
  }, []);
  return (
    <div className="d-flex wrap">
      <AsideAdmin />
      <div className={style.listproduct_admin}>
        <div className={style.listproduct_admin_frame}>
          <div className={style.title_add_listproduct}>
            <span className={style.title_listproduct}>
              Danh sách chi tiết sản phẩm:{" "}
              <b>
                <i>{dataProduct.title}</i>
              </b>
            </span>
            <span className={style.add_product} onClick={handleLinkAddProduct}>
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
              ></input>
            </div>
          </div>
          <div className={style.listproduct}>
            <div className={style.title_item_product}>
              <span className={style.title_image_item}>Hình ảnh</span>
              <span
                className={`${style.title_size}  d-flex justify-content-center`}
              >
                Kích cỡ
              </span>
              <span
                className={`${style.title_color} d-flex justify-content-center`}
              >
                Màu
              </span>
              <span
                className={`${style.title_stock} d-flex justify-content-center`}
              >
                Số lượng tồn
              </span>
              <span
                className={`${style.title_price} d-flex justify-content-center`}
              >
                Đơn giá
              </span>
              <span
                className={`${style.title_percentoff} d-flex justify-content-center`}
              >
                <span>Phần trăm giảm giá</span>
              </span>
              <span
                className={`${style.title_close} d-flex justify-content-center`}
              >
                <i className="fas fa-ellipsis-h"></i>
              </span>
            </div>
            <div className={`${style.list_item_product}`}>
              {state.dataAllProductDetail?.map((data, idx) => {
                return (
                  <div key={idx}>
                    <ItemProductDetailAdmin
                      data={data}
                      idx={idx}
                      dataProduct={dataProduct}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProductDetailAdmin;
