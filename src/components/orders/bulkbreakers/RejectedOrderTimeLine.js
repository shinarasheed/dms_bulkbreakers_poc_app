import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Placeholder, PlaceholderMedia, Fade } from "rn-placeholder";

import { icons } from "../../../constants";
import appTheme from "../../../constants/theme";
import moment from "moment";

const OrderTimeLine = ({ singleOrder }) => {
  if (singleOrder[0]?.orderStatus[0] === null)
    return (
      <Placeholder
        Animation={Fade}
        style={{
          marginVertical: 2,
        }}
      >
        <PlaceholderMedia
          style={{
            width: "100%",
            height: 80,
          }}
        />
      </Placeholder>
    );
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        paddingVertical: 20,
        paddingLeft: 20,
        elevation: appTheme.STYLES.elevation,
      }}
    >
      <Text
        style={{
          fontFamily: "Gilroy-Bold",
          fontSize: 17,
          color: appTheme.COLORS.mainTextGray,
          marginBottom: 25,
        }}
      >
        Order Status
      </Text>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <Image
          style={{
            width: 20,
            height: 20,
          }}
          source={icons.statusIcon}
        />

        <Text
          style={{
            marginLeft: 10,
            color: appTheme.COLORS.black,
            fontFamily: "Gilroy-Medium",
            fontSize: 15,
          }}
        >
          Received
        </Text>
        <Text
          style={{
            marginLeft: 5,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {singleOrder?.orderStatus[0]?.datePlaced !== null &&
            moment(singleOrder?.orderStatus[0]?.datePlaced).format(
              "MMM Do, YYYY"
            )}
        </Text>
        <Text
          style={{
            marginLeft: 5,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {singleOrder?.orderStatus[0]?.timePlaced
            ? `at ${singleOrder?.orderStatus[0]?.timePlaced}`
            : null}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <Image
          style={{
            width: 20,
            height: 20,
          }}
          source={icons.rejectedIcon}
        />

        <Text
          style={{
            marginLeft: 10,
            color: appTheme.COLORS.black,
            fontFamily: "Gilroy-Medium",
            fontSize: 15,
          }}
        >
          Rejected
        </Text>
        <Text
          style={{
            marginLeft: 5,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {singleOrder?.orderStatus[0]?.dateRejected !== null &&
            moment(singleOrder?.orderStatus[0]?.dateRejected).format(
              "MMM Do, YYYY"
            )}
        </Text>
        <Text
          style={{
            marginLeft: 5,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {singleOrder?.orderStatus[0]?.timeRejected
            ? `at ${singleOrder?.orderStatus[0]?.timeRejected}`
            : null}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderTimeLine;

const styles = StyleSheet.create({});
