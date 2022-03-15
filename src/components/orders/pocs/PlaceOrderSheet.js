import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { Routes } from "../../../navigation/Routes";

import { useDispatch, useSelector } from "react-redux";

import {
  placeOrder,
  toggleOrderPlaced,
} from "../../../redux/actions/orderActions";
import appTheme from "../../../constants/theme";
import { icons } from "../../../constants";

const PlaceOrderSheet = ({
  toggle,
  visible,
  productsToOder,
  bulkbreaker,
  payload,
}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const createOrderState = useSelector((state) => state.createOrder);

  const { orderPlaced, placedOrder, loading } = createOrderState;
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          height: "30%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => toggle()}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
            }}
          >
            <Image source={icons.cancelIcon} />
          </Pressable>

          {!orderPlaced ? (
            <View>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 16,
                  fontFamily: "Gilroy-Light",
                }}
              >
                Buy {productsToOder?.length}{" "}
                {productsToOder?.length === 1 ? `Product` : `Products`} from:
              </Text>
              <Text
                style={{
                  color: appTheme.COLORS.mainRed,
                  fontSize: 17,
                  fontFamily: "Gilroy-Medium",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                {bulkbreaker?.CUST_Name}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  dispatch(placeOrder(payload));
                }}
                style={{
                  backgroundColor: appTheme.COLORS.mainRed,
                  justifyContent: "center",
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}
              >
                <Text
                  style={{
                    color: appTheme.COLORS.white,
                    fontSize: 17,
                    fontFamily: "Gilroy-Medium",
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
                    `Yes, Place Order`
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 35,
                  height: 35,
                  marginBottom: 10,
                }}
                source={icons.statusIcon}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Gilroy-Medium",
                  marginBottom: 20,
                  color: appTheme.COLORS.black,
                  textAlign: "center",
                }}
              >
                Your Order has been placed successfully
              </Text>

              <TouchableOpacity
                onPress={() => {
                  dispatch(toggleOrderPlaced());
                  navigation.navigate(Routes.ORDER_DETAILS_SCREEN, {
                    productsToOder,
                    bulkbreaker: bulkbreaker,
                    item: placedOrder,
                  });
                }}
                style={{
                  backgroundColor: appTheme.COLORS.mainRed,
                  justifyContent: "center",
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  width: 120,
                }}
              >
                <Text
                  style={{
                    color: appTheme.COLORS.white,
                    fontSize: 18,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  ok
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default PlaceOrderSheet;
