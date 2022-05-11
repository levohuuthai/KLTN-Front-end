import React, { useEffect, useState } from "react";
import style from "../ListTypeProductAdmin.module.scss";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import FormUpdateTypeProduct from "../../FormUpdateTypeProduct/FormUpdateTypeProduct";

function ItemTypeProductAdmin(props) {
  const [activeDropdown, setActiveDropdown] = useState(false);

  const handleActiveDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };
  const [isForm, setIsForm] = useState(false);
  const handleShowFormUpdate = () => {
    setIsForm(true);
  };
  const formfalseHandler = (falseFromForm) => {
    setIsForm(falseFromForm);
  };
  return (
    <>
      <div className={style.item_typeproduct}>
        <p className={`${style.image_item_typeproduct}`}>
          <img src={props.data.image}></img>
        </p>
        <span
          className={`${style.name_item}  d-flex justify-content-center flex-column`}
        >
          {props.data.name}
        </span>
        <span className={`${style.close} d-flex justify-content-center`}>
          <div className={style.delete}>
            <nav>
              <ul>
                <li
                  className={`${style.ItemDelete} ${
                    activeDropdown ? style.active : ""
                  } `}
                  onClick={handleActiveDropdown}
                >
                  <i className="fas fa-ellipsis-h"></i>
                  <ul
                    className={`${style.dropdown} `}
                    onClick={handleShowFormUpdate}
                  >
                    <li>Cập nhật loại sản phẩm</li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </span>
      </div>
      <FormUpdateTypeProduct
        isForm={isForm}
        onFormFalse={formfalseHandler}
        dataTypeProduct={props.data}
      />
    </>
  );
}

export default ItemTypeProductAdmin;
