import React from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Image,
  Pressable,
  Text,
  View,
  TextInput,
  Switch,
} from "react-native";

import appTheme from "../../constants/theme";
import {
  decrementQuantity,
  incrementQuantity,
  incrementQuantityByTyping,
} from "../../redux/actions/productActions";
import { formatPrice } from "../../utils/formatPrice";
import { icons } from "../../constants";

const ProductCard = ({ theProduct }) => {
  const dispatch = useDispatch();

  const {
    instock,
    product: {
      id,
      brand,
      sku,
      imageUrl,
      productId,
      price,
      productType,
      country,
    },
  } = theProduct;

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: appTheme.COLORS.borderGRey,
        paddingVertical: 10,
        alignItems: "flex-start",
      }}
    >
      <Image style={{ width: 30, height: 60 }} source={{ uri: imageUrl }} />
      <View style={{ marginLeft: 20, flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 15,
              textTransform: "capitalize",
              marginBottom: 5,
              marginRight: 5,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {brand}
          </Text>
          <Text
            style={{
              fontSize: 15,
              textTransform: "capitalize",
              marginBottom: 5,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {sku}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: appTheme.COLORS.black,
                  fontFamily: "Gilroy-Medium",
                }}
              >
                {"\u20A6"}
                {price}/case
              </Text>

              <Image source={icons.deleteIcon} />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  color: instock
                    ? appTheme.COLORS.black
                    : appTheme.COLORS.MainGray,
                  fontFamily: "Gilroy-Medium",
                }}
              >
                {instock ? "In stock" : "Out of stock"}
              </Text>
            </View>

            <Switch />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productIncreaseDecreaseContainer: {
    backgroundColor: appTheme.COLORS.boxGray,
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 28,
    borderRadius: 5,
  },
  IncreaseText: {
    color: appTheme.COLORS.mainRed,
    fontWeight: "bold",
    fontSize: 20,
  },
});