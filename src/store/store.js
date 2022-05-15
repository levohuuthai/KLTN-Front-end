import { createContext, useReducer } from "react";
import reducers from "./reducers";
export const GlobalContext = createContext();

export const DataProvider = ({ children }) => {
  const initalState = {
    activeCart: false,
    dataCart: [],
    activeQuickView: false,
    dataQuickView: {},
    dataWishList: [],
    dataFilterBrand: [],
    dataFilterSize: [],
    dataFilterColor: [],
    dataFilterPriceUnder200: undefined,
    dataFilterPriceOver1000: undefined,
    dataFilterPriceFrom200To1000: undefined,
    dataFilterStyle: [],
    dataFilter: [],
    dataProductFilter: [],
    dataAddress: [],
    loading: false,
    loadingCart: false,
    loadingDeleteCart: false,
    loadingPageCart: false,
    loadingQuickView: false,
    totalStar: "",
    dataArrOrderClient: [],
    loadingOrderClient: false,
    //admin
    dataAllProduct: [],
    filterPagination: { _page: 1, _limit: 2 },
    filterPaginationAllUser: { _page: 1, _limit: 2 },
    loadingAllProduct: false,
    dataAllProductDetail: [],
    dataAllUser: [],
    dataAllTypeProduct: [],
    dataAllOrder: [],
    filterPaginationAllOrder: { _page: 1, _limit: 2 },
    dataAllOrderDetail: [], //chua dung
    dataAllCoupon: [],
    arrayMess: [],
    arrayChat: [],
    dataBoxChat: {},
  };

  const [state, dispatch] = useReducer(reducers, initalState);
  // const [state, dispatch] = useReducer(reducers, adminState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
