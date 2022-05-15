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
    dataFilterPriceUnder200: { value: undefined, active: false },
    dataFilterPrice200To500: {
      priceMin: undefined,
      priceMax: undefined,
      active: false,
      active500To1000: false,
    },
    dataFilterPriceOver1000: { value: undefined, active: false },
    dataFilterStar: {
      value: undefined,
      active: false,
      active4: false,
      active3: false,
      active2: false,
    },
    dataFilterStyle: [],
    dataFilter: [],
    filterPaginationByProduct: { _page: 1, _limit: 2 },
    paginationByFilterProduct: {
      limit: 2,
      total: 10,
      page: 1,
    },

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
