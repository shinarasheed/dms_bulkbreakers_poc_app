import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View, Image, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { logOut } from "../../redux/actions/customerActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import AccountSection from "../../components/account/AccountSection";
import { Routes } from "../../navigation/Routes";

const AccountScreen = () => {
  const dispatch = useDispatch();
  const {
    PRODUCTS_SCREEN,
    PROFILE_SCREEN,
    SUPPORT_SCREEN,
    LEGAL_SCREEN,
    DREAMS_SCREEN,
  } = Routes;

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(logOut());
    await AsyncStorage.removeItem("token");
  };

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <View>
        {/* products */}
        {customer?.CUST_Type.toLowerCase() === "bulkbreaker" && (
          <AccountSection
            title="Products"
            description="Manage the products you sell"
            destination={PRODUCTS_SCREEN}
            icon={require("../../../assets/icons/smallprofile.png")}
          />
        )}

        {customer?.CUST_Type.toLowerCase() === "bulkbreaker" && (
          <AccountSection
            title="I have a dream"
            description="Get rewarded for selling your drinks"
            destination={DREAMS_SCREEN}
            icon={require("../../../assets/icons/dream.png")}
          />
        )}

        {/* Profile */}
        <AccountSection
          icon={require("../../../assets/icons/smallprofile.png")}
          title="Profile"
          destination={PROFILE_SCREEN}
          description="View your account details"
        />

        {/* Support */}
        <AccountSection
          icon={require("../../../assets/icons/Support.png")}
          title="Support"
          destination={SUPPORT_SCREEN}
          description="For help and enquiries"
        />

        {/* Legal */}
        <AccountSection
          icon={require("../../../assets/icons/Legal.png")}
          title="Legal"
          destination={LEGAL_SCREEN}
          description="Terms of use and policies"
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => handleLogout()}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={icons.logoutIcon} />
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.mainRed,
            }}
          >
            Sign Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AccountScreen;
