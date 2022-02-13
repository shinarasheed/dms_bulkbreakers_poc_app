import {
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAIL,
  GET_DISTRIBUTOR_REQUEST,
  GET_DISTRIBUTOR_SUCCESS,
  GET_DISTRIBUTOR_FAIL,
  GET_DISTRIBUTORS_REQUEST,
  GET_DISTRIBUTORS_SUCCESS,
  GET_DISTRIBUTORS_FAIL,
  LOGOUT,
  RESTORE_TOKEN,
  RETRIVE_CUSTOMER,
  SORT_DISTRIBUTORS,
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
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_CUSTOMER_SUCCESS:
      return {
        isLoading: false,
        customer: action.payload,
      };
    case GET_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

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

    case GET_DISTRIBUTORS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        distributors: action.payload.distributors,
        token: action.payload.token,
        isAuthenticated: true,
        assigned: false,
      };

    case GET_DISTRIBUTORS_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case SORT_DISTRIBUTORS:
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

    case RESTORE_TOKEN:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.payload.token,
      };

    case RETRIVE_CUSTOMER:
      return {
        ...state,
        customerDetails: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        token: null,
        distributors: [],
      };

    default:
      return state;
  }
};
