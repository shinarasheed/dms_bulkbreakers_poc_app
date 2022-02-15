import axios from "axios";
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
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAIL,
} from "../constants/orderConstants";
import { ORDER_BASE_URL } from "../../confg";
import moment from "moment";

export const placeOrder = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: PLACE_ORDER_REQUEST,
    });

    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoic2FsZXNmb3JjZV90b2tlbl9pZGVudGlmaWVyX2Rtc192Ml8weHNqdDNAMyEjJF45In0.PHCkrf6sPkoep7lF5X-SugN8-CVaJ5BEYa9hvSWLPMo";

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const {
      data: { data },
    } = await axios.post(`${ORDER_BASE_URL}/CreateOrder`, payload, config);

    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOrders = (salesForceCode) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MYORDERS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { order },
    } = await axios.get(
      `${ORDER_BASE_URL}/GetOrder/GetOrderByBuyerCompanyId/${salesForceCode}`,
      config
    );

    // const result = order.sort(
    //   (orderA, orderB) =>
    //     moment(orderA.orderStatus[0].datePlaced).format("MMM Do, YYYY") -
    //     moment(orderB.orderStatus[0].datePlaced).format("MMM Do, YYYY")
    // );

    dispatch({
      type: GET_MYORDERS_SUCCESS,
      payload: order,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_MYORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSingleOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_ORDER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { order },
    } = await axios.get(
      `${ORDER_BASE_URL}/GetOrder/GetOrderByOrderId/${orderId}`,
      config
    );

    dispatch({
      type: GET_SINGLE_ORDER_SUCCESS,
      payload: order,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toggleOrderPlaced = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_ORDER_PLACED,
    payload: false,
  });
};

export const updateOrderStatus = (status, orderId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      status,
    };

    await axios.patch(
      `${ORDER_BASE_URL}/UpdateOrder/UpdateStatus/${orderId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_ORDER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
