import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Pressable, Image } from "react-native";

import appTheme from "../../../constants/theme";
import { icons } from "../../../constants";
import { Routes } from "../../../navigation/Routes";

export const Header = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainRed,
        paddingBottom: 15,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: appTheme.COLORS.white,
            fontFamily: "Gilroy-Bold",
          }}
        >
          MY OUTLETS
        </Text>
      </View>
    </View>
  );
};
