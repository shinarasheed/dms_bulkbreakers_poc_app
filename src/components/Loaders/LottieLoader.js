import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import appTheme from "../../constants/theme";

export const LottieLoader = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        style={{
          width: 150,
          height: 150,
        }}
        source={require("../../assets/loader-animation.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: appTheme.COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
