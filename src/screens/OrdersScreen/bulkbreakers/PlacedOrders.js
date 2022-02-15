import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import OpenOrders from "../../../components/orders/bulkbreakers/OpenOrderPlaced";
import ClosedOrders from "../../../components/orders/bulkbreakers/ClosedOrderPlaced";
import OrdersTab from "../../../components/orders/OrdersTab";
import { Header } from "../../../components/orders/Header";

import appTheme from "../../../constants/theme";
import { icons } from "../../../constants";

import { orders } from "../../../data";
import { getMyOrders } from "../../../redux/actions/orderActions";
// import { fetchAllProductsIntheCompany } from "../../redux/actions/products";

export default function PlacedOrders() {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const categories = ["open orders", "completed orders"];
  const [searchTerm, setSearchTerm] = useState("");

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  const myOrdersState = useSelector((state) => state.myOrders);

  const { openOrders, deliveredOrders, myorders, loading } = myOrdersState;

  // const filteredOpenOrders = openOrders?.filter((item) =>
  //   item.orderId.includes(searchTerm)
  // );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getMyOrders(customer?.SF_Code));
    }, [navigation])
  );

  const [theOpenOrders, setTheOpenOrders] = useState([]);
  const [theClosedOrders, setTheClosedOrders] = useState([]);

  useEffect(() => {
    setTheOpenOrders(openOrders);
    setTheClosedOrders(deliveredOrders);
  }, [myorders, navigation]);

  const ShowOrders = (index) => {
    switch (index) {
      case 0:
        return <OpenOrders myorders={theOpenOrders} />;

      case 1:
        return <ClosedOrders myorders={theClosedOrders} />;

      default:
        return <OpenOrders myorders={theOpenOrders} />;
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <Header title="Placed Orders" />

      <View style={{ paddingHorizontal: 20 }}>
        <OrdersTab categories={categories} index={index} setIndex={setIndex} />
      </View>

      <View style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={20}
          style={{ color: appTheme.COLORS.mainYellow }}
        />

        <TextInput
          placeholder="Search order no/buyer"
          style={{
            fontSize: 15,
            paddingLeft: 5,
            flex: 1,
            fontFamily: "Gilroy-Light",
            color: appTheme.COLORS.black,
          }}
          onChangeText={(textValue) => setSearchTerm(textValue)}
        />
      </View>

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            color={
              Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
            }
            animating={loading}
            size="large"
          />
        </View>
      ) : (
        ShowOrders(index)
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9799A0",
    borderWidth: 0,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 20,
  },
});
