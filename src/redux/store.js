import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import customerReducer from "./reducers/customerReducer";
import { productReducer } from "./reducers/products";
import {
  listMyOrdersReducer,
  placeOrderReducer,
  singleOrdersReducer,
} from "./reducers/orderReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["customer", "distributors"],
};

const reducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  customer: persistReducer(persistConfig, customerReducer),
  createOrder: placeOrderReducer,
  myOrders: listMyOrdersReducer,
  singleOrder: singleOrdersReducer,
});

const initialState = {};

const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
