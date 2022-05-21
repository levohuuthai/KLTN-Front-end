import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import '../detailpage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

function ItemColor(props) {
  const [arrayColor, setArrayColor] = useState([]);

  const [activeToggleColor, setActiveToggleColor] = useState({
    activeObject: null,
    objects: props.arrayColor,
  });
  useEffect(() => {
    setActiveToggleColor((prev) => {
      return {
        ...prev,
        activeObject: null,
        objects: props.arrayColor,
      };
    });
  }, [props.arrayColor]);

  return (
    <>
      <Swiper
        onSwiper={props.setActiveThumbColor}
        // className="position-relative"
        modules={[Thumbs]}
        pagination={{
          clickable: true,
        }}
        // direction="vertical"
        // spaceBetween={-300}
        slidesPerView={props.arrayColor.length}
        loop={false}
      >
        {props.arrayColor?.map((data, index) => {
          const toggleActive = (index) => {
            setActiveToggleColor({
              ...activeToggleColor,
              activeObject: activeToggleColor?.objects[index],
            });
          };
          const toggleActiveStyle = (index) => {
            if (
              activeToggleColor?.objects[index] ===
              activeToggleColor?.activeObject
            ) {
              return 'active';
            }
          };
          const inActiveColor = (e) => {
            toggleActive(index);
            props.receiveDataColor(data.color);
            props.onfromTrueData(true);
          };

          return (
            <SwiperSlide
              style={{
                width: '0px',
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              <span
                className={`${toggleActiveStyle(index)} `}
                onClick={inActiveColor}
                key={index}
              >
                {data.color}
              </span>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* {props.arrayColor?.map((data, index) => {
        const toggleActive = (index) => {
          setActiveToggleColor({
            ...activeToggleColor,
            activeObject: activeToggleColor?.objects[index],
          });
        };
        const toggleActiveStyle = (index) => {
          if (
            activeToggleColor?.objects[index] ===
            activeToggleColor?.activeObject
          ) {
            return style.active;
          }
        };
        const inActiveColor = (e) => {
          toggleActive(index);
          props.receiveDataColor(data.color);
          const fetchPriceColorBySize = async () => {
            try {
              const requestPriceColorBySize =
                await productApi.getPriceSizeByColor(
                  props.dataProduct._id,
                  data.color
                );
              // console.log(requestPriceColorBySize);
              // props.receiveDataSizePrice(requestPriceColorBySize.data);
            } catch (error) {
              console.log(error);
            }
          };
          fetchPriceColorBySize();
        };
        return (
          <span
            className={`${toggleActiveStyle(index)} `}
            onClick={inActiveColor}
            key={index}
          >
            {data.color}
          </span>
         
        );
      })} */}
    </>
  );
}

export default ItemColor;
