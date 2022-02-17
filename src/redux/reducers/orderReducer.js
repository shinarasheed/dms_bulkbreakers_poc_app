import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_MYORDERS_REQUEST,
  GET_MYORDERS_SUCCESS,
  GET_MYORDERS_FAIL,
  GET_SINGLE_ORDER_REQUEST,
  GET_SINGLE_ORDER_SUCCESS,
  GET_SINGLE_ORDER_FAIL,
  TOGGLE_ORDER_PLACED,
  GET_RECEIVED_ORDERS_REQUEST,
  GET_RECEIVED_ORDERS_SUCCESS,
  GET_RECEIVED_ORDERS_FAIL,
} from "../constants/orderConstants";

export const placeOrderReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PLACE_ORDER_REQUEST:
      return {
        loading: true,
      };

    case PLACE_ORDER_SUCCESS:
      return {
        loading: false,
        placedOrder: action.payload,
        orderPlaced: true,
      };

    case PLACE_ORDER_FAIL:
      return {
        loading: false,
      };

    case TOGGLE_ORDER_PLACED:
      return {
        orderPlaced: false,
      };

    default:
      return state;
  }
};

export const listMyOrdersReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MYORDERS_REQUEST:
      return {
        loading: true,
      };

    case GET_MYORDERS_SUCCESS:
      return {
        loading: false,
        myorders: action.payload,
        orderPlaced: true,
        openOrders: action.payload.filter(
          (order) => order.orderStatus[0].status !== "Delivered"
        ),
        deliveredOrders: action.payload.filter(
          (order) => order.orderStatus[0].status === "Delivered"
        ),
      };

    case GET_MYORDERS_FAIL:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

export const singleOrdersReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SINGLE_ORDER_REQUEST:
      return {
        loading: true,
      };

    case GET_SINGLE_ORDER_SUCCESS:
      return {
        loading: false,
        singleOrder: payload,
      };

    case GET_SINGLE_ORDER_FAIL:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

export const recievedOrdersReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_RECEIVED_ORDERS_REQUEST:
      return {
        loading: true,
      };

    case GET_RECEIVED_ORDERS_SUCCESS:
      return {
        loading: false,
        receivedOrders: payload,
        openOrders: action.payload.filter(
          (order) => order.orderStatus[0].status !== "Delivered"
        ),
        deliveredOrders: action.payload.filter(
          (order) => order.orderStatus[0].status === "Delivered"
        ),
      };

    case GET_RECEIVED_ORDERS_FAIL:
      return {
        loading: false,
      };

    default:
      return state;
  }
};
