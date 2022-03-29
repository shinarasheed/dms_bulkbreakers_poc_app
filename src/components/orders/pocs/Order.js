import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import axios from "axios";

import appTheme from "../../../constants/theme";
import { Routes } from "../../../navigation/Routes";
import { formatPrice } from "../../../utils/formatPrice";
import { COMPANY_BASE_URL } from "../../../confg";

export const Order = ({ item }) => {
  const navigation = useNavigation();

  const customerState = useSelector((state) => state.customer);
  const { customer, distributors } = customerState;

  const totalAmount = item?.orderItems.reduce(
    (accumulator, item) => accumulator + parseInt(item?.price),
    0
  );

  const productsToOder = item.orderItems;

  const bulkbreaker = distributors.find(
    (distributor) => distributor?.sellerCompanyId === item?.sellerCompanyId
  );

  return (
    <TouchableOpacity
      onPress={() =>
        bulkbreaker?.customerType === "Distributor"
          ? navigation.navigate(Routes.PLACED_ORDER_DETAILS, {
              productsToOder,
              theDistributor: bulkbreaker,
              item,
            })
          : navigation.navigate(Routes.ORDER_DETAILS_SCREEN, {
              productsToOder,
              item,
              bulkbreaker,
            })
      }
      style={{
        marginBottom: 10,
        backgroundColor: appTheme.COLORS.white,
      }}
    >
      <View
        style={{
          padding: 20,
          paddingBottom: 10,
          borderBottomWidth: 1,
          borderBottomColor: appTheme.COLORS.borderGRey,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 7 }}>
          <Text
            style={{
              color: appTheme.COLORS.mainTextGray,
              fontSize: 13,
              fontFamily: "Gilroy-Medium",
            }}
          >
            Order {item.orderId}
          </Text>
          <Text
            style={{
              color: appTheme.COLORS.mainTextGray,
              fontSize: 13,
              marginRight: 5,
              marginLeft: 8,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {item.orderStatus[0] !== undefined &&
              moment(item.orderStatus[0].datePlaced).format("MMM Do, YYYY")}
          </Text>
          <Text
            style={{
              textTransform: "lowercase",
              color: appTheme.COLORS.mainTextGray,
              fontSize: 13,
              fontFamily: "Gilroy-Medium",
            }}
          >
            at{" "}
            {item.orderStatus[0] !== undefined &&
              item.orderStatus[0].timePlaced}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              marginBottom: 5,
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.black,
            }}
          >
            {bulkbreaker?.companyName}
          </Text>

          <View
            style={{
              borderRadius: 20,
              width: 90,
              height: 25,

              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor:
                item.orderStatus[0].status === "Placed"
                  ? appTheme.COLORS.borderGRey1
                  : item.orderStatus[0].status === "Accepted"
                  ? appTheme.COLORS.mainYellow
                  : item.orderStatus[0].status === "Assigned"
                  ? appTheme.COLORS.mainBlue
                  : item.orderStatus[0].status === "Canceled"
                  ? appTheme.COLORS.mainRed
                  : item.orderStatus[0].status === "Rejected"
                  ? appTheme.COLORS.mainRed
                  : item.orderStatus[0].status === "Completed"
                  ? appTheme.COLORS.lightBlue
                  : appTheme.COLORS.mainGreen,
            }}
          >
            <Text
              style={{
                fontFamily: "Gilroy-Medium",
                fontSize: 13,
                color:
                  item.orderStatus[0].status === "Placed"
                    ? appTheme.COLORS.black
                    : item.orderStatus[0].status === "Accepted"
                    ? appTheme.COLORS.white
                    : item.orderStatus[0].status === "Completed"
                    ? appTheme.COLORS.white
                    : appTheme.COLORS.white,
              }}
            >
              {item.orderStatus[0].status === "Assigned"
                ? "Dispatched"
                : item.orderStatus[0].status === "Accepted"
                ? "Confirmed"
                : item.orderStatus[0].status === "Completed"
                ? "Delivered"
                : item.orderStatus[0].status === "Delivered"
                ? "Completed"
                : item.orderStatus[0].status}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 14,
              marginRight: 10,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Bold",
            }}
          >
            {item.orderItems.length} Products
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: appTheme.COLORS.mainTextGray,
              fontFamily: "Gilroy-Bold",
            }}
          >
            {"\u20A6"}
            {formatPrice(totalAmount)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
