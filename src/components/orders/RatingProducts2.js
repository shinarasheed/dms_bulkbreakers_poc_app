import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";

import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";
import { icons } from "../../constants";

const Product = ({ item, productDetails }) => {
  const {
    companyCode,
    date,
    id,
    brand,
    country,
    imageUrl,
    price,
    productId,
    productType,
    sku,
    quantity,
    buyingQuantity,
    pocPrice,
  } = item;

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: appTheme.COLORS.borderGRey,
      }}
    >
      <Image
        style={{ width: 30, height: 60 }}
        source={{
          uri: imageUrl ? imageUrl : productDetails(productId)?.imageUrl,
        }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              textTransform: "capitalize",
              marginRight: 5,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {productId !== undefined && productDetails(productId)?.brand}
          </Text>
          <Text
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              marginRight: 5,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {productId !== undefined && productDetails(productId)?.sku}
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: appTheme.COLORS.mainRed,
              fontFamily: "Gilroy-Bold",
              fontSize: 12,
            }}
          >
            {"\u20A6"}
            {pocPrice
              ? formatPrice(pocPrice)
              : formatPrice(price / quantity)} X{" "}
            {buyingQuantity ? buyingQuantity : quantity}
          </Text>

          <Text
            style={{
              color: appTheme.COLORS.mainRed,
              fontFamily: "Gilroy-Bold",
              fontSize: 12,
            }}
          >
            {"\u20A6"}
            {pocPrice
              ? formatPrice(pocPrice * buyingQuantity)
              : formatPrice((price / quantity) * quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Product;
