import React, { useState, useEffect } from "react";
import { StatusBar, Text, TouchableOpacity, View, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import SelectBottomSheet from "./BottomSheet";

const SelectCustomer = () => {
  const [savedCustomer, setSavedCustomer] = useState(null);
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const customerState = useSelector((state) => state.customer);

  const { isLoading, customer } = customerState;

  const getSavedCustomer = async () => {
    let theCustomer = await AsyncStorage.getItem("customer");
    theCustomer = JSON.parse(theCustomer);
    setSavedCustomer(theCustomer);
  };

  useEffect(() => {
    getSavedCustomer();
  }, []);

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
                  fontFamily: "Gilroy-Medium",
                  fontSize: 18,
                  marginLeft: 18,
                  textTransform: "capitalize",
                }}
              >
                {customer?.CUST_Name}
              </Text>
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
            paddingHorizontal: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => toggle()}
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
