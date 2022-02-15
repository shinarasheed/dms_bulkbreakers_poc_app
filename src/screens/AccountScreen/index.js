import React from "react";
import { useDispatch } from "react-redux";
import { Text, View, Image, Pressable } from "react-native";
import { adService } from "ad-b2c-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { logOut } from "../../redux/actions/customerActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import Section from "../../components/account/Section";
import { Routes } from "../../navigation/Routes";

const AccountScreen = () => {
  const dispatch = useDispatch();
  const { RECEIVED_ORDERS } = Routes;

  const handleLogout = async () => {
    await adService.logoutAsync();
    await AsyncStorage.removeItem("token");
    dispatch(logOut());
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
        <Section
          title="Products"
          description="Manage the products you sell"
          destination={RECEIVED_ORDERS}
          icon={require("../../../assets/icons/Profile.png")}
        />

        {/* Profile */}

        <Section
          icon={require("../../../assets/icons/Profile.png")}
          title="Profile"
          destination={RECEIVED_ORDERS}
          description="View your account details"
        />

        {/* Support */}
        <Section
          icon={require("../../../assets/icons/Support.png")}
          title="Support"
          destination={RECEIVED_ORDERS}
          description="For help and enquiries"
        />

        {/* Legal */}
        <Section
          icon={require("../../../assets/icons/Legal.png")}
          title="Legal"
          destination={RECEIVED_ORDERS}
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
