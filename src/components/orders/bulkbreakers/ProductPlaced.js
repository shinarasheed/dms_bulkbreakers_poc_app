import React from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";

import appTheme from "../../../constants/theme";
import { formatPrice } from "../../../utils/formatPrice";
import { icons } from "../../../constants";

const Product = ({ item, productDetails, reorder }) => {
  const { brand, imageUrl, price, productId, sku, quantity, buyingQuantity } =
    item;

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
              fontSize: 16,
              textTransform: "capitalize",
              marginRight: 5,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {brand ? brand : productDetails(productId)?.brand}
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
            {sku ? sku : productDetails(productId)?.sku}
          </Text>

          {reorder && (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 5,
                width: 15,
                height: 15,
                top: -10,
              }}
            >
              <Image source={icons.deleteIcon} />
            </TouchableOpacity>
          )}
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
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.black,
            }}
          >
            {"\u20A6"}
            {buyingQuantity
              ? formatPrice(price)
              : formatPrice(price / quantity)}{" "}
            {buyingQuantity ? `x ${buyingQuantity}` : `x ${quantity}`}
          </Text>

          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.black,
            }}
          ></Text>

          <Text
            style={{
              color: appTheme.COLORS.mainRed,
              fontFamily: "Gilroy-Bold",
            }}
          >
            {"\u20A6"}

            {buyingQuantity
              ? formatPrice(buyingQuantity * price)
              : formatPrice((quantity * price) / quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Product;
