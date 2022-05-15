import React, { useContext, useEffect } from "react";
import FiltersByBrand from "../Filters/FilterByBrand/FiltersByBrand";
import FiltersBySize from "../Filters/FiltersBySize/FiltersBySize";
import FiltersByColor from "../Filters/FilterByColor/FiltersByColor";
import FiltersByStar from "../Filters/FilterByStar/FiltersByStar";
import FiltersByPrice from "../Filters/FilterByPrice/FiltersByPrice";
import productApi from "api/productApi";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";
import FiltersByPrice1 from "../Filters/FilterByPrice/FiltersByPrice1";

function ProductFilter(props) {
  const { dispatch, state } = useContext(GlobalContext);
  useEffect(() => {
    dispatch({
      type: ACTIOS.loading,
      payload: true,
    });
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
        (!state.dataFilterStar.active2 ? 0 : 1) !==
      0
    ) {
      const fetchRequestGetAllProductByBrand = async () => {
        try {
          const requestGetAllProductByBrand =
            await productApi.getAllProductByFilter(
              state.dataFilterBrand,
              state.dataFilterSize,
              state.dataFilterColor,
              state.dataFilterStyle,
              state.dataFilterPriceUnder200.value,
              state.dataFilterPriceOver1000.value,
              state.dataFilterPrice200To500?.priceMin,
              state.dataFilterPrice200To500?.priceMax,
              state.dataFilterStar.value
            );
          console.log(requestGetAllProductByBrand);
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
    state.dataFilterPrice200To500,
    state.dataFilterStyle,
    state.dataFilterStar,
  ]);

  return (
    <div>
      <FiltersByBrand dataArrayBrand={props.dataArrayBrand} />
      <FiltersBySize dataArraySize={props.dataArraySize} />
      <FiltersByColor dataArrayColor={props.dataArrayColor} />
      <FiltersByStar />
      <FiltersByPrice1 />
    </div>
  );
}

export default ProductFilter;
