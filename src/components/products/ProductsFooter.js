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
import ProductsBottomSheet from "../../components/products/ProductsBottomSheet";
import PlaceOrderSheet from "./PlaceOrderSheet";

const ProductsFooter = ({ distributor }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const dispatch = useDispatch();

  const productsState = useSelector((state) => state.product);

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  const { products, productsToOder } = productsState;

  const createOrderState = useSelector((state) => state.createOrder);

  const { orderPlaced, placedOrder, loading } = createOrderState;

  const orderItems = productsToOder?.map((item) => ({
    price: item?.price * item?.buyingQuantity,
    quantity: item?.buyingQuantity,
    productId: parseInt(item.productId),
    SFlineID: "shopNow",
  }));

  const payload = {
    buyerCompanyId: customer?.SF_Code,
    sellerCompanyId: distributor?.DIST_Code,
    routeName: "shopNow",
    referenceId: "shopNow",
    emptiesReturned: 0,
    costOfEmptiesReturned: 0,
    datePlaced: new Date(new Date().getTime()),
    shipToCode: customer?.SF_Code,
    billToCode: customer?.SF_Code,
    buyerDetails: {
      buyerName: customer?.CUST_Name,
      buyerPhoneNumber: customer?.phoneNumber,
      buyerAddress: customer?.address,
    },

    orderItems,
  };

  const totalAmount = products?.reduce(
    (accumulator, item) => accumulator + item?.price * item?.buyingQuantity,
    0
  );

  function toggle() {
    setVisible((visible) => !visible);
  }

  function toggleConfirm() {
    setConfirmVisible((confirmVisible) => !confirmVisible);
  }

  return (
    <View style={styles.footerContainer}>
      {productsToOder?.length > 0 && (
        <Pressable onPress={() => toggleConfirm()}>
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
                {productsToOder?.length}
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
              View order summary
            </Text>

            <Image source={icons.chevronIcon} />
          </View>
        </Pressable>
      )}

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
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 16,
            fontFamily: "Gilroy-Bold",
          }}
        >
          {`Confirm \u20A6${formatPrice(totalAmount)}`}
        </Text>
      </TouchableOpacity>

      <PlaceOrderSheet
        toggle={toggle}
        visible={visible}
        orderPlaced={orderPlaced}
        loading={loading}
        payload={payload}
        productsToOder={productsToOder}
        distributor={distributor}
      />
      <ProductsBottomSheet
        confirmVisible={confirmVisible}
        toggleConfirm={toggleConfirm}
        toggle={toggle}
        visible={visible}
        orderPlaced={orderPlaced}
        productsToOder={productsToOder}
        distributor={distributor}
        loading={loading}
      />
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
