import axios from "axios";
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
  RETRIVE_CUSTOMER,
  SORT_DISTRIBUTORS,
  RESTORE_TOKEN,
  LOGOUT,
  GET_CUSTOMER_INVENTORY_REQUEST,
  GET_CUSTOMER_INVENTORY_SUCCESS,
  GET_CUSTOMER_INVENTORY_FAIL,
} from "../constants/customerConstants";
import { CUSTOMER_BASE_URL, INVENTORY_BASE_URL } from "../../confg";
import { Routes } from "../../navigation/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistanceApart } from "../../utils/calCulateDistance";
import { getAllProducts } from "./productActions";

export const getCustomerDetails = (code, navigation) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CUSTOMER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      sfDigit: code,
    };

    // const {
    //   data: { results },
    // } = await axios.post(
    //   `${CUSTOMER_BASE_URL}/customer/get-by-lastdigit/Nigeria`,
    //   body,
    //   config
    // );

    const {
      data: { result },
    } = await axios.get(
      `${CUSTOMER_BASE_URL}/customer/${code}`,

      body,
      config
    );

    // dispatch({
    //   type: GET_CUSTOMER_SUCCESS,
    //   payload: results[0],
    // });

    dispatch({
      type: GET_CUSTOMER_SUCCESS,
      payload: result,
    });

    navigation.navigate(Routes.SELECT_CUSTOMER_SCREEN);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CUSTOMER_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};
export const getDistributor = (code, navigation) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISTRIBUTOR_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { result },
    } = await axios.get(
      `http://102.133.143.139/company/code/${code}`,

      config
    );

    const distributor = result;

    const token = await AsyncStorage.getItem("token");

    dispatch({
      type: GET_DISTRIBUTOR_SUCCESS,
      payload: {
        distributor,
        token,
      },
    });

    console.log(distributor);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_DISTRIBUTOR_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const getDistributors = (navigation) => async (dispatch, getState) => {
  const { customer } = getState().customer;

  try {
    dispatch({
      type: GET_DISTRIBUTORS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { result },
    } = await axios.get(
      `http://102.133.143.139/company/companies/Nigeria
    `,
      config
    );

    let distributors = result;

    distributors = distributors.map((distributor) => ({
      ...distributor,
      byFar: parseInt(
        getDistanceApart(
          { lat: customer?.latitude, lon: customer?.longitude },
          { lat: distributor?.lat, lon: distributor?.long }
        )
      ),
    }));

    distributors = distributors
      .filter((distributor) => distributor.byFar <= 475)
      .sort(
        (distributorA, distributorB) => distributorA.byFar - distributorB.byFar
      );

    const codes = distributors.map((distributor) => distributor.DIST_Code);

    // dispatch(getAllProducts(codes));

    const token = await AsyncStorage.getItem("token");

    dispatch({
      type: GET_DISTRIBUTORS_SUCCESS,
      payload: {
        distributors,
        token,
      },
    });

    // navigation.navigate(Routes.HOME_SCREEN);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_DISTRIBUTORS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const restoreToken = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  dispatch({
    type: RESTORE_TOKEN,
    payload: {
      token,
    },
  });
};

export const retrieveCustomer = () => async (dispatch) => {
  const value = await AsyncStorage.getItem("customerDetails");
  const customerDetails = JSON.parse(value);
  dispatch({
    type: RETRIVE_CUSTOMER,
    payload: customerDetails,
  });
};

export const sortDistributors = (sortBy) => async (dispatch) => {
  dispatch({
    type: SORT_DISTRIBUTORS,
    payload: sortBy,
  });
};

export const getMyInventory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CUSTOMER_INVENTORY_REQUEST,
    });

    const {
      customer: { id },
    } = getState().customer;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { data },
    } = await axios.get(`${INVENTORY_BASE_URL}/bb/${id}`, config);

    dispatch({
      type: GET_CUSTOMER_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CUSTOMER_INVENTORY_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};
