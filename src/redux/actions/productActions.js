import axios from "axios";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  DECREASE_PRODUCT,
  INCREASE_PRODUCT,
  DELETE_PRODUCT,
  INCREASE_PRODUCT_BY_TYPING,
  DELETE_PRODUCT_ORDERING,
  GET_ALLPRODUCTS_SUCCESS,
  GET_ALL_COMPANY_PRODUCTS_REQUEST,
  GET_ALL_COMPANY_PRODUCTS_SUCCESS,
  GET_ALL_COMPANY_PRODUCTS_FAIL,
  UNSAVED_CHANGES,
  ADD_PRODUCTS_TOSELL,
} from "../constants/products";
import { INVENTORY_BASE_URL, PRODUCTS_BASE_URL } from "../../confg";

export const getProducts = (DistributorCode) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { data },
    } = await axios.get(
      `${INVENTORY_BASE_URL}/inventory/${DistributorCode}`,
      config
    );

    let availableProducts = data.filter((product) => product.quantity > 0);

    availableProducts = availableProducts?.map((item) => ({
      companyCode: item.companyCode,
      date: item.date,
      id: item.id,
      brand: item.product.brand,
      country: item.product.country,
      imageUrl: item.product.imageUrl,
      price: item.product.price,
      productId: item.product.productId,
      productType: item.product.productType,
      sku: item.product.sku,
      quantity: item.quantity,
      buyingQuantity: 0,
    }));

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: availableProducts,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllProducts = (codes) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await Promise.all(
    codes.map(async (code) => {
      const {
        data: { data },
      } = await axios.get(`${INVENTORY_BASE_URL}/inventory/${code}`, config);
      // const newData = [...new Set(data)];
      dispatch({
        type: GET_ALLPRODUCTS_SUCCESS,
        payload: data,
      });
    })
  );
};

export const incrementQuantity = (productId) => async (dispatch, getState) => {
  dispatch({
    type: INCREASE_PRODUCT,
    payload: productId,
  });
};

export const decrementQuantity = (productId) => async (dispatch, getState) => {
  dispatch({
    type: DECREASE_PRODUCT,
    payload: productId,
  });
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: productId,
  });
};

export const deleteProductOrdering = (productId) => async (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT_ORDERING,
    payload: productId,
  });
};

export const incrementQuantityByTyping = (text, id) => async (dispatch) => {
  dispatch({
    type: INCREASE_PRODUCT_BY_TYPING,
    payload: {
      text,
      id,
    },
  });
};

export const fetchAllProductsIntheCompany = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_COMPANY_PRODUCTS_REQUEST,
    });

    const {
      data: { data },
    } = await axios.get(
      `${PRODUCTS_BASE_URL}/products?limit=12&page=5&country=nigeria`
    );

    dispatch({
      type: GET_ALL_COMPANY_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_ALL_COMPANY_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addProductsToSave =
  (action) => (dispatch) => {
    dispatch({
      type: UNSAVED_CHANGES,
      transfer_change: action,
    });
  };

  export const productsToSell = (item) => (dispatch) => {
    dispatch({
      type: ADD_PRODUCTS_TOSELL,
      products_tosell: item,
    });
  };
