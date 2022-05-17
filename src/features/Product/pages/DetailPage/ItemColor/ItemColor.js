import productApi from "api/productApi";
import React, { useEffect, useState } from "react";
import style from "../../DetailPage/DetailPage.module.scss";

function ItemColor(props) {
  const [arrayColor, setArrayColor] = useState([]);

  const [activeToggleColor, setActiveToggleColor] = useState({
    activeObject: null,
    objects: arrayColor,
  });
  useEffect(() => {
    setActiveToggleColor((prev) => {
      return {
        ...prev,
        activeObject: null,
        objects: arrayColor,
      };
    });
  }, [arrayColor]);

  useEffect(() => {
    const fetchArrayColor = async () => {
      try {
        const requestArrayColor = await productApi.getColorByProductId(
          props.dataProduct._id
        );
        setArrayColor(requestArrayColor.data.colors);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArrayColor(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    props.receiveDataColorOriginal(arrayColor?.[0]); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayColor?.[0]]);
  useEffect(() => {
    setArrayColor(props.arrayColor);
  }, [props.arrayColor]);
  return (
    <>
      {arrayColor
        ?.sort((a, b) => {
          if (a > b) return -1;
          if (a < b) return 1;
          return 0;
        })
        .map((data, index) => {
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
            props.receiveDataColor(data);
            const fetchPriceColorBySize = async () => {
              try {
                const requestPriceColorBySize =
                  await productApi.getPriceSizeByColor(
                    props.dataProduct._id,
                    data
                  );
                console.log(requestPriceColorBySize);
                props.receiveDataSizePrice(requestPriceColorBySize.data);
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
              {data}
            </span>
          );
        })}
    </>
  );
}

export default ItemColor;
