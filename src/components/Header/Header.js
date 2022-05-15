import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './Header.module.scss';
import logoRubic from 'assets/images/logoRubic.png';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import BackToTop from 'components/BackToTop/BackToTop';
import Chat from 'components/Chat/Chat';
import MyCartAside from 'components/myCartAside/MyCartAside';
import { GlobalContext } from '../../store/store';
import { ACTIOS } from '../../store/actions';
import { useSelector } from 'react-redux';
import Search from 'components/Search/Search';
import FormLogout from 'components/FormLogout/FormLogout';
import FormInformation from 'features/Form-Information/FormInformation';
import cartApi from 'api/cartApi';
import wishlishApi from 'api/wishlishApi';
// import io from "socket.io-client";

Header.propTypes = {};

function Header(props) {
  // //socket
  // const socket = useRef();
  // const ENDPOINT = "localhost:5000";
  // useEffect(() => {
  //   socket.current = io(ENDPOINT, {
  //     transports: ["websocket", "polling", "flashsocket"],
  //   });
  // }, []);
  const [showHeader, setShowHeader] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isAudio, setAudio] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const { dispatch, state } = useContext(GlobalContext);
  let navigate = useNavigate();

  const { activeCart } = state;
  const showMyCart = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIOS.ActiveShowCart, payload: true });
  };
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < -160) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  });

  const handleShowSearch = (e) => {
    e.preventDefault();
    setShowSearch(true);
  };
  const handleCancelSearch = (falseformSearch) => {
    setShowSearch(falseformSearch);
  };
  const loggedInUser = useSelector((state) => state.user.current);
  const [isOpenFormLogOut, seIsOpenFormLogOut] = useState(false);
  const handleLogout = () => {
    seIsOpenFormLogOut(true);
  };
  const falseFromLogOut = () => {
    seIsOpenFormLogOut(false);
  };
  const handleInfomation = () => {
    setIsForm(true);
  };
  const formfalseHandler = (falseFromForm) => {
    setIsForm(falseFromForm);
  };

  useEffect(() => {
    const fetchGetProductCartByUserId = async () => {
      try {
        const requestGetProductCartByUserId =
          await cartApi.getProductCartByUserId(loggedInUser._id);
        dispatch({
          type: ACTIOS.dataCart,
          payload: requestGetProductCartByUserId.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetProductCartByUserId();
  }, [state.activeCart]);
  useEffect(() => {
    const fetchGetProductWishList = async () => {
      try {
        const requestGetProductWishList = await wishlishApi.getWishListUser(
          loggedInUser._id
        );
        if (requestGetProductWishList.status === 200) {
          dispatch({
            type: ACTIOS.dataWishList,
            payload: requestGetProductWishList.data.products,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetProductWishList();
  }, []);
  const handleLinkMyOrder = () => {
    navigate('/myorder');
  };
  return (
    <>
      <div className='wrap'>
        <div className={style.top_bar}>
          <div className={`${style.container_top}   `}>
            <div className={`${style.top_bar_left}  `}>
              <a href='tel:0327364753'>
                <i className='bi bi-telephone-outbound'></i>
                {/* <span>
              <FiPhoneIncoming
                style={{ fontSize: "16px", color: "#444444" }}
              />
            </span> */}
                0327364753
              </a>

              <a href='mailto:levohuuthai1@gmail.com'>
                <i className='far fa-envelope'></i>levohuuthai1@gmail.com
              </a>
            </div>
            <div className={`${style.top_bar_center} `}>
              <span>Miễn phí giao hàng hóa đơn trên 200.000 vnđ</span>
              <span href='/' className={style.shop_now}>
                Mua sắm ngay!
              </span>
            </div>
            <div className={`${style.top_bar_right} `}>
              <div
                className={`${style.social} d-flex justify-content-between align-items-end`}
              >
                <a href='\'>
                  <i className='fab fa-facebook-f'></i>
                </a>
                <a href='\'>
                  <i className='fab fa-twitter'></i>
                </a>
                <a href='\'>
                  <i className='fab fa-youtube-square'></i>
                </a>
                <a href='\'>
                  <i className='fab fa-pinterest'></i>
                </a>
                <a href='\'>
                  <i className='fas fa-envelope'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${style.header} ${showHeader ? style.active_fixed : ''}`}
        >
          <div className={`${style.container_top} `}>
            <div className={`${style.menu_bar_reponsive}`}>
              <i className='bi bi-list'></i>
            </div>
            <div className={`${style.logo}`}>
              <a href='../html/Project.html'>
                <img src={logoRubic} alt='' />
              </a>
            </div>
            {/* Menu */}
            <ul className={`${style.list_menu}`}>
              <li
                className={`${style.home_menu} `}
                onMouseMove={() => setAudio(true)}
                onMouseLeave={() => setAudio(false)}
              >
                <a href='\' className={`${style.h} `}>
                  Trang chủ
                </a>
              </li>

              <li
                className={`${style.product_menu}`}
                onMouseMove={() => setAudio(true)}
                onMouseLeave={() => setAudio(false)}
              >
                <a href='\'>
                  Sản phẩm<i className='bi bi-chevron-down'></i>{' '}
                </a>
                <div className={`${style.dropdown_product}  `}>
                  <ul className={`${style.shoplayout}`}>
                    <li>
                      <a href='\' className={`${style.title_product}`}>
                        Danh mục
                      </a>
                    </li>
                    <li>
                      <a href='\'>Tất cả</a>
                    </li>
                    <li>
                      <a href='\'>Áo thun trơn</a>
                    </li>
                    <li>
                      <a href='\'>Áo thun sọc</a>
                    </li>
                    <li>
                      <a href='\'>Áo thun in hình</a>
                    </li>
                    <li>
                      <a href='\'>Áo thun nam</a>
                    </li>
                    <li>
                      <a href='\'>Áo thun nữ</a>
                    </li>
                    <li>
                      <a href='\'>Unisex</a>
                    </li>
                  </ul>
                  <ul className={`${style.productlayout}`}>
                    <li>
                      <a href='\' className={`${style.title_product}`}>
                        Xu hướng
                      </a>
                    </li>
                    <li>
                      <a href='\'>Hàng mới về</a>
                    </li>
                    <li>
                      <a href='\'>Giảm nhiều nhất</a>
                    </li>
                    <li>
                      <a href='\'>Bán chạy nhất</a>
                    </li>
                  </ul>
                </div>
              </li>

              <li
                className={`${style.introduce_menu} `}
                onMouseMove={() => setAudio(true)}
                onMouseLeave={() => setAudio(false)}
              >
                <a href='\'>
                  Giới thiệu<i className='bi bi-chevron-down'></i>
                </a>
                <div className={`${style.dropdown_introduce} `}>
                  <ul>
                    <li>
                      <a href='\'>Về chúng tôi</a>
                    </li>
                    <li>
                      <a href='\'>Liên hệ</a>
                    </li>
                    <li>
                      <a href='\'>Khách hàng hài lòng 100%</a>
                    </li>
                    <li>
                      <a href='\'>Tài khoản của tôi</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className={`${style.knowDress_menu} `}
                onMouseMove={() => setAudio(true)}
                onMouseLeave={() => setAudio(false)}
              >
                <a href='\'>
                  Kiến thức mặc đẹp<i className='bi bi-chevron-down'></i>{' '}
                </a>
                <div className={`${style.dropdown_knowDress} `}>
                  <ul>
                    <li>
                      <a href='\'>Hướng dẫn chọn size</a>
                    </li>
                    <li>
                      <a href='\'>Blog</a>
                    </li>
                    <li>
                      <a href='\'>Nhóm mặc đẹp sống chất</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className={`${style.serviceCustom_menu} `}
                onMouseMove={() => setAudio(true)}
                onMouseLeave={() => setAudio(false)}
              >
                <a href='\'>
                  Dịch vụ khách hàng<i className='bi bi-chevron-down'></i>{' '}
                </a>
                <div className={`${style.dropdown_serviceCustom} `}>
                  <ul>
                    <li>
                      <a href='\'>Hỏi đáp - FAQs</a>
                    </li>
                    <li>
                      <a href='\'>Chính sách giao hàng</a>
                    </li>
                    <li>
                      <a href='\'>Chính sách đổi trả</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>

            <div className={`${style.header_right} `}>
              <div className={`${style.account}  `}>
                {loggedInUser !== null ? (
                  <span className={style.avatar_header}>
                    <img src={loggedInUser?.avatar} alt='avatar' />
                  </span>
                ) : (
                  <i className='far fa-user'></i>
                )}

                {loggedInUser?.userName == undefined ? (
                  <>
                    <Link
                      to='/auth/login'
                      onMouseMove={() => setAudio(true)}
                      onMouseLeave={() => setAudio(false)}
                    >
                      Đăng nhập /{' '}
                    </Link>
                    <Link
                      to='/auth/register'
                      onMouseMove={() => setAudio(true)}
                      onMouseLeave={() => setAudio(false)}
                    >
                      Đăng ký
                    </Link>
                  </>
                ) : (
                  <>
                    <span>Hi {loggedInUser?.userName}</span>
                    {/* <span> {loggedInUser?.firstName}</span> */}
                    <div className={style.dropdownInfo}>
                      <ul>
                        <li onClick={handleLinkMyOrder}>Đơn hàng của tôi</li>
                        <li onClick={handleInfomation}>Thông tin cá nhân</li>
                        <li onClick={handleLogout}>Thoát tài khoản</li>
                      </ul>
                    </div>
                  </>
                )}
                {/* {loggedInUser?.lastName == undefined ? (
                  <Link
                    to="/auth/register"
                    onMouseMove={() => setAudio(true)}
                    onMouseLeave={() => setAudio(false)}
                  >
                    Đăng ký
                  </Link>
                ) : (
                  <span> {loggedInUser?.firstName}</span>
                )} */}
              </div>
              <div className={`${style.bar_vertical}`}></div>
              <div
                className={`${style.wishlist}`}
                onMouseMove={() => setAudio(true)}
                onMouseLeave={() => setAudio(false)}
                title='Yêu thích'
              >
                <Link to='/wishlist'>
                  <i className='bi bi-suit-heart'></i>
                  <p className={`${style.qty_wl}`}>
                    {state.dataWishList.length}
                  </p>
                </Link>
                {/* <p className={`${style.qty_wl}`}>
                  <a href="\">0</a>
                </p> */}
              </div>
              <div
                className={`${style.my_cart}`}
                onClick={showMyCart}
                onMouseMove={() => setAudio(true)}
                onMouseLeave={() => setAudio(false)}
              >
                <a href='\'>
                  <i className='bi bi-handbag'></i>
                </a>
                <p className={`${style.qty_mc} `}>
                  <a href='\'>{state.dataCart.length}</a>
                </p>
              </div>
              <div className={`${style.search}`} onClick={handleShowSearch}>
                <a href='\'>
                  <i className='bi bi-search'></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <BackToTop />
        <Chat />
      </div>
      <MyCartAside active_cart={activeCart} />
      <Search showSearch={showSearch} onReceiveFalse={handleCancelSearch} />
      {isAudio && (
        <audio autoPlay src={process.env.PUBLIC_URL + '/sound1.mp3'}>
          dfvdvdv d
        </audio>
      )}
      <FormLogout
        isOpenFormLogOut={isOpenFormLogOut}
        onFormFalse={falseFromLogOut}
      ></FormLogout>
      <FormInformation isForm={isForm} onFormFalse={formfalseHandler} />
    </>
  );
}

export default Header;
