import React from "react";
import Slider from "./components/Slider/Slider";
import Type from "./components/Type/Type";
import ProductPromotion from "./components/Product_promotion/ProductPromotion";
import NotifySale from "./components/Notify_sale/NotifySale";
import ProductBestSelling from "./components/Product_best_selling/ProductBestSelling";
import Subscribe from "./components/Subscribe/Subscribe";
import ListService from "./components/List_service/ListService";
import Blog from "./components/Blog/Blog";
import Insta from "./components/Insta/Insta";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Coupon from "./components/Coupon/Coupon";


function Home(props) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div>
        <Header />
        <Slider />
        <Coupon />
        <Type />
        <ProductPromotion />
        <NotifySale />
        <ProductBestSelling />
        <Subscribe />
        <ListService />
        <Blog />
        <Insta />
        <Footer />
      </div>
    </>
  );
}

export default Home;
