import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { BottomSheet } from "react-native-btr";

import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";

import ProductCard2 from "./ProductCard2";
import OrderCompletedSheet from "./PlaceOrderSheet";
import { placeOrder } from "../../redux/actions/orderActions";

const ProductsBottomSheet = ({
  confirmVisible,
  toggleConfirm,
  bulkbreaker,
}) => {
  const [visible, setVisible] = useState(false);

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  const productsState = useSelector((state) => state.product);

  const { productsToOder } = productsState;

  const createOrderState = useSelector((state) => state.createOrder);

  const { orderPlaced, loading } = createOrderState;

  const totalAmount = productsToOder?.reduce(
    (accumulator, item) =>
      accumulator + item?.sellerPrice * item?.buyingQuantity,
    0
  );

  const orderItems = productsToOder?.map((item) => ({
    price: item?.sellerPrice * item?.buyingQuantity,
    quantity: item?.buyingQuantity,
    productId: parseInt(item.productId),
    SFlineID: "shopNow",
  }));

  const payload = {
    buyerCompanyId: customer?.SF_Code,
    sellerCompanyId: bulkbreaker?.salesforceCode,
    routeName: "shopNow",
    referenceId: "shopNow",
    emptiesReturned: 0,
    costOfEmptiesReturned: 0,
    datePlaced: new Date(new Date().getTime()),
    shipToCode: customer?.SF_Code,
    billToCode: customer?.SF_Code,
    country: customer?.country,
    buyerDetails: {
      buyerName: customer?.CUST_Name,
      buyerPhoneNumber: customer?.phoneNumber,
      buyerAddress: customer?.address,
    },

    orderItems,
  };

  function toggle() {
    setVisible((visible) => !visible);
  }

  const dispatch = useDispatch();

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
        {!orderPlaced ? (
          <>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={productsToOder}
              keyExtractor={(distributor) => distributor.id.toString()}
              renderItem={({ item }) => <ProductCard2 theProduct={item} />}
            />

            <View
              style={{
                paddingHorizontal: 20,
                backgroundColor: appTheme.COLORS.white,
                paddingVertical: 20,
                elevation: 50,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  dispatch(placeOrder(payload));
                }}
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
                {loading ? (
                  <ActivityIndicator
                    color={
                      Platform.OS === "android"
                        ? appTheme.COLORS.white
                        : undefined
                    }
                    animating={loading}
                    size="small"
                  />
                ) : (
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
                )}
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <OrderCompletedSheet
            toggle={toggle}
            visible={visible}
            productsToOder={productsToOder}
            bulkbreaker={bulkbreaker}
          />
        )}
      </View>
    </BottomSheet>
  );
};

export default ProductsBottomSheet;
