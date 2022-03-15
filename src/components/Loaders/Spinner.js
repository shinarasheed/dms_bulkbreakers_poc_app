import React from "react";
import { ActivityIndicator } from "react-native";
import appTheme from "../../constants/theme";

export const Spinner = ({ animating, style }) => {
  return (
    <ActivityIndicator
      style={style}
      color={Platform.OS === "android" ? appTheme.COLORS.white : undefined}
      animating={animating || true}
      size="medium"
    />
  );
};
