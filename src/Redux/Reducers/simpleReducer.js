import { GET_COUNTRIES, GET_ITEMS, GET_COUNTRIES_WITH,GET_LOADING } from "./../Actions/types";
const INITIAL_STATE = {
  users: [],
  loading: true,
  items: [],
  usersWith: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_COUNTRIES:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case GET_COUNTRIES_WITH:
      return {
        ...state,
        usersWith: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
