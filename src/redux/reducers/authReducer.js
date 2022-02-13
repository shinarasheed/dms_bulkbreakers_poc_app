import {
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
} from "../constants/authConstants";

const initialState = {
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        loading: false,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
