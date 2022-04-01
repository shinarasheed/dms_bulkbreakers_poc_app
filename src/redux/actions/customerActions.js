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
  SORT_SELLERS,
  GET_BULKBREAKERS_REQUEST,
  GET_BULKBREAKERS_SUCCESS,
  GET_BULKBREAKERS_FAIL,
  SELLERS_NOT_NEAR,
  DELETE_INVENTORY_PRODUCT_REQUEST,
  DELETE_INVENTORY_PRODUCT_FAIL,
  DELETE_INVENTORY_PRODUCT_SUCCESS,
} from "../constants/customerConstants";
import {
  COMPANY_BASE_URL,
  CUSTOMER_BASE_URL,
  INVENTORY_BASE_URL,
} from "../../confg";
import { Routes } from "../../navigation/Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistanceApart } from "../../utils/calCulateDistance";

export const getCustomerDetails = (code) => async (dispatch) => {
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

    const { data } = await axios.post(
      `${CUSTOMER_BASE_URL}/customer/get-by-lastdigit/Nigeria`,
      body,
      config
    );

    const { results, success } = data;

    dispatch({
      type: GET_CUSTOMER_SUCCESS,
      payload: {
        result: results[0],
        status: success,
      },
    });
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
      BB_Code: distributor.DIST_Code,
      sellerName: distributor.DD_Name,
      companyName: distributor.Owner_Name,
      email: distributor.email,
      sysproCode: distributor.SYS_Code,
      customerType: distributor.company_type,
      DistCode: distributor.DIST_Code,
      salesforceCode: distributor.SF_Code,
      address: distributor.address,
      country: distributor.country,
      district: distributor.district,
      phoneNumber: distributor.Owner_Phone,
      region: distributor.region,
      state: distributor.state,
      id: distributor.id,
      sellerType: distributor.country_type,
      raters: distributor.raters,
      ratings: distributor.ratings,
      stars: distributor.stars,
      status: distributor.status,
      latitude: distributor?.lat,
      longitude: distributor?.long,
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

      dispatch({
        type: GET_SELLERS_SUCCESS,
        payload: {
          distributorsToShow,
          token,
        },
      });
    } else {
      distributorsToShow = mapdistributorsToShow;

      dispatch({
        type: GET_SELLERS_SUCCESS,
        payload: {
          distributorsToShow,
          token,
        },
      });

      dispatch({
        type: SELLERS_NOT_NEAR,
      });
    }

    // const theAction = await AsyncStorage.getItem("action");
    // if (theAction === "setupstore") {
    //   navigation.navigate(Routes.ADDPRODUCTS_SCREEN);
    // }
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

    const {
      data: { result: theResult },
    } = await axios.get(
      `${COMPANY_BASE_URL}/company/companies/Nigeria
      `,
      config
    );

    //distributors

    let distributors = theResult;

    const allDistributors = distributors.map((distributor) => ({
      BB_Code: distributor.DIST_Code,
      sellerName: distributor.DD_Name,
      companyName: distributor.Owner_Name,
      email: distributor.email,
      sysproCode: distributor.SYS_Code,
      customerType: distributor.company_type,
      DistCode: distributor.DIST_Code,
      salesforceCode: distributor.SF_Code,
      sellerCompanyId: distributor.SYS_Code,
      address: distributor.address,
      country: distributor.country,
      district: distributor.district,
      phoneNumber: distributor.Owner_Phone,
      region: distributor.region,
      state: distributor.state,
      id: distributor.id,
      sellerType: distributor.country_type,
      raters: distributor.raters,
      ratings: distributor.ratings,
      stars: distributor.stars,
      status: distributor.status,
      latitude: distributor?.lat,
      longitude: distributor?.long,
      byFar: parseInt(
        getDistanceApart(
          { lat: customer?.latitude, lon: customer?.longitude },
          { lat: distributor?.lat, lon: distributor?.long }
        )
      ),
    }));

    //bulkbreakers
    let bulkbreakers = result;

    const allBulkbreakers = bulkbreakers.map((bulkbreaker) => ({
      BB_Code: bulkbreaker.BB_Code,
      sellerName: bulkbreaker.CUST_Name,
      companyName: bulkbreaker.CUST_Name,
      customerType: bulkbreaker.CUST_Type,
      DistCode: bulkbreaker.DIST_Code,
      salesforceCode: bulkbreaker.SF_Code,
      sellerCompanyId: bulkbreaker.SF_Code,
      address: bulkbreaker.address,
      country: bulkbreaker.country,
      district: bulkbreaker.district,
      phoneNumber: bulkbreaker.phoneNumber,
      region: bulkbreaker.region,
      state: bulkbreaker.state,
      id: bulkbreaker.id,
      latitude: bulkbreaker?.latitude,
      longitude: bulkbreaker?.longitude,
      byFar: parseInt(
        getDistanceApart(
          { lat: customer?.latitude, lon: customer?.longitude },
          { lat: bulkbreaker?.latitude, lon: bulkbreaker?.longitude }
        )
      ),
    }));

    const nearDistributors = allDistributors
      .filter((distributor) => distributor.byFar <= 5)
      .sort(
        (distributorA, distributorB) => distributorA.byFar - distributorB.byFar
      );

    const nearBulkbreakers = allBulkbreakers
      .filter((bulkbreaker) => bulkbreaker.byFar <= 5)
      .sort(
        (bulkbreakerA, bulkbreakerB) => bulkbreakerA.byFar - bulkbreakerB.byFar
      );

    const allSellers = [...allDistributors, ...allBulkbreakers];

    const nearSellers = [...nearDistributors, ...nearBulkbreakers];

    // console.log(nearBulkbreakers, "bulks");
    // console.log(nearDistributors, "dist");
    // console.log(nearSellers.length);

    let distributorsToShow;

    if (nearSellers.length > 0) {
      distributorsToShow = nearSellers;
    } else {
      distributorsToShow = allSellers;
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

export const getMyInventory = (Id) => async (dispatch, getState) => {
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
    } = await axios.get(`${INVENTORY_BASE_URL}/bb/${Id}`, config);

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
      dispatch(getMyInventory(customerId));
    } catch (error) {
      console.log(error);
    }
  };

export const deleteInventoryProduct = (deletePayload) => async (dispatch) => {
  const { bulkBreakerId, productId } = deletePayload;
  try {
    dispatch({
      type: DELETE_INVENTORY_PRODUCT_REQUEST,
    });
    const { data } = await axios.delete(
      `${INVENTORY_BASE_URL}/bb/delete-product`,
      {
        data: deletePayload,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { status } = data;

    dispatch({
      type: DELETE_INVENTORY_PRODUCT_SUCCESS,
      payload: {
        productId,
        status,
      },
    });
  } catch (error) {
    dispatch({
      type: DELETE_INVENTORY_PRODUCT_FAIL,
    });
    console.log(error);
  }
};
