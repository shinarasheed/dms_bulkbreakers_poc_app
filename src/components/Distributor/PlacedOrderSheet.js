import React, { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { RadioButton } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  placeOrder,
  toggleOrderPlaced,
} from "../../redux/actions/orderActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";
import { updateInventory } from "../../redux/actions/productActions";

const BottomFilter = ({
  visible,
  toggle,
  payload,
  productsToOder,
  distributor,
}) => {
  const createOrderState = useSelector((state) => state.createOrder);
  const navigation = useNavigation();

  const { orderPlaced, placedOrder, loading } = createOrderState;
  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;
  const filters = [
    {
      key: "Van-Delivery",
      value: "Van Delivery",
    },
    {
      key: "Pick-Up",
      value: "Pickup",
    },
  ];
  const [deliveryType, setDeliveryType] = useState(null);
  const [checked, setChecked] = React.useState(false);

  const dispatch = useDispatch();

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 20,
        }}
      >
        {!orderPlaced ? (
          <>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "Gilroy-Medium",
                    marginBottom: 15,
                  }}
                >
                  How will you like to recieve your order?
                </Text>
                <Pressable onPress={() => toggle()}>
                  <Image source={icons.cancelIcon} />
                </Pressable>
              </View>

              {filters.map((filter, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <RadioButton
                    value={filter.value}
                    color={appTheme.COLORS.mainRed}
                    status={checked === filter.key ? "checked" : "unchecked"}
                    onPress={() => {
                      setDeliveryType(filter.key);
                      setChecked(filter.key);
                    }}
                  />

                  <Text
                    style={{
                      fontFamily: "Gilroy-Light",
                      fontSize: 18,
                    }}
                  >
                    {filter.value}
                  </Text>
                </View>
              ))}
            </View>

            <View
              style={{
                paddingHorizontal: 30,
                paddingTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  dispatch(placeOrder({ ...payload, deliveryType }))
                }
                style={{
                  backgroundColor: appTheme.COLORS.mainRed,
                  justifyContent: "center",
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 14,
                  paddingHorizontal: 15,
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
                      fontSize: 17,
                      fontFamily: "Gilroy-Medium",
                    }}
                  >
                    Yes, Place Order
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View
            style={{
              alignItems: "center",
              paddingTop: 30,
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
                navigation.navigate(Routes.PLACED_ORDER_DETAILS, {
                  productsToOder,
                  theDistributor: distributor,
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
    </BottomSheet>
  );
};

export default BottomFilter;
