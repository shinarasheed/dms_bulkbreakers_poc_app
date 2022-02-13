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
} from "../constants/authConstants";

export const register = (navigation) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const token = await adService.getIdToken();
    const decoded = await jwt_decode(token);

    console.log(decoded);

    console.log("register");

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
      await axios.post(`http://20.87.33.26/register`, body, config);
      navigation.navigate(Routes.CONTINUE_SCREEN);

      dispatch({
        type: REGISTER_SUCCESS,
      });
    } else {
      //log them in
      await AsyncStorage.setItem("token", token);
      navigation.navigate(Routes.CONTINUE_SCREEN);

      dispatch({
        type: LOGIN_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });

    await adService.logoutAsync();
    await AsyncStorage.clear();
  }
};
