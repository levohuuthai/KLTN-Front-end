import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import productApi from "api/productApi";
import ItemProductAdmin from "../ItemProductAdmin/ItemProductAdmin";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
ListItemProductAdmin.propTypes = {};

function ListItemProductAdmin(props) {
  const [dataProduct, setDataProduct] = useState([]);
  const { dispatch, state } = useContext(GlobalContext);

  // useEffect(() => {
  //   dispatch({
  //     type: ACTIOS.loadingAllProduct,
  //     payload: true,
  //   });
  //   const fetchRequestGetAllProduct = async () => {
  //     try {
  //       const requestGetAllProduct = await productApi.getAllProduct();
  //       // setDataProduct(requestGetAllProduct.data);
  //       // console.log(requestGetAllProduct);
  //       dispatch({
  //         type: ACTIOS.dataAllProduct,
  //         payload: requestGetAllProduct.data,
  //       });
  //       dispatch({
  //         type: ACTIOS.loadingAllProduct,
  //         payload: false,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchRequestGetAllProduct();
  // }, []);
  console.log(state.dataAllProduct);
  return (
    <div>
      {state.dataAllProduct?.map((data, idx) => {
        return (
          <div key={idx}>
            <ItemProductAdmin data={data} idx={idx} />
          </div>
        );
      })}
    </div>
  );
}

export default ListItemProductAdmin;
