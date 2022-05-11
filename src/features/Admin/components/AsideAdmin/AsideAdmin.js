import React, { useState } from "react";
import style from "./AsideAdmin.module.scss";
import logoRubic from "assets/images/logoRubic.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashBoard from "features/Admin/pages/DashBoard/DashBoard";
import ListProductAdmin from "features/Admin/pages/ListProductAdmin/ListProductAdmin";
import AddProductAdmin from "features/Admin/pages/AddProductAdmin/AddProductAdmin";
import ListUserAdmin from "features/Admin/pages/ListUserAdmin/ListUserAdmin";

function AsideAdmin(props) {
  // let navigate = useNavigate();

  // const handleLinkListProduct = () => {
  //   navigate("/admin/addproduct");
  // };
  const data = [
    {
      name: "Trang chủ",
      link: "/admin/dashboard",
      icon: "fas fa-home",
    },
    {
      name: "Thống kê",
      link: "/admin/dashboard1",
      icon: "fas fa-chart-bar",
    },
    // {
    //   name: "Bán hàng",
    //   link: "#",
    // },
    {
      title: "Quick Menu",
      name: "Người dùng",
      link: "/admin/listuser",
      icon: "fas fa-user",
    },
    {
      name: "Sản phẩm",
      link: "/admin/listproduct",
      icon: "fas fa-tshirt",
    },
    {
      name: "Loại sản phẩm",
      link: "/admin/listypeproduct",
      icon: "fas fa-layer-group",
    },
    {
      name: "Hóa đơn",
      link: "/admin/listorder",
      icon: "fas fa-receipt",
    },
    {
      name: "Mã giảm giá",
      link: "/admin/listcoupon",
      icon: "fas fa-gift",
    },
    // {
    //   title: "Notifiction",
    //   name: "Mail",
    //   link: "#",
    // },
    // {
    //   name: "Phản hồi",
    //   link: "#",
    // },
    // {
    //   name: "Tin nhắn",
    //   link: "#",
    // },
  ];

  const [link, setLink] = useState("");
  // const handleLinkAddProduct = (dataLink) => {
  //   setLink(dataLink);
  // };
  // console.log(link);
  const location = useLocation();
  return (
    <div className={style.aside_admin}>
      <div className={style.frame_aside}>
        <div className={style.logo_rubix}>
          <img src={logoRubic} alt="logo rubix" />
          <div className={style.line_logo}></div>
        </div>
        <div className={style.content_aside}>
          {data.map((data, index) => {
            return (
              <div key={index}>
                <h6>{data.title}</h6>
                {data.name != undefined && (
                  <p
                    className={
                      data.link === location.pathname ? style.active : ""
                    }
                  >
                    <Link to={data.link}>
                      <i className={data.icon}></i>
                      {data.name}
                    </Link>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AsideAdmin;

// {link === "" && <DashBoard />}
//       {link === "/admin/dashboard" && <DashBoard />}
//       {link === "/admin/listproduct" && (
//         <ListProductAdmin onReiceveLinkAddProduct={handleLinkAddProduct} />
//       )}
//       {link === "/admin/addproduct" && <AddProductAdmin />}
//       {link === "/admin/listuser" && <ListUserAdmin />}
//       {link === "/admin/listtypeproduct" && <ListUserAdmin />}
