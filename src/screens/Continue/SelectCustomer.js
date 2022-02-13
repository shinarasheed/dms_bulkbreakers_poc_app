import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RadioButton } from "react-native-paper";

import {
  getDistributor,
  getDistributors,
} from "../../redux/actions/customerActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";
import SelectBottomSheet from "./BottomSheet";

const SelectCustomer = () => {
  const navigation = useNavigation();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [checked, setChecked] = React.useState(false);

  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const dispatch = useDispatch();

  const customerState = useSelector((state) => state.customer);

  const { error, isLoading, customer } = customerState;

  const handleGetDistributor = async () => {
    //save customer in asyncstorage
    await AsyncStorage.setItem("customer", JSON.stringify(customer));
    try {
      dispatch(getDistributors(navigation));
    } catch (error) {
      console.log(error);
    }

    // toggle();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: appTheme.COLORS.white,
        paddingBottom: 40,
      }}
    >
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.black,
            fontSize: 20,
            fontFamily: "Gilroy-Medium",
            marginBottom: 10,
            paddingLeft: 20,
          }}
        >
          Continue as...
        </Text>

        {customer && (
          <TouchableOpacity
            onPress={() => setSelectedCustomer(customer)}
            key={customer?.id}
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
                source={icons.shopIcon}
              />
              <Text
                style={{
                  fontFamily: "Gilroy-Bold",
                  fontSize: 15,
                  marginLeft: 18,
                  textTransform: "uppercase",
                }}
              >
                {customer?.CUST_Name}
              </Text>

              <View
                style={{
                  position: "absolute",
                  right: 20,
                }}
              >
                <RadioButton
                  value={customer.CUST_Name}
                  color={appTheme.COLORS.mainRed}
                  status={
                    checked === customer.CUST_Name ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    setSelectedCustomer(customer);
                    setChecked(customer.CUST_Name);
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
                {customer?.SF_Code}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => handleGetDistributor()}
            style={{
              backgroundColor: appTheme.COLORS.mainRed,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.white,
                fontFamily: "Gilroy-Medium",
                fontSize: 18,
              }}
            >
              {isLoading ? (
                <ActivityIndicator
                  color={
                    Platform.OS === "android"
                      ? appTheme.COLORS.white
                      : undefined
                  }
                  animating={isLoading}
                  size="large"
                />
              ) : (
                "Continue"
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <SelectBottomSheet toggle={toggle} visible={visible} />

      <Image
        style={{
          alignSelf: "center",
        }}
        source={icons.smallAbLogo}
      />
    </View>
  );
};

export default SelectCustomer;
