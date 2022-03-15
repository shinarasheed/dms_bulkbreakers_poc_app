import { Text, View } from "react-native";
import React from "react";
import moment from "moment";

import appTheme from "../../../constants/theme";
import OrderStatus from "./OrderStatus";

const OrderDetailsHeader = ({ singleOrder }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.black,
            fontFamily: "Gilroy-Light",
          }}
        >
          {singleOrder !== null &&
            singleOrder[0]?.orderStatus[0]?.datePlaced !== null &&
            moment(singleOrder[0]?.orderStatus[0]?.datePlaced).format(
              "MMM Do, YYYY"
            )}
        </Text>
        <Text
          style={{
            fontFamily: "Gilroy-Light",
            marginLeft: 5,
          }}
        >
          {singleOrder[0]?.orderStatus[0]?.timePlaced !== undefined
            ? `at ${singleOrder[0]?.orderStatus[0]?.timePlaced}`
            : null}
        </Text>
      </View>

      {!singleOrder[0]?.orderStatus[0] ? null : (
        <OrderStatus singleOrder={singleOrder} />
      )}
    </View>
  );
};

export default OrderDetailsHeader;
