import React, { useEffect, useState } from "react";
import style from "./MyOrderDetail.module.scss";
import MyOrderAside from "features/MyOrderGroup/components/MyOrderAside/MyOrderAside";
import aothun2_front from "assets/images/product_promotion/ao2_front.png";
import addressAPI from "api/addressAPI";
import { useLocation } from "react-router-dom";
import ItemProductOrderDetail from "./ItemProductOrderDetail/ItemProductOrderDetail";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyOrderDetail(props) {
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [dayReview, setDayReview] = useState({
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
  });

  const location = useLocation();
  const dataOrder = location.state?.data;
  const arrProductOrderDetail = location.state?.data.products;
  const loggedInUser = useSelector((state) => state.user.current);
  //get address
  useEffect(() => {
    const fetchGetAddress = async () => {
      try {
        const requestGetAddress = await addressAPI.getAddress(
          dataOrder.address
        );
        setCity(requestGetAddress.data.city);
        setDistrict(requestGetAddress.data.district);
        setWard(requestGetAddress.data.ward);
        setApartmentNumber(requestGetAddress.data.apartmentNumber);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAddress();
  }, []);
  useEffect(() => {
    var date = new Date(dataOrder?.createdAt);
    setDayReview({
      minute: date.getMinutes(),
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
  }, [dataOrder]);
  const [tempTotalMoney, setTempTotalMoney] = useState();

  const handleReceiveTemTotal = (data) => {
    // setTempTotalMoney(data);
  };
  useEffect(() => {
    var rs = dataOrder.products.reduce((acc, val) => {
      return acc + val.priceAfter * val.quantity;
    }, 0);
    setTempTotalMoney(rs);
  }, [dataOrder]);
  console.log(tempTotalMoney);

  return (
    <div>
      {/* <div className={`${style.background_slider} `}>
        <div className={style.imgbackground}>
          <img src={imgbackground4} alt="" />
        </div>
        <div className={style.title_background}>
          Chi tiết đơn hàng <p>Trang chủ / Chi tiết đơn hàng </p>
        </div>
      </div> */}
      <div className={style.myorder_detail}>
        <MyOrderAside />
        <div className={style.myorder_detail_right}>
          <h6 style={{ fontSize: "20px" }}>
            Chi tiết đơn hàng{" "}
            <span className={style.id_orderDetai}>#161262738</span>
          </h6>
          <p className={style.date_order}>
            Ngày đặt hàng: {dayReview.hour} giờ {dayReview.minute} phút ngày{" "}
            {dayReview.day} - {dayReview.month} - {dayReview.year}
          </p>
          <div className={`${style.address_methodpayment}`}>
            <div className={`${style.address_orderDetail}`}>
              <p>ĐỊA CHỈ NGƯỜI NHẬN</p>
              <div className={`${style.frameAdress}  d-flex flex-column`}>
                <h6 style={{ fontWeight: "700" }}>{loggedInUser.userName}</h6>{" "}
                <span>
                  Địa chỉ: {apartmentNumber}, {ward}, {district}, {city}
                </span>
                <span>Điện thoại: {loggedInUser.phone}</span>
              </div>
            </div>
            <div className={`${style.address_methodpaymentDetail}`}>
              <p>HÌNH THỨC THANH TOÁN</p>
              <div
                className={`${style.frameMethodpayment}  d-flex flex-column`}
              >
                Thanh toán tiền mặt khi nhận hàng
              </div>
            </div>
          </div>
          <div className={style.list_product_order_frame}>
            <div className={style.title_item_product}>
              <span className={style.title_image_item}>Sản phẩm</span>
              <span
                className={`${style.title_price1} d-flex justify-content-center`}
              >
                Giá
              </span>
              <span
                className={`${style.title_quantity} d-flex justify-content-center`}
              >
                Số lượng
              </span>
              <span
                className={`${style.title_discount} d-flex justify-content-center`}
              >
                Giảm giá
              </span>
              <span
                className={`${style.title_price2} d-flex justify-content-center`}
              >
                Thành tiền
              </span>
            </div>
            <div className={`${style.list_product_order}`}>
              {arrProductOrderDetail?.map((data, idx) => {
                return (
                  <div key={idx}>
                    <ItemProductOrderDetail
                      data={data}
                      dataOrder={dataOrder}
                      onReceiveTempTotal={handleReceiveTemTotal}
                    />
                  </div>
                );
              })}
            </div>
            <div className={style.totalMoney}>
              <span className={style.title_total}>Tạm tính</span>
              <span className={style.total}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(tempTotalMoney)}
              </span>
            </div>
            <div className={style.totalMoney}>
              <span className={style.title_total}>Phí vận chuyển</span>
              <span className={style.total}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dataOrder?.priceShip)}
              </span>
            </div>
            <div className={style.totalMoney}>
              <span className={style.title_total}>Giảm giá</span>
              <span className={style.total}>
                -{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dataOrder?.discountProduct + dataOrder?.discountShip)}
              </span>
            </div>{" "}
            <div className={style.totalMoney}>
              <span className={style.title_total}>Thành tiền</span>
              <span className={style.total}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dataOrder.amount)}
              </span>
            </div>
          </div>
          <Link
            to="/myorder"
            style={{
              display: "inline-block",
              paddingTop: "10px",
              color: "#ba933e",
            }}
          >
            &lt;&lt; Quay lại đơn hàng của tôi
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyOrderDetail;
