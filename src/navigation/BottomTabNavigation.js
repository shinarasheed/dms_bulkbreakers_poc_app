import React from "react";
import { useSelector } from "react-redux";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import appTheme from "../constants/theme";
import { icons } from "../constants";
import { Header } from "../components/home/Header";

const Tab = createBottomTabNavigator();

import { HomeScreen, OrdersScreen, AccountScreen } from "../screens";

export const BottomTabs = () => {
  const screenOptionsStyles = {
    tabBarStyle: {
      height: 70,
      paddingTop: 10,
      borderWidth: 0,
      elevation: 20,
    },
    tabBarLabelStyle: {
      fontSize: 16,
      marginBottom: 10,
      fontFamily: "Gilroy-Medium",
      fontSize: 15,
    },
    tabBarIconStyle: {
      marginBottom: 0,
    },
    // headerShown: false,
    tabBarActiveTintColor: appTheme.COLORS.mainRed,
    tabBarInactiveTintColor: appTheme.COLORS.mainTextGray,
  };

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptionsStyles}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerTitle: "",
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.home}
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
                tintColor: focused
                  ? appTheme.COLORS.focusColor
                  : appTheme.COLORS.unFocusColor,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: appTheme.COLORS.mainRed,
          },
          headerTitleStyle: {
            color: appTheme.COLORS.white,
            fontFamily: "Gilroy-Medium",
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.orders}
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
                tintColor: focused
                  ? appTheme.COLORS.focusColor
                  : appTheme.COLORS.unFocusColor,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerStyle: {
            backgroundColor: appTheme.COLORS.mainRed,
          },
          headerTitleStyle: {
            color: appTheme.COLORS.white,
            fontFamily: "Gilroy-Medium",
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.account}
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
                tintColor: focused
                  ? appTheme.COLORS.focusColor
                  : appTheme.COLORS.unFocusColor,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
