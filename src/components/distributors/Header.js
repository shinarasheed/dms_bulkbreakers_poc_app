import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";

export const Header = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainRed,
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 20,
        height: StatusBar.currentHeight * 3.2,
        paddingBottom: 10,
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={icons.backIcon} style={{ marginRight: 18 }} />
      </Pressable>

      <Text
        style={{
          fontSize: 14,
          color: appTheme.COLORS.white,
          fontFamily: "Gilroy-Bold",
        }}
      >
        Top Sellers in your area
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
