import React, { useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { BottomSheet } from "react-native-btr";

import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";

import ProductCard2 from "../Distributor/ProductCard2";
import PlaceOrderSheet from "../Distributor/PlacedOrderSheet";

const ProductsBottomSheet = ({
  confirmVisible,
  toggleConfirm,
  orderPlaced,
  distributor,
  loading,
  // inventoryPayload,
  payload,
}) => {
  const [visible, setVisible] = useState(false);

  const productsState = useSelector((state) => state.product);

  const { productsToOder } = productsState;

  const totalAmount = productsToOder?.reduce(
    (accumulator, item) => accumulator + item?.price * item?.buyingQuantity,
    0
  );

  function toggle() {
    setVisible((visible) => !visible);
  }

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
          onPress={() => toggle()}
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

        <PlaceOrderSheet
          toggle={toggle}
          visible={visible}
          orderPlaced={orderPlaced}
          loading={loading}
          payload={payload}
          // inventoryPayload={inventoryPayload}
          productsToOder={productsToOder}
          distributor={distributor}
        />
      </View>
    </BottomSheet>
  );
};

export default ProductsBottomSheet;
