import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { BottomSheet } from "react-native-btr";
import { RadioButton } from "react-native-paper";

import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { placeOrder } from "../../redux/actions/orderActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";

const SelectBottomSheet = ({ visible, toggle }) => {
  const navigation = useNavigation();

  const filters = [
    {
      icon: require("../../../assets/icons/shop.png"),
      key: "setupstore",
      title: "Set up my store",
      value: "Set up your store to start selling",
    },
    {
      icon: require("../../../assets/icons/Buy.png"),
      key: "buy",
      title: "Buy from Distributors",
      value: "Start buying from distributors around you",
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
          height: "64%",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source={icons.checkBig}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Medium",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              You have successfully signed up.
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Medium",
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              What would you like to do next?
            </Text>
          </View>

          {filters.map((filter, index) => (
            <TouchableOpacity
              // onPress={() => setSelectedCustomer(customer)}
              key={index}
              style={{
                marginTop: 30,
                marginBottom: 40,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 20,
                }}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  source={filter.icon}
                />
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    fontSize: 15,
                    marginLeft: 18,
                  }}
                >
                  {filter?.title}
                </Text>

                <View
                  style={{
                    position: "absolute",
                    right: 20,
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
                </View>
              </View>

              <View
                style={{
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: appTheme.COLORS.borderGRey1,
                  paddingLeft: 60,
                  marginTop: 10,
                  paddingBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    color: appTheme.COLORS.mainTextGray,
                  }}
                >
                  {filter?.value}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            paddingHorizontal: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(placeOrder({ ...payload, deliveryType }));
            }}
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
            <Text
              style={{
                color: appTheme.COLORS.white,
                fontSize: 17,
                fontFamily: "Gilroy-Medium",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default SelectBottomSheet;
