import React from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import appTheme from "../../constants/theme";

const ProductCard = ({ theProduct }) => {
  const { id, brand, imageUrl, price, sku } = theProduct;
  return (
    <View
      key={id}
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: appTheme.COLORS.borderGRey,
        alignItems: "center",
        paddingVertical: 20,
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
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
            paddingRight: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "Gilroy-Medium",
              }}
            >
              {/* Price not set */}
            </Text>

            <TouchableOpacity
              onPress={() => toggle()}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: appTheme.COLORS.mainRed,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 5,
                }}
              >
                <Text
                  style={{
                    color: appTheme.COLORS.white,
                  }}
                >
                  +
                </Text>
              </Pressable>

              <Text
                style={{
                  color: appTheme.COLORS.mainRed,
                  fontFamily: "Gilroy-Bold",
                }}
              >
                ADD
              </Text>
            </TouchableOpacity>
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
