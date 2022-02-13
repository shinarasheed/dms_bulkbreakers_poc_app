import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import axios from "axios";

import appTheme from "../../../constants/theme";
import { Routes } from "../../../navigation/Routes";
import { formatPrice } from "../../../utils/formatPrice";
import { COMPANY_BASE_URL } from "../../../confg";

export const Order = ({ item }) => {
  const [theDistributor, setTheDistributor] = useState(null);
  const [loadingDistributor, setLoadingDistributor] = useState(false);
  const navigation = useNavigation();

  const totalAmount = item?.orderItems.reduce(
    (accumulator, item) => accumulator + parseInt(item?.price),
    0
  );

  const productsToOder = item.orderItems;

  const getTheDistributor = async () => {
    try {
      setLoadingDistributor(true);
      const {
        data: { result },
      } = await axios.get(
        `${COMPANY_BASE_URL}/company/code/${item?.sellerCompanyId}`
      );
      setTheDistributor(result);
      setLoadingDistributor(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheDistributor();
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.RECEIVED_ORDER_DETAILS, {
          theDistributor,
          productsToOder,
          item,
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
            }}
          >
            {theDistributor?.company_name}
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
                  : item.orderStatus[0].status === "Assigned"
                  ? appTheme.COLORS.mainYellow
                  : item.orderStatus[0].status === "Accepted"
                  ? appTheme.COLORS.mainBlue
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
                ? "Confirmed"
                : item.orderStatus[0].status === "Accepted"
                ? "Dispatched"
                : item.orderStatus[0].status === "Completed"
                ? "Delivered"
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
