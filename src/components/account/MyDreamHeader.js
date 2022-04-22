import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar, Image, Text, View, Pressable } from "react-native";
import moment from "moment";

import appTheme from "../../constants/theme";
import { icons, images } from "../../constants";
import { formatPrice } from "../../utils/formatPrice";

export const Header = ({ title, uppercase, myDream }) => {
  const navigation = useNavigation();

  const {
    BB_Code,
    accumulated_points,
    country,
    dream_duration,
    dream_name,
    dream_point,
    dream_status,
    id,
    start_date,
  } = myDream;
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
          {`My ${dream_name} Dream`}
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
          {accumulated_points}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: appTheme.COLORS.white,
              fontSize: 13,
              fontFamily: "Gilroy-Medium",
              marginRight: 5,
            }}
          >
            From
          </Text>
          <Text
            style={{
              color: appTheme.COLORS.white,
              fontSize: 13,
              fontFamily: "Gilroy-Medium",
              // marginRight: 10,
            }}
          >
            {moment(start_date).format("DD/MM/YYYY")} -
          </Text>
          <Text
            style={{
              color: appTheme.COLORS.white,
              fontSize: 13,
              fontFamily: "Gilroy-Medium",
              marginLeft: 5,
            }}
          >
            {moment(start_date).add(60, "days").format("DD/MM/YYYY")}
          </Text>
        </View>

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
            fontSize: 17,
            fontFamily: "Gilroy-Medium",
            marginTop: 50,
          }}
        >
          {`${formatPrice(
            dream_point - accumulated_points
          )} points left to reach your dream`}
        </Text>
      </View>
    </View>
  );
};
