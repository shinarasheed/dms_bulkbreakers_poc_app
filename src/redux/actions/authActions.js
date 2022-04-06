import { adService } from "ad-b2c-react-native";
import jwt_decode from "jwt-decode";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Routes } from "../../navigation/Routes";

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/authConstants";
import { USER_BASE_URL } from "../../confg";
import { getBdrCustomers } from "./customerActions";

export const register = (navigation) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const token = await adService.getIdToken();
    const decoded = await jwt_decode(token);
    const email = decoded?.emails[0];

    // console.log(decoded);

    // if the user is new
    if (decoded.newUser) {
      // register

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        token,
      };

      //continue
      await axios.post(`${USER_BASE_URL}/register`, body, config);
      await AsyncStorage.setItem("token", token);
      navigation.navigate(Routes.CONTINUE_SCREEN);

      dispatch({
        type: REGISTER_SUCCESS,
      });
    } else {
      //log them in

      if (email) {
        await AsyncStorage.setItem("token", token);
        navigation.navigate(Routes.CUSTOMERS_SCREEN);
        dispatch(getBdrCustomers(email));
      } else {
        await AsyncStorage.setItem("token", token);
        navigation.navigate(Routes.CONTINUE_SCREEN);
      }

      dispatch({
        type: LOGIN_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: "Signup Error. This account already exist in our system",
    });

    await adService.logoutAsync();
    await AsyncStorage.clear();
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
