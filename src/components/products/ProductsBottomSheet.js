import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";

import { BottomSheet } from "react-native-btr";

import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";

import ProductCard2 from "./ProductCard2";

const ProductsBottomSheet = ({ confirmVisible, toggleConfirm }) => {
  const productsState = useSelector((state) => state.product);

  const { productsToOder } = productsState;

  const totalAmount = productsToOder?.reduce(
    (accumulator, item) => accumulator + item?.price * item?.buyingQuantity,
    0
  );

  return (
    <BottomSheet
      visible={confirmVisible}
      onBackButtonPress={toggleConfirm}
      onBackdropPress={toggleConfirm}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingTop: 20,
          borderTopEndRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={productsToOder}
          keyExtractor={(distributor) => distributor.id.toString()}
          renderItem={({ item }) => <ProductCard2 theProduct={item} />}
        />
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
            width: "100%",
            height: 50,
            justifyContent: "center",
            borderRadius: 5,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            elevation: 50,
          }}
        >
          <Text
            style={{
              color: appTheme.COLORS.white,
              fontSize: 16,
              fontFamily: "Gilroy-Bold",
            }}
          >
            {totalAmount !== undefined &&
              `Confirm \u20A6${formatPrice(totalAmount)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default ProductsBottomSheet;
