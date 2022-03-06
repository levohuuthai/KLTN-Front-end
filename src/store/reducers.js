import { ACTIOS } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIOS.ActiveShowCart:
      return {
        ...state,
        activeCart: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
