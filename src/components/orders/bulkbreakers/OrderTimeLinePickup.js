import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, ActivityIndicator, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Timeline from "react-native-timeline-flatlist";
import StepIndicator from "react-native-step-indicator";

import { icons } from "../../../constants";
import appTheme from "../../../constants/theme";
import { Routes } from "../../../navigation/Routes";
import moment from "moment";

const OrderTimeLine = ({
  item,
  singleOrder,
  theDistributor,
  productsToOder,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (
      singleOrder[0]?.orderStatus[0]?.dateCompleted !== null &&
      singleOrder[0]?.orderStatus[0]?.dateDelivered === null
    ) {
      navigation.navigate(Routes.RATING_SCREEN_BULKBREAKER, {
        productsToOder,
        theDistributor,
        item,
      });
    }
  }, []);

  if (!singleOrder[0]?.orderStatus[0])
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <ActivityIndicator
          color={
            Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
          }
          animating={true}
          size="small"
        />
      </View>
    );
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        paddingVertical: 20,
        paddingLeft: 20,
        elevation: appTheme.STYLES.elevation,
        marginTop: 15,
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
          Placed
        </Text>
        <Text
          style={{
            marginLeft: 5,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {singleOrder[0]?.orderStatus[0]?.datePlaced !== null &&
            moment(singleOrder[0]?.orderStatus[0]?.datePlaced).format(
              "MMM Do, YYYY"
            )}
        </Text>
        <Text
          style={{
            marginLeft: 5,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {singleOrder[0]?.orderStatus[0]?.timePlaced
            ? `at ${singleOrder[0]?.orderStatus[0]?.timePlaced}`
            : null}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        {singleOrder !== null &&
        singleOrder[0]?.orderStatus[0].dateCompleted !== null ? (
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={icons.statusIcon}
          />
        ) : (
          <View
            style={{
              height: 20,
              width: 20,
              borderWidth: 0,
              borderRadius: 50,
              backgroundColor: appTheme.COLORS.borderGRey1,
            }}
          ></View>
        )}

        <Text
          style={{
            marginLeft: 10,
            color: appTheme.COLORS.black,
            fontFamily: "Gilroy-Medium",
            fontSize: 15,
          }}
        >
          Delivered
        </Text>
        <Text
          style={{
            marginLeft: 5,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {singleOrder[0]?.orderStatus[0]?.dateCompleted !== null &&
            moment(singleOrder[0]?.orderStatus[0]?.dateCompleted).format(
              "MMM Do, YYYY"
            )}
        </Text>
        <Text
          style={{
            marginLeft: 5,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {singleOrder[0]?.orderStatus[0]?.timeCompleted !== null &&
            `at ${singleOrder[0]?.orderStatus[0]?.timeCompleted.replace(
              " ",
              ""
            )}`}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        {singleOrder !== null &&
        singleOrder[0]?.orderStatus[0].dateDelivered !== null ? (
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={icons.statusIcon}
          />
        ) : (
          <View
            style={{
              height: 20,
              width: 20,
              borderWidth: 0,
              borderRadius: 50,
              backgroundColor: appTheme.COLORS.borderGRey1,
            }}
          ></View>
        )}

        <Text
          style={{
            marginLeft: 10,
            color: appTheme.COLORS.black,
            fontFamily: "Gilroy-Medium",
            fontSize: 15,
          }}
        >
          Completed
        </Text>
        <Text
          style={{
            marginLeft: 5,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {singleOrder[0]?.orderStatus[0]?.dateDelivered !== null &&
            moment(singleOrder[0]?.orderStatus[0]?.dateDelivered).format(
              "MMM Do, YYYY"
            )}
        </Text>
        <Text
          style={{
            marginLeft: 5,
            color: appTheme.COLORS.MainGray,
          }}
        >
          {/* {singleOrder[0]?.orderStatus[0]?.timeDelivered !== null &&
            `at ${singleOrder[0]?.orderStatus[0]?.timeDelivered.replace(
              " ",
              ""
            )}`} */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderTimeLine;
