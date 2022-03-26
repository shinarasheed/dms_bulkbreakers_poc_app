import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";

export const Header = ({ customer }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainRed,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View>
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontFamily: "Gilroy-Medium",
            fontSize: 13,
            marginBottom: 5,
          }}
        >
          Your Location
        </Text>

        <Text
          style={{
            color: appTheme.COLORS.white,
            fontFamily: "Gilroy-Bold",
            fontSize: 13,
          }}
        >
          {customer?.address}
        </Text>
      </View>

      <Pressable onPress={() => navigation.navigate(Routes.LOCATION_SCREEN)}>
        <Image source={icons.chevronIcon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
