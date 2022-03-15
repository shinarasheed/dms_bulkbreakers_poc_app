import axios from "axios";
import {
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAIL,
  GET_DISTRIBUTOR_REQUEST,
  GET_DISTRIBUTOR_SUCCESS,
  GET_DISTRIBUTOR_FAIL,
  GET_SELLERS_REQUEST,
  GET_SELLERS_SUCCESS,
  GET_SELLERS_FAIL,
  RETRIVE_CUSTOMER,
  RESTORE_TOKEN,
  LOGOUT,
  GET_CUSTOMER_INVENTORY_REQUEST,
  GET_CUSTOMER_INVENTORY_SUCCESS,
  GET_CUSTOMER_INVENTORY_FAIL,
  UPDATE_PRODUCT_STATUS,
  DELETE_INVENTORY_PRODUCT,
  SORT_SELLERS,
  GET_BULKBREAKERS_REQUEST,
  GET_BULKBREAKERS_SUCCESS,
  GET_BULKBREAKERS_FAIL,
  SELLERS_NOT_NEAR,
} from "../constants/customerConstants";
import {
  COMPANY_BASE_URL,
  CUSTOMER_BASE_URL,
  INVENTORY_BASE_URL,
} from "../../confg";
import { Routes } from "../../navigation/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistanceApart } from "../../utils/calCulateDistance";

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

    const {
      data: { results },
    } = await axios.post(
      `${CUSTOMER_BASE_URL}/customer/get-by-lastdigit/Nigeria`,

      body,
      config
    );

    dispatch({
      type: GET_CUSTOMER_SUCCESS,
      payload: results[0],
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
export const getDistributor = (code) => async (dispatch) => {
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
      `${COMPANY_BASE_URL}/company/code/${code}`,

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

export const getDistributors = () => async (dispatch, getState) => {
  const { customer } = getState().customer;

  try {
    dispatch({
      type: GET_SELLERS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { result },
    } = await axios.get(
      `${COMPANY_BASE_URL}/company/companies/Nigeria
      `,
      config
    );

    let distributors = result;

    const mapdistributorsToShow = distributors.map((distributor) => ({
      ...distributor,
      byFar: parseInt(
        getDistanceApart(
          { lat: customer?.latitude, lon: customer?.longitude },
          { lat: distributor?.lat, lon: distributor?.long }
        )
      ),
    }));

    const nearDistributors = mapdistributorsToShow
      .filter((distributor) => distributor.byFar <= 5)
      .sort(
        (distributorA, distributorB) => distributorA.byFar - distributorB.byFar
      );

    const token = await AsyncStorage.getItem("token");
    let distributorsToShow;

    if (nearDistributors.length > 0) {
      distributorsToShow = nearDistributors;
    } else {
      distributorsToShow = mapdistributorsToShow;
      dispatch({
        type: SELLERS_NOT_NEAR,
      });
    }

    dispatch({
      type: GET_SELLERS_SUCCESS,
      payload: {
        distributorsToShow,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_SELLERS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const getBulkbreakers = () => async (dispatch, getState) => {
  const { customer } = getState().customer;
  try {
    dispatch({
      type: GET_BULKBREAKERS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { result },
    } = await axios.get(
      `${CUSTOMER_BASE_URL}/customer/getcustomerbytype/Nigeria/Bulkbreaker`,
      config
    );

    let distributors = result;

    const mapdistributorsToShow = distributors.map((distributor) => ({
      ...distributor,
      byFar: parseInt(
        getDistanceApart(
          { lat: customer?.latitude, lon: customer?.longitude },
          { lat: distributor?.latitude, lon: distributor?.longitude }
        )
      ),
    }));

    const nearDistributors = mapdistributorsToShow
      .filter((distributor) => distributor.byFar <= 5)
      .sort(
        (distributorA, distributorB) => distributorA.byFar - distributorB.byFar
      );

    let distributorsToShow;

    if (nearDistributors.length === 0) {
      distributorsToShow = mapdistributorsToShow;
    } else {
      distributorsToShow = nearDistributors;
    }

    const token = await AsyncStorage.getItem("token");

    dispatch({
      type: GET_BULKBREAKERS_SUCCESS,
      payload: {
        distributorsToShow,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_BULKBREAKERS_FAIL,
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
    payload: token,
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
    type: SORT_SELLERS,
    payload: sortBy,
  });
};

export const getMyInventory = () => async (dispatch, getState) => {
  const {
    customer: { id },
  } = getState().customer;

  try {
    dispatch({
      type: GET_CUSTOMER_INVENTORY_REQUEST,
    });

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

export const updateProductStatus =
  (customerId, productId, value) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const payload = {
        bulkBreakerId: customerId.toString(),
        productId: parseInt(productId),
        status: value,
      };

      const { data } = await axios.put(
        `${INVENTORY_BASE_URL}/bb/update-stock-status`,
        payload,
        config
      );

      dispatch({
        type: UPDATE_PRODUCT_STATUS,
        payload: productId,
      });
      dispatch(getMyInventory());
    } catch (error) {
      console.log(error);
    }
  };

export const deleteInventoryProduct =
  (customerId, productId) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const payload = {
        bulkBreakerId: customerId.toString(),
        productId: parseInt(productId),
      };

      await axios.delete(
        `${INVENTORY_BASE_URL}/bb/delete-product`,
        payload,
        config
      );

      dispatch({
        type: DELETE_INVENTORY_PRODUCT,
        payload: productId,
      });
    } catch (error) {
      console.log(error);
    }
  };
