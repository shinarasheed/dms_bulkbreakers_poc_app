import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import { Order } from "./OrderPlaced";

const ClosedOrders = ({ myorders }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {myorders?.map((item, index) => (
        <Order item={item} key={index} />
      ))}
    </ScrollView>
  );
};

export default ClosedOrders;

const styles = StyleSheet.create({});
