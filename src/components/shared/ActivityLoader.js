import { ActivityIndicator, Platform } from "react-native";
import React from "react";

import appTheme from "../../constants/theme";

const ActivityLoader = () => {
  return (
    <ActivityIndicator
      color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
      animating={true}
      size="small"
    />
  );
};

export default ActivityLoader;
