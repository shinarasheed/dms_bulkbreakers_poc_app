import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import React from "react";

import OrdersBulkbreakers from "../OrdersScreen/bulkbreakers/index";
import OrdersPocs from "../OrdersScreen/pocs/index";

const OrdersScreen = () => {
  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;
  return (
    <>
      {customer?.CUST_Type === "BulkBreaker" ? (
        <OrdersBulkbreakers />
      ) : (
        <OrdersPocs />
      )}
    </>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
