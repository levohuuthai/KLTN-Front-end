import ProductList from "features/Discount/components/ProductList/ProductList";
import React from "react";
import style from "./SearchPage.module.scss";

function DiscountPage(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={style.right}>
      <h3 style={{ fontSize: "22px", textAlign: "center" }}>
        Khuyến mãi hấp dẫn
      </h3>
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

export default DiscountPage;
