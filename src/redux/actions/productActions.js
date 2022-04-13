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
  ADD_PRODUCT_TOSELL,
  DELETE_PRODUCT_TO_SELL,
  SAVE_PRODUCTS_REQUEST,
  SAVE_PRODUCTS_SUCCESS,
  SAVE_PRODUCTS_FAIL,
  UPDATE_INVENTORY_REQUEST,
  UPDATE_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_FAIL,
  EDIT_PRODUCT_PRICE,
  EDIT_PRODUCT_PRICE_FAIL,
  EDIT_PRODUCT_PRICE_REQUEST,
} from "../constants/products";
import { INVENTORY_BASE_URL, PRODUCTS_BASE_URL } from "../../confg";
import { getMyInventory } from "./customerActions";

export const getProducts = (code) => async (dispatch, getState) => {
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
    } = await axios.get(`${INVENTORY_BASE_URL}/bb/${code}`, config);

    let availableProducts = data;

    availableProducts = availableProducts?.map((item) => ({
      companyCode: item.companyCode,
      date: item.date,
      id: item.id,
      brand: item.product.brand,
      country: item.product.country,
      imageUrl: item.product.imageUrl,
      price: item.product.price,
      sellerPrice: item?.price,
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

export const getDistributorProducts = (code) => async (dispatch, getState) => {
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
    } = await axios.get(`${INVENTORY_BASE_URL}/inventory/${code}`, config);

    console.log(data, "here");

    //is this needed?
    // let availableProducts = data.filter((product) => product.quantity > 0);

    let availableProducts = data?.map((item) => ({
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
      pocPrice: item.product.poc_price,
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

export const addProductsToSave = (action) => (dispatch) => {
  dispatch({
    type: UNSAVED_CHANGES,
    transfer_change: action,
  });
};

export const productToSell = (item) => (dispatch) => {
  dispatch({
    type: ADD_PRODUCT_TOSELL,
    payload: item,
  });
};

export const deleteProductToSell = (productId) => (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT_TO_SELL,
    payload: productId,
  });
};

export const saveProductsToSell = (payload) => async (dispatch, getState) => {
  const {
    customer: { id },
  } = getState().customer;

  try {
    dispatch({
      type: SAVE_PRODUCTS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { data },
    } = await axios.post(`${INVENTORY_BASE_URL}/bb/add`, payload, config);

    dispatch({
      type: SAVE_PRODUCTS_SUCCESS,
      payload: data,
    });
    dispatch(getMyInventory(id));
  } catch (error) {
    dispatch({
      type: SAVE_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//i do not need this because we are not taking stock in shopdc
export const updateInventory = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_INVENTORY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${INVENTORY_BASE_URL}/inventory/update-quantity`,
      payload,
      config
    );

    dispatch({
      type: UPDATE_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_INVENTORY_FAIL,
      payload: "There was an error",
    });
  }
};

export const updateProductPrice = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_PRODUCT_PRICE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`${INVENTORY_BASE_URL}/bb/stock-price`, payload, config);

    dispatch({
      type: EDIT_PRODUCT_PRICE,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_PRODUCT_PRICE_FAIL,
      payload: "There was an error",
    });
  }
};
