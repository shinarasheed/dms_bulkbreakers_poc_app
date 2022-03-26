import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons } from "../../../constants";
import appTheme from "../../../constants/theme";

const Customer = ({ customer }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: appTheme.COLORS.white,
        paddingVertical: 40,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={icons.RestaurantColored} />
        <Text
          style={{
            marginLeft: 20,
          }}
        >
          {customer.name}
        </Text>
      </View>
      <Image source={icons.chevRonRight} />
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({});
