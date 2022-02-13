import React from "react";
import { Text, View, Image } from "react-native";
import { icons, images } from "../constants";
import appTheme from "../constants/theme";

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appTheme.COLORS.white,
      }}
    >
      <Image
        source={icons.AbLogo}
        style={{
          width: 300,
          height: 80,
          resizeMode: "center",
        }}
      />

      <Text
        style={{
          fontSize: 20,
          color: appTheme.COLORS.mainRed,
          fontFamily: "Gilroy-Medium",
        }}
      >
        Please wait...
      </Text>
    </View>
  );
};

export default Loading;
