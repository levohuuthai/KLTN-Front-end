import React, { useContext, useEffect } from "react";
import FiltersByBrand from "../Filters/FilterByBrand/FiltersByBrand";
import FiltersBySize from "../Filters/FiltersBySize/FiltersBySize";
import FiltersByColor from "../Filters/FilterByColor/FiltersByColor";
import FiltersByStar from "../Filters/FilterByStar/FiltersByStar";
import FiltersByPrice from "../Filters/FilterByPrice/FiltersByPrice";
import productApi from "api/productApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

function ProductFilter(props) {
  const { dispatch, state } = useContext(GlobalContext);
  useEffect(() => {
    dispatch({
      type: ACTIOS.loading,
      payload: true,
    });
    if (
      state.dataProductFilter.length > 0 ||
      state.dataFilterBrand.length > 0 ||
      state.dataFilterSize.length > 0 ||
      state.dataFilterColor.length > 0 ||
      state.dataFilterPriceUnder200 !== undefined ||
      state.dataFilterPriceOver1000 !== undefined ||
      state.dataFilterPriceFrom200To1000 !== undefined ||
      state.dataFilterStyle.length > 0
    ) {
      console.log("hihi");

      const fetchRequestGetAllProductByBrand = async () => {
        try {
          const requestGetAllProductByBrand =
            await productApi.getAllProductByFilter(
              state.dataFilterBrand,
              state.dataFilterSize,
              state.dataFilterColor,
              state.dataFilterStyle,
              state.dataFilterPriceUnder200,
              state.dataFilterPriceOver1000,
              state.dataFilterPriceFrom200To1000?.priceMin,
              state.dataFilterPriceFrom200To1000?.priceMax
            );
          // console.log(requestGetAllProductByBrand);
          dispatch({
            type: ACTIOS.dataProductFilter,
            payload: requestGetAllProductByBrand.data,
          });
          dispatch({
            type: ACTIOS.loading,
            payload: false,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetAllProductByBrand();
    }
  }, [
    state.dataFilterBrand,
    state.dataFilterSize,
    state.dataFilterColor,
    state.dataFilterPriceUnder200,
    state.dataFilterPriceOver1000,
    state.dataFilterPriceFrom200To1000,
    state.dataFilterStyle,
  ]);

  return (
    <div>
      <FiltersByBrand dataArrayBrand={props.dataArrayBrand} />
      <FiltersBySize dataArraySize={props.dataArraySize} />
      <FiltersByColor dataArrayColor={props.dataArrayColor} />
      <FiltersByStar />
      <FiltersByPrice />
    </div>
  );
}

export default ProductFilter;
