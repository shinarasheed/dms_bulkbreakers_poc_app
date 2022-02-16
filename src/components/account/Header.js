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

export const Header = ({ single, orderId, title }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainRed,
        paddingTop: StatusBar.currentHeight * 1.8,
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 15,
        paddingHorizontal: 20,
      }}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={icons.backIcon} style={{ marginRight: 18 }} />
      </Pressable>

      <Text
        style={{
          fontSize: 16,
          color: appTheme.COLORS.white,
          fontFamily: "Gilroy-Bold",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
