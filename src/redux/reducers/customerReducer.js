import {
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAIL,
  GET_DISTRIBUTOR_REQUEST,
  GET_DISTRIBUTOR_SUCCESS,
  GET_DISTRIBUTOR_FAIL,
  GET_SELLERS_REQUEST,
  GET_SELLERS_FAIL,
  GET_SELLERS_SUCCESS,
  LOGOUT,
  RESTORE_TOKEN,
  RETRIVE_CUSTOMER,
  GET_CUSTOMER_INVENTORY_REQUEST,
  GET_CUSTOMER_INVENTORY_SUCCESS,
  GET_CUSTOMER_INVENTORY_FAIL,
  DELETE_INVENTORY_PRODUCT,
  UPDATE_PRODUCT_STATUS,
  SORT_SELLERS,
  GET_BULKBREAKERS_FAIL,
  GET_BULKBREAKERS_SUCCESS,
  GET_BULKBREAKERS_REQUEST,
  SELLERS_NOT_NEAR,
  DELETE_INVENTORY_PRODUCT_REQUEST,
  DELETE_INVENTORY_PRODUCT_SUCCESS,
  DELETE_INVENTORY_PRODUCT_FAIL,
  GET_BDR_CUSTOMERS_REQUEST,
  GET_BDR_CUSTOMERS_SUCCESS,
  GET_BDR_CUSTOMERS_FAIL,
} from "../constants/customerConstants";

const initialState = {
  isLoading: false,
  error: null,
  customer: null,
  distributor: null,
  distributors: [],
  token: null,
  isAuthenticated: false,
  assigned: false,
  customerDetails: null,
  myInventory: [],
  sellersNotNear: false,
  deleteStatus: false,
  status: null,
  bdrCustomers: [],
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case GET_CUSTOMER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customer: action.payload.result,
        status: action.payload.status,
      };
    case GET_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case GET_CUSTOMER_INVENTORY_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CUSTOMER_INVENTORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myInventory: action.payload,
      };
    case GET_CUSTOMER_INVENTORY_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case DELETE_INVENTORY_PRODUCT:
      return {
        ...state,
        isLoading: false,
        myInventory: state.myInventory.filter(
          (item) => item.productId !== payload
        ),
      };

    case UPDATE_PRODUCT_STATUS:
      const product = state.myInventory.find(
        (item) => item?.product?.productId === payload
      );

      product.instock = !product.instock;
      return { ...state };

    case GET_DISTRIBUTOR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        distributor: action.payload,
        assigned: true,
      };
    case GET_DISTRIBUTOR_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case GET_SELLERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SELLERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        distributors: action.payload.distributorsToShow,
        token: action.payload.token,
        isAuthenticated: true,
        assigned: false,
      };

    case GET_SELLERS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case SORT_SELLERS:
      return {
        ...state,
        distributors:
          action.payload === "DFTC"
            ? state.distributors.sort(
                (distributorA, distributorB) =>
                  distributorB.byFar - distributorA.byFar
              )
            : action.payload === "DCTF"
            ? state.distributors.sort(
                (distributorA, distributorB) =>
                  distributorA.byFar - distributorB.byFar
              )
            : state.distributors.sort(
                (distributorA, distributorB) =>
                  distributorA.byFar - distributorB.byFar
              ),
      };

    case SELLERS_NOT_NEAR:
      return {
        ...state,
        isLoading: false,
        sellersNotNear: true,
      };

    case GET_BULKBREAKERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_BULKBREAKERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        distributors: action.payload.distributorsToShow,
        token: action.payload.token,
        isAuthenticated: true,
        assigned: false,
      };

    case GET_BULKBREAKERS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case RESTORE_TOKEN:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload,
      };

    case RETRIVE_CUSTOMER:
      return {
        ...state,
        customerDetails: action.payload,
      };

    case LOGOUT:
      return {
        // isLoading: false,
        // isAuthenticated: false,
        // token: null,
        // distributors: [],

        isLoading: false,
        error: null,
        customer: null,
        distributor: null,
        distributors: [],
        token: null,
        isAuthenticated: false,
        assigned: false,
        customerDetails: null,
        myInventory: [],
        sellersNotNear: false,
      };

    case DELETE_INVENTORY_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case DELETE_INVENTORY_PRODUCT_SUCCESS:
      return {
        isLoading: false,
        deleteStatus: action.payload.status,
        myInventory: state.myInventory.filter(
          (item) => item?.product.id !== action.payload.productId
        ),
      };

    case DELETE_INVENTORY_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    case GET_BDR_CUSTOMERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GET_BDR_CUSTOMERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bdrCustomers: action.payload,
      };

    case GET_BDR_CUSTOMERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
