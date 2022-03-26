import { Text, View } from "react-native";
import React from "react";

import appTheme from "../../../constants/theme";

const OrderStatus = ({ singleOrder }) => {
  return (
    <View
      style={{
        borderRadius: 20,
        width: 90,
        height: 25,

        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          singleOrder[0]?.orderStatus[0].status === "Placed"
            ? appTheme.COLORS.borderGRey1
            : singleOrder[0]?.orderStatus[0].status === "Assigned"
            ? appTheme.COLORS.mainBlue
            : singleOrder[0]?.orderStatus[0].status === "Accepted"
            ? appTheme.COLORS.mainYellow
            : singleOrder[0]?.orderStatus[0].status === "Rejected"
            ? appTheme.COLORS.mainRed
            : singleOrder[0]?.orderStatus[0].status === "Canceled"
            ? appTheme.COLORS.mainRed
            : singleOrder[0]?.orderStatus[0].status === "Completed"
            ? appTheme.COLORS.lightBlue
            : appTheme.COLORS.mainGreen,
      }}
    >
      <Text
        style={{
          fontFamily: "Gilroy-Medium",
          fontSize: 13,
          color:
            singleOrder[0]?.orderStatus[0].status === "Placed"
              ? appTheme.COLORS.black
              : singleOrder[0]?.orderStatus[0].status === "Accepted"
              ? appTheme.COLORS.white
              : singleOrder[0]?.orderStatus[0].status === "Completed"
              ? appTheme.COLORS.white
              : appTheme.COLORS.white,
        }}
      >
        {singleOrder[0]?.orderStatus[0].status === "Assigned"
          ? "Dispatched"
          : singleOrder[0]?.orderStatus[0].status === "Accepted"
          ? "Confirmed"
          : singleOrder[0]?.orderStatus[0].status === "Completed"
          ? "Delivered"
          : singleOrder[0]?.orderStatus[0].status === "Delivered"
          ? "Completed"
          : singleOrder[0]?.orderStatus[0].status}
      </Text>
    </View>
  );
};

export default OrderStatus;
