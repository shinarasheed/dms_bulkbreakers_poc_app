import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";

const ProductsFooter = () => {
  return (
    <View style={styles.footerContainer}>
      <Pressable>
        <View style={[styles.orderSummay]}>
          <View
            style={{
              position: "absolute",
              left: 14,
              bottom: 10,
              width: 20,
              height: 20,
              borderRadius: 50,
              backgroundColor: appTheme.COLORS.mainRed,
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.white,
                fontWeight: "bold",
                fontSize: 12,
                marginTop: 1.5,
              }}
            >
              3
            </Text>
          </View>
          <Image
            style={{
              marginRight: 10,
            }}
            source={icons.productIcon}
          />
          <Text
            style={{
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
              fontSize: 15,
              marginLeft: 8,
            }}
          >
            View added products
          </Text>

          <Image source={icons.chevronIcon} />
        </View>
      </Pressable>

      <TouchableOpacity
        style={{
          backgroundColor: appTheme.COLORS.mainRed,
          width: "100%",
          height: 50,
          justifyContent: "center",
          borderRadius: 5,
          marginTop: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 16,
            fontFamily: "Gilroy-Bold",
          }}
        >
          {`Confirm \u20A6${formatPrice(3000)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductsFooter;
const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: appTheme.COLORS.white,
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingBottom: 15,
    paddingTop: 15,
    elevation: 50,
  },

  orderSummay: {
    flexDirection: "row",
    alignItems: "center",
  },

  footerButtonText: {
    color: appTheme.COLORS.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});
