import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ORDERING,
  DECREASE_PRODUCT,
  INCREASE_PRODUCT,
  INCREASE_PRODUCT_BY_TYPING,
  GET_ALLPRODUCTS_SUCCESS,
  GET_ALL_COMPANY_PRODUCTS_REQUEST,
  GET_ALL_COMPANY_PRODUCTS_SUCCESS,
  GET_ALL_COMPANY_PRODUCTS_FAIL,
  UNSAVED_CHANGES,
  ADD_PRODUCTS_TOSELL,
} from "../constants/products";

const initialState = {
  products: [],
  productsToOder: [],
  allProducts: [],
  allCompanyProducts: [],
  products_tosell: [],
  loading: false,
};

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS_REQUEST:
      return {
        loading: true,
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };

    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
      };

    case GET_ALLPRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allProducts: action.payload,
      };

    case GET_ALLPRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allProducts: action.payload,
      };

    case GET_ALL_COMPANY_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_COMPANY_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allCompanyProducts: action.payload,
      };

    case GET_ALL_COMPANY_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case INCREASE_PRODUCT:
      const product = state.products.find((item) => item?.id === payload);
      product.buyingQuantity++;
      return {
        ...state,
        productsToOder: state.products?.filter(
          (product) => product?.buyingQuantity > 0
        ),
      };

    case INCREASE_PRODUCT_BY_TYPING:
      const myproduct = state.products.find((item) => item?.id === payload.id);
      myproduct.buyingQuantity = payload.text;
      return {
        ...state,
        productsToOder: state.products?.filter(
          (product) => product?.buyingQuantity > 0
        ),
      };

    case DECREASE_PRODUCT:
      const theProduct = state.products.find((item) => item.id === payload);
      if (theProduct.buyingQuantity === 0) {
        let new_items = state.products.filter((item) => item.id !== payload);
        return {
          ...state,
          products: new_items,
        };
      } else {
        theProduct.buyingQuantity--;
        return {
          ...state,
        };
      }

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((item) => item.id !== payload),
        productsToOder: state.productsToOder.filter(
          (item) => item.id !== payload
        ),
      };

    case DELETE_PRODUCT_ORDERING:
      return {
        ...state,
        productsToOder: state.productsToOder.filter(
          (item) => item.id !== payload
        ),
      };

    case ADD_PRODUCTS_TOSELL: {
      return { ...state, products_tosell: action.products_tosell };
    }

    default:
      return state;
  }
};
