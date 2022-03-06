import React from "react";
import PropTypes from "prop-types";
import Slider from "./components/Slider/Slider";
import Type from "./components/Type/Type";
import ProductPromotion from "./components/Product_promotion/ProductPromotion";
import NotifySale from "./components/Notify_sale/NotifySale";
import ProductBestSelling from "./components/Product_best_selling/ProductBestSelling";
import Subscribe from "./components/Subscribe/Subscribe";
import ListService from "./components/List_service/ListService";
import Blog from "./components/Blog/Blog";
import Insta from "./components/Insta/Insta";
import BackToTop from "components/BackToTop/BackToTop";

Home.propTypes = {};

function Home(props) {
  return (
    <div>
      {" "}
      <Slider />
      <Type />
      <ProductPromotion />
      <NotifySale />
      <ProductBestSelling />
      <Subscribe />
      <ListService />
      <Blog />
      <Insta />
    </div>
  );
}

export default Home;
