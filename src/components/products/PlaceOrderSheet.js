import React, { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { RadioButton } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { toggleOrderPlaced } from "../../redux/actions/orderActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";
import { updateInventory } from "../../redux/actions/productActions";

const BottomFilter = ({ productsToOder, bulkbreaker }) => {
  const createOrderState = useSelector((state) => state.createOrder);
  const navigation = useNavigation();

  const { placedOrder } = createOrderState;

  const dispatch = useDispatch();

  return (
    <View
      style={{
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >
      <Image
        style={{
          width: 20,
          height: 20,
          marginBottom: 10,
        }}
        source={icons.statusIcon}
      />
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Gilroy-Medium",
          marginBottom: 20,
          color: appTheme.COLORS.black,
          textAlign: "center",
        }}
      >
        Your Order has been placed successfully
      </Text>

      <TouchableOpacity
        onPress={() => {
          dispatch(toggleOrderPlaced());
          navigation.navigate(Routes.ORDER_DETAILS_SCREEN, {
            productsToOder,
            bulkbreaker,
            item: placedOrder,
          });
        }}
        style={{
          backgroundColor: appTheme.COLORS.mainRed,
          justifyContent: "center",
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          paddingHorizontal: 15,
          width: 120,
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 18,
            fontFamily: "Gilroy-Medium",
          }}
        >
          ok
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomFilter;
