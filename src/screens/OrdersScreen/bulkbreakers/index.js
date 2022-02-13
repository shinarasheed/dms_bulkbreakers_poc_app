import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import appTheme from "../../../constants/theme";
import { icons } from "../../../constants";
import { Routes } from "../../../navigation/Routes";

const Index = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.RECEIVED_ORDERS)}
        style={{
          backgroundColor: appTheme.COLORS.white,
          justifyContent: "space-between",
          flexDirection: "row",
          elevation: 50,
          alignItems: "center",
          paddingHorizontal: 10,
          marginBottom: 15,
          paddingTop: 30,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image source={icons.receivedOrders} />

          <View
            style={{
              marginLeft: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "Gilroy-Medium",
                fontSize: 18,
                color: appTheme.COLORS.black,
              }}
            >
              Received orders
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
                marginTop: 4,
                color: appTheme.COLORS.textGray,
              }}
            >
              Orders placed on your store
            </Text>
          </View>
        </View>

        <Image source={icons.chevRonRight} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.PLACED_ORDERS)}
        style={{
          backgroundColor: appTheme.COLORS.white,
          justifyContent: "space-between",
          flexDirection: "row",
          elevation: 50,
          alignItems: "center",
          paddingHorizontal: 10,
          paddingTop: 30,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image source={icons.placedOrders} />

          <View
            style={{
              marginLeft: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "Gilroy-Medium",
                fontSize: 18,
                color: appTheme.COLORS.black,
              }}
            >
              Placed orders
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
                marginTop: 4,
                color: appTheme.COLORS.textGray,
              }}
            >
              Orders placed on your store
            </Text>
          </View>
        </View>

        <Image source={icons.chevRonRight} />
      </TouchableOpacity>
    </View>
  );
};

export default Index;
