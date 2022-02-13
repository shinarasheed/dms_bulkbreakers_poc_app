import React from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Image,
  Pressable,
  Text,
  View,
  TextInput,
} from "react-native";

import appTheme from "../../constants/theme";
import {
  decrementQuantity,
  incrementQuantity,
  incrementQuantityByTyping,
} from "../../redux/actions/productActions";
import { formatPrice } from "../../utils/formatPrice";

const ProductCard = ({ theProduct }) => {
  const dispatch = useDispatch();

  const handleTextChange = (text, id) => {
    dispatch(incrementQuantityByTyping(text, id));
  };

  const { id, brand, imageUrl, price, sku, buyingQuantity } = theProduct;
  return (
    <View
      key={id}
      style={{
        flexDirection: "row",
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: appTheme.COLORS.borderGRey,
        alignItems: "center",
        paddingVertical: 10,
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
              flexDirection: "row",
            }}
          >
            <View
              style={[
                styles.productIncreaseDecreaseContainer,
                { marginRight: 5 },
              ]}
            >
              <Pressable onPress={() => dispatch(decrementQuantity(id))}>
                <Text style={styles.IncreaseText}>-</Text>
              </Pressable>
            </View>

            <TextInput
              style={{
                borderWidth: 1,
                width: 70,
                borderColor: appTheme.COLORS.borderGRey,
                marginRight: 5,
                borderRadius: 5,
                textAlign: "center",
                fontWeight: "bold",
                color: appTheme.COLORS.mainTextGray,
                fontFamily: "Gilroy-Medium",
              }}
              value={buyingQuantity?.toString()}
              onChangeText={(text) => handleTextChange(text, id)}
            />

            <View style={styles.productIncreaseDecreaseContainer}>
              <Pressable onPress={() => dispatch(incrementQuantity(id))}>
                <Text style={styles.IncreaseText}>+</Text>
              </Pressable>
            </View>
          </View>

          <Text
            style={{
              color: appTheme.COLORS.mainRed,
              fontSize: 15,
              fontFamily: "Gilroy-Bold",
            }}
          >
            {"\u20A6"}
            {formatPrice(price * buyingQuantity)}
          </Text>
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
