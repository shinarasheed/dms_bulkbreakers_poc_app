import { View, Image } from "react-native";
import React from "react";
import { icons } from "../../constants";

export const StarRating = ({ number }) => {
  switch (number) {
    case 1:
      return (
        <View>
          <Image source={icons.starIcon} />
        </View>
      );

    case 2:
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={icons.starIcon} />
          <Image source={icons.starIcon} />
        </View>
      );

    case 3:
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={icons.starIcon} />
          <Image source={icons.starIcon} />
          <Image source={icons.starIcon} />
        </View>
      );

    case 4:
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={icons.starIcon} />
          <Image source={icons.starIcon} />
          <Image source={icons.starIcon} />
          <Image source={icons.starIcon} />
        </View>
      );
    case 5:
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={icons.starIcon} />
          <Image source={icons.starIcon} />
          <Image source={icons.starIcon} />
          <Image source={icons.starIcon} />
          <Image source={icons.starIcon} />
        </View>
      );

    default:
      return (
        <View>
          <Image source={icons.starIcon} />
        </View>
      );
  }
};
