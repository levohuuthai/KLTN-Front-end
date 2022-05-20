import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./Search.module.scss";
import { useNavigate } from "react-router-dom";
import productAdminApi from "api/admin/productAdminApi";

const Search = (props) => {
  const [enteredSearch, setEnteredSearch] = useState("");
  const [arrayTitleProduct, setArrayTitleProduct] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState("");

  let navigate = useNavigate();

  const handleCancel = () => {
    props.onReceiveFalse(false);
  };

  const handleEnteredSearch = (e) => {
    setEnteredSearch(e.target.value);
    setActiveDropdown(e.target.value);
    if (e.target.value !== "") {
      const fetchRequestGetProductByTitle = async () => {
        try {
          const requestGetGetProductByTitle =
            await productAdminApi.getProductByTitle(e.target.value);
          setArrayTitleProduct(requestGetGetProductByTitle.data);
          // console.log(requestGetGetProductByTitle.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchRequestGetProductByTitle();
    } else {
    }
  };
  const handleAllProduct = (e) => {
    e.preventDefault();
    navigate("/search", {
      state: {
        dataTitle: "",
      },
    });
    props.onReceiveFalse(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search", {
      state: {
        dataTitle: enteredSearch,
      },
    });
    props.onReceiveFalse(false);
  };
  const handleFocusNameProduct = (e) => {
    setActiveDropdown("a");
  };
  const handleClickItemFirst = () => {
    setActiveDropdown("");
  };
  const [height_long, setHeight] = useState(false);
  useEffect(() => {
    if (arrayTitleProduct.length > 7) {
      setHeight(true);
    } else {
      setHeight(false);
    }
  }, [arrayTitleProduct]);
  return (
    <section
      className={`${style.search_header} ${
        props.showSearch ? style.active_search_header : ""
      }`}
    >
      <form>
        <div
          className={`${style.search_group} d-flex flex-column align-items-center`}
        >
          <div className={style.title_search}>
            <h2>Tìm kiếm</h2>
          </div>
          <div className={`${style.categories_search}`}>
            <ul className="d-flex">
              <li>
                <a
                  href="/"
                  className={`${style.all_cat}`}
                  onClick={handleAllProduct}
                >
                  Tất cả áo thun
                </a>
              </li>

              <li>
                <a href="/#">Áo thun trơn</a>
              </li>
              <li>
                <a href="/#">Áo thun in hình</a>
              </li>
              <li>
                <a href="/#">Áo thun </a>
              </li>
            </ul>
          </div>
          <div className={`${style.input_group} d-flex`}>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={enteredSearch}
              onChange={handleEnteredSearch}
              onFocus={handleFocusNameProduct}
            />
            <a
              href="/#"
              className="d-flex align-items-center"
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i>
            </a>{" "}
            {activeDropdown !== "" && (
              <div
                className={`${style.dropdownNameProduct} ${
                  height_long ? style.height_long : ""
                }`}
              >
                <div className={style.listItemName}>
                  <div
                    className={style.itemName}
                    onClick={handleClickItemFirst}
                  >
                    {enteredSearch} - Tìm kiếm trên hệ thống
                  </div>
                  {arrayTitleProduct?.map((data, idx) => {
                    const parts = data.title.split(
                      new RegExp(`(${enteredSearch})`, "gi")
                    );
                    const handleClickItemTitle = () => {
                      setEnteredSearch(data.title);
                      setActiveDropdown("");
                    };
                    return (
                      <div
                        className={style.itemName}
                        key={idx}
                        onClick={handleClickItemTitle}
                      >
                        <div>
                          {parts.map((part, i) => {
                            return (
                              <span
                                key={i}
                                className={`${
                                  i % 2 === 1 ? style.hightlight : ""
                                }`}
                              >
                                {part}
                              </span>
                            );
                          })}
                        </div>
                        <span className={style.image_namedropdown}>
                          <img src={data.image_front} alt="img title"></img>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className={`${style.cancel}`} onClick={handleCancel}>
            <i className="bi bi-x"></i>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Search;
