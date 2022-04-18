import React from "react";
import { Image } from "react-native";
import { icons } from "../constants";

export const showRating = (rating) => {
  switch (rating) {
    case 5:
      return <Image source={icons.excellentRating} />;

    case 4:
      return <Image source={icons.goodRating} />;

    case 3:
      return <Image source={icons.averageRating} />;
    case 2:
      return <Image source={icons.poorRating} />;

    case 1:
      return <Image source={icons.veryPoorRating} />;
    default:
      return <Image source={icons.excellentRating} />;
  }
};
