import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import axios from "axios";

import appTheme from "../../../constants/theme";
import { ORDER_BASE_URL } from "../../../confg";

const ReceivedOrderFooter = ({ orderId }) => {
  const [theOrder, setTheOrder] = useState();
  const [loading, setLoading] = useState(false);

  const updateOrderStatus = async (status) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        status,
      };
      setLoading(true);

      await axios.patch(
        `${ORDER_BASE_URL}/UpdateOrder/UpdateStatus/${orderId}`,
        body,
        config
      );
      setTheOrder(order?.order[0]);
      setLoading(false);
      // dispatch(fetchOrder());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        paddingVertical: 20,
        flexDirection: "row",
        paddingHorizontal: 20,
        marginTop: 20,
      }}
    >
      <TouchableOpacity
        onPress={() => updateOrderStatus("Rejected")}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          borderRadius: 4,
          flex: 1,
          marginRight: 20,
          borderWidth: 1,
          borderColor: appTheme.COLORS.borderGRey1,
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.black,
            fontFamily: "Gilroy-Medium",
            fontSize: 17,
          }}
        >
          Reject Order
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => updateOrderStatus("Accepted")}
        style={{
          backgroundColor: appTheme.COLORS.mainRed,
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          borderRadius: 4,
          flex: 1,
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontFamily: "Gilroy-Medium",
            fontSize: 17,
          }}
        >
          Accept Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReceivedOrderFooter;

const styles = StyleSheet.create({});
