import React, { useEffect, useState } from "react";
import style from "../../DetailPage/DetailPage.module.scss";
import productApi from "api/productApi";

function Item(props) {
  const [arraySize, setArraySize] = useState([]);

  const [activeToggleColor, setActiveToggleColor] = useState({
    activeObject: null,
    objects: arraySize,
  });
  useEffect(() => {
    setActiveToggleColor((prev) => {
      return {
        ...prev,
        activeObject: null,
        objects: arraySize,
      };
    });
  }, [arraySize]);
  // const arraySize = props.arrayProductDetail.map((data) => data.size);
  // let arraySizeUnique = [];
  // const [arraySizeUniqueState, setArraySizeUniqueState] = useState([]);

  // for (var i = 0; i < arraySize.length; i++) {
  //   if (arraySizeUnique.indexOf(arraySize[i]) === -1) {
  //     arraySizeUnique.push(arraySize[i]);
  //   }
  // }

  // useEffect(() => {
  //   setArraySizeUniqueState(arraySizeUnique);
  // }, []);
  useEffect(() => {
    const fetchArraySize = async () => {
      try {
        const requestArraySize = await productApi.getSizeByProductId(
          props.dataProduct._id
        );
        setArraySize(requestArraySize.data.sizes.sort());
      } catch (error) {
        console.log(error);
      }
    };
    fetchArraySize();
  }, []);

  useEffect(() => {
    props.receiveDataSizeOriginal(arraySize?.[0]);
  }, [arraySize?.[0]]);
  return (
    <>
      {arraySize?.map((data, index) => {
        const toggleActive = (index) => {
          setActiveToggleColor({
            ...activeToggleColor,
            activeObject: activeToggleColor?.objects[index],
          });
        };
        const toggleActiveStyle = (index) => {
          // console.log(activeToggleColor);
          // console.log(activeToggleColor.objects[index]);
          // console.log(activeToggleColor?.activeObject);
          if (
            activeToggleColor?.objects[index] ===
            activeToggleColor?.activeObject
          ) {
            return style.active;
          }
        };
        const inActiveColor = (e) => {
          toggleActive(index);
          props.receiveDataSize(data);
          const fetchPriceColorBySize = async () => {
            try {
              const requestPriceColorBySize =
                await productApi.getPriceColorBySize(
                  props.dataProduct._id,
                  data
                );
              console.log(requestPriceColorBySize);
              props.receiveDataColorPrice(requestPriceColorBySize.data);
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

export default Item;
