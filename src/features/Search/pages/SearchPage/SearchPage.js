import ProductList from "features/Search/components/ProductList/ProductList";
import React from "react";
import style from "./SearchPage.module.scss";
import { useLocation } from "react-router-dom";

function SearchPage(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const dataTitle = location.state?.dataTitle;

  return (
    <div className={style.right}>
      <h6 style={{ fontSize: "22px", textAlign: "center" }}>
        Tìm kiếm{" "}
        <b style={{ color: "#ba933e" }}>
          <i>{dataTitle}</i>
        </b>
      </h6>
      <div className={style.filter_box}>
        <div className={style.sort}>
          <span className={style.title_sort}>
            Sắp xếp theo <i className="bi bi-chevron-down"></i>
          </span>
          <div className={style.dropdown_sort}>
            <div className={style.style_filter}>
              <div className={`${style.checkbox} d-flex align-items-center`}>
                <input type="radio" name="sort" id="asc" />
                <label htmlFor="asc">Giá: Tăng dần</label>
              </div>
              <div className={`${style.checkbox}  d-flex align-items-center`}>
                <input type="radio" name="sort" id="desc" />
                <label htmlFor="desc">Giá: Giảm dần</label>
              </div>
              <div className={`${style.checkbox} d-flex align-items-center`}>
                <input type="radio" name="sort" id="a-z" />
                <label htmlFor="a-z">Tên: A-Z</label>
              </div>
              <div className={`${style.checkbox} d-flex align-items-center`}>
                <input type="radio" name="sort" id="z-a" />
                <label htmlFor="z-a">Tên: Z-A</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductList />
    </div>
  );
}

export default SearchPage;
