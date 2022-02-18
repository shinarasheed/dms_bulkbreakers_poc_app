import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import { Order } from "./pocs/Order";

const OpenOrders = ({ myorders }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {myorders?.map((item, index) => (
        <Order item={item} key={index} />
      ))}
    </ScrollView>
  );
};

export default OpenOrders;
