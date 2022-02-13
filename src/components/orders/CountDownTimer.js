import React from "react";
import { View, Text, Image } from "react-native";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";

const CountDownTimer = ({ hoursMinSecs }) => {
  const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = React.useState([
    hours,
    minutes,
    seconds,
  ]);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) reset();
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const reset = () =>
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: appTheme.COLORS.countDownYellow,
        paddingVertical: 10,
        paddingLeft: 10,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: appTheme.COLORS.countDownBorderYellow,
        marginBottom: 10,
      }}
    >
      <Image source={icons.clockIcon} />

      <Text
        style={{
          color: appTheme.COLORS.black,
          marginLeft: 10,
          fontFamily: "Gilroy-Medium",
          fontSize: 17,
        }}
      >{`${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</Text>

      <Text
        style={{
          fontFamily: "Gilroy-Light",
          fontSize: 17,
          marginLeft: 5,
        }}
      >
        left for Delivery
      </Text>
    </View>
  );
};

export default CountDownTimer;
