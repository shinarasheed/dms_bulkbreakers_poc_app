import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import { findIndex } from "lodash";

import { BottomSheet } from "react-native-btr";
import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";
import { productToSell } from "../../redux/actions/productActions";

import ProductCard2 from "../products/ProductCard2";

const AddProductBottomSheet = ({ visible, toggle, product, setThePrice }) => {
  const [isVisible, SetIsVisible] = useState(visible);
  const dispatch = useDispatch();
  const [price, SetPrice] = useState(0);
  const [error, SetError] = useState(null);
  const [disabled, SetDisabled] = useState(null);
  const [productsToSellArray, setProductsToSellArray] = useState([]);
  const products_tosell = useSelector((state) => state.product.products_tosell);

  const save = (productID, productSku, productPrice, imageUrl) => {
    // const index = findIndex(productsToSellArray, { productId: productID });
    const item = {
      productId: productID,
      productSku: productSku,
      price: productPrice,
      imageUrl,
    };

    dispatch(productToSell(item));
  };

  function between(x, min, max) {
    if (x < min && x > 0) {
      SetError("You have entered an amount with no profit margin");
      SetDisabled(true);
    } else if (x > max) {
      SetError(
        "You have entered an amount that would not be competitive in the market"
      );
      SetDisabled(true);
    } else {
      SetError(null);
      SetDisabled(false);
    }
  }

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingTop: 20,
          borderTopEndRadius: 10,
          borderTopLeftRadius: 10,
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={{ uri: product.imageUrl }}
          style={{ width: 30, height: 60, alignSelf: "center" }}
        />
        <Pressable
          onPress={() => toggle()}
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            paddingRight: 20,
            paddingTop: 20,
            marginBottom: 9,
          }}
        >
          <Image source={icons.cancelIcon} />
        </Pressable>
        <Text
          style={{
            color: appTheme.COLORS.Grey84,
            fontSize: 15,
            alignSelf: "center",
            marginBottom: 32,
            fontFamily: "Gilroy-Medium",
          }}
        >
          {product.brand + " " + product.sku}
        </Text>
        <Text style={{ color: appTheme.COLORS.unFocusColor }}>
          Price per case (₦)
        </Text>
        <TextInput
          style={{
            paddingVertical: 8,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#F49C00",
            fontFamily: "Gilroy-Medium",
            marginBottom: 16,
          }}
          onChangeText={(textValue) => {
            between(textValue, product.price - 100, product.price + 100);
            setThePrice(textValue);
          }}
          keyboardType="numeric"
        />

        {error && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image source={icons.ErrorIcon} />
            <Text style={{ color: "#D82C0D", marginLeft: 5 }}>{error}</Text>
          </View>
        )}

        <Text
          style={{
            marginBottom: 8,
            color: "#2D2F39",
          }}
        >
          Recommended price:{" "}
          <Text style={{ fontWeight: "600" }}>
            ₦{formatPrice(product.price)}
          </Text>
        </Text>
        <Text style={{ marginBottom: 8, color: "#2D2F39" }}>
          Suggested price range:{" "}
          <Text style={{ fontWeight: "600" }}>
            ₦{formatPrice(product.price - 100)} - ₦
            {formatPrice(product.price + 100)}
          </Text>
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: appTheme.COLORS.white,
          paddingVertical: 20,
          elevation: 50,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: appTheme.COLORS.mainRed,
            opacity: disabled ? 0.3 : 1,
            width: "100%",
            height: 50,
            justifyContent: "center",
            borderRadius: 5,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            elevation: 50,
          }}
          disabled={disabled}
          onPress={() => {
            save(
              product.id,
              product.brand + " " + product.sku,
              price,
              product.imageUrl
            );
            toggle();
          }}
        >
          <Text
            style={{
              color: appTheme.COLORS.white,
              fontSize: 16,
              fontFamily: "Gilroy-Bold",
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default AddProductBottomSheet;
