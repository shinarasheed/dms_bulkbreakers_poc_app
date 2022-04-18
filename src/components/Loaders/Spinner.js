import React from "react";
import { ActivityIndicator, Platform } from "react-native";
import appTheme from "../../constants/theme";

export const Spinner = ({ animating }) => {
  return (
    <ActivityIndicator
      color={Platform.OS === "android" ? appTheme.COLORS.white : undefined}
      animating={animating}
      size="medium"
    />
  );
};
