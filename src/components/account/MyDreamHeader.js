import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, Image, Text, View, Pressable } from "react-native";

import appTheme from "../../constants/theme";
import { icons, images } from "../../constants";
import { Routes } from "../../navigation/Routes";
import { formatPrice } from "../../utils/formatPrice";

export const Header = ({ title, uppercase, points }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainRed,
        paddingBottom: 15,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        flexDirection: "column",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
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
            textTransform: uppercase ? "uppercase" : "capitalize",
          }}
        >
          {`My ${title} Dream`}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 20,
            fontFamily: "Gilroy-Medium",
          }}
        >
          My Points
        </Text>
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 25,
            fontFamily: "Gilroy-Medium",
            marginTop: 20,
          }}
        >
          0
        </Text>

        <Image
          style={{
            position: "absolute",
            left: 0,
          }}
          source={images.dream}
        />

        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 15,
            fontFamily: "Gilroy-Medium",
            marginTop: 50,
          }}
        >
          {`${formatPrice(points)} left to reach your dream`}
        </Text>
      </View>
    </View>
  );
};
