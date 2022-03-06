import React from "react";
import PropTypes from "prop-types";
import FiltersByBrand from "../Filters/FilterByBrand/FiltersByBrand";
import FiltersBySize from "../Filters/FiltersBySize/FiltersBySize";
import FiltersByColor from "../Filters/FilterByColor/FiltersByColor";
import FiltersByStar from "../Filters/FilterByStar/FiltersByStar";
import FiltersByPrice from "../Filters/FilterByPrice/FiltersByPrice";

ProductFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onchange: PropTypes.func,
};

function ProductFilter(props) {
  return (
    <div>
      <FiltersByBrand />
      <FiltersBySize />
      <FiltersByColor />
      <FiltersByStar />
      <FiltersByPrice />
    </div>
  );
}

export default ProductFilter;
