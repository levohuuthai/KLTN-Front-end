import { ACTIOS } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIOS.ActiveShowCart:
      return {
        ...state,
        activeCart: action.payload,
      };
    case ACTIOS.dataCart:
      return {
        ...state,
        dataCart: action.payload,
      };
    case ACTIOS.activeQuickView:
      return {
        ...state,
        activeQuickView: action.payload,
      };
    case ACTIOS.dataQuickView:
      return {
        ...state,
        dataQuickView: action.payload,
      };
    case ACTIOS.dataWishList:
      return {
        ...state,
        dataWishList: action.payload,
      };
    case ACTIOS.dataFilterBrand:
      return {
        ...state,
        dataFilterBrand: action.payload,
      };

    case ACTIOS.dataFilterSize:
      return {
        ...state,
        dataFilterSize: action.payload,
      };
    case ACTIOS.dataFilterColor:
      return {
        ...state,
        dataFilterColor: action.payload,
      };
    case ACTIOS.dataFilterPriceUnder200:
      return {
        ...state,
        dataFilterPriceUnder200: action.payload,
      };
    case ACTIOS.dataFilterPriceOver1000:
      return {
        ...state,
        dataFilterPriceOver1000: action.payload,
      };
    case ACTIOS.dataFilterPriceFrom200To1000:
      return {
        ...state,
        dataFilterPriceFrom200To1000: action.payload,
      };
    case ACTIOS.dataFilter:
      return {
        ...state,
        dataFilter: action.payload,
      };
    case ACTIOS.dataProductFilter:
      return {
        ...state,
        dataProductFilter: action.payload,
      };
    case ACTIOS.dataAddress:
      return {
        ...state,
        dataAddress: action.payload,
      };
    case ACTIOS.loading:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIOS.loadingCart:
      return {
        ...state,
        loadingCart: action.payload,
      };
    case ACTIOS.loadingDeleteCart:
      return {
        ...state,
        loadingDeleteCart: action.payload,
      };
    case ACTIOS.loadingPageCart:
      return {
        ...state,
        loadingPageCart: action.payload,
      };
    case ACTIOS.loadingQuickView:
      return {
        ...state,
        loadingQuickView: action.payload,
      };
    case ACTIOS.dataFilterStyle:
      return {
        ...state,
        dataFilterStyle: action.payload,
      };
    case ACTIOS.totalStar:
      return {
        ...state,
        totalStar: action.payload,
      };
    case ACTIOS.dataArrOrderClient:
      return {
        ...state,
        dataArrOrderClient: action.payload,
      };
    case ACTIOS.loadingOrderClient:
      return {
        ...state,
        loadingOrderClient: action.payload,
      };
    //admin
    case ACTIOS.dataAllProduct:
      return {
        ...state,
        dataAllProduct: action.payload,
      };
    case ACTIOS.filterPagination:
      return {
        ...state,
        filterPagination: action.payload,
      };
    case ACTIOS.filterPaginationAllUser:
      return {
        ...state,
        filterPaginationAllUser: action.payload,
      };
    case ACTIOS.loadingAllProduct:
      return {
        ...state,
        loadingAllProduct: action.payload,
      };
    case ACTIOS.dataAllProductDetail:
      return {
        ...state,
        dataAllProductDetail: action.payload,
      };
    case ACTIOS.dataAllUser:
      return {
        ...state,
        dataAllUser: action.payload,
      };
    case ACTIOS.dataAllTypeProduct:
      return {
        ...state,
        dataAllTypeProduct: action.payload,
      };
    case ACTIOS.dataAllOrder:
      return {
        ...state,
        dataAllOrder: action.payload,
      };
    case ACTIOS.filterPaginationAllOrder:
      return {
        ...state,
        filterPaginationAllOrder: action.payload,
      };
    case ACTIOS.dataAllOrderDetail:
      return {
        ...state,
        dataAllOrderDetail: action.payload,
      };
    case ACTIOS.dataAllCoupon:
      return {
        ...state,
        dataAllCoupon: action.payload,
      };
    // case ACTIOS.dataProductSearch:
    //   return {
    //     ...state,
    //     dataProductSearch: action.payload,
    //   };
    // case ACTIOS.dataProductDiscount:
    //   return {
    //     ...state,
    //     dataProductDiscount: action.payload,
    //   };
    default:
      return state;
  }
};
export default reducer;
