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

import ProductsSummarySheet from "./ProductSummarySheet";
import ProductsAdded from "./ProductsAdded";
import { saveProductsToSell } from "../../redux/actions/productActions";

const ProductsFooter = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const products_tosell = useSelector((state) => state.product.products_tosell);
  const customerState = useSelector((state) => state.customer);
  const { customer } = customerState;

  function toggle() {
    setVisible((visible) => !visible);
  }

  const toggle2 = () => {
    setVisible2((visible2) => !visible2);
  };

  const saveAction = () => {
    let processedArray = products_tosell.map((item) => ({
      productId: item.productId,
      productSku: item.productSku,
      price: parseInt(item.price),
      instock: true,
    }));
    let toDB = {};
    toDB["bulkBreakerId"] = customer.id.toString();
    toDB["products"] = processedArray;

    // console.log(toDB);

    dispatch(saveProductsToSell(toDB));
    // toggle2();
  };

  return (
    <View style={styles.footerContainer}>
      <Pressable onPress={() => toggle()}>
        <View style={[styles.orderSummay]}>
          <View
            style={{
              position: "absolute",
              left: 14,
              bottom: 10,
              width: 22,
              height: 22,
              borderRadius: 50,
              backgroundColor: appTheme.COLORS.mainRed,
              borderWidth: 1.5,
              borderColor: "#FFFFFF",
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.white,
                fontWeight: "bold",
                fontSize: 12,
                marginTop: 1.5,
                alignSelf: "center",
              }}
            >
              {products_tosell?.length ? products_tosell.length : 0}
            </Text>
          </View>
          <Image
            style={{
              marginRight: 10,
            }}
            source={icons.ProductsCart}
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
          <Image
            source={icons.ArrowDown}
            style={{ height: 20, width: 20, marginLeft: 15 }}
          />
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
        onPress={() => saveAction()}
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

      <ProductsSummarySheet visible={visible} toggle={toggle} />
      <ProductsAdded visible2={visible2} toggle2={toggle2} />
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
