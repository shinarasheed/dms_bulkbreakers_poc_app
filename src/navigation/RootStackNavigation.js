import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  LocationScreen,
  SearchScreen,
  DistributorsScreen,
  RatingScreen,
  OrdersBulkbreakers,
  OrdersPocs,
  ReceivedOrders,
  PlacedOrders,
  ReceivedOrderDetails,
  PlacedOrderDetails,
  OrderDetails,
  DistributorScreen,
  ProfileScreen,
  SupportScreen,
  LegalScreen,
  AddProductsScreen,
} from "../screens";
import { BottomTabs } from "./BottomTabNavigation";
import appTheme from "../constants/theme";

const Stack = createStackNavigator();

export const RootStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: appTheme.COLORS.mainRed,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={BottomTabs} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen
        name="SearchScreen"
        options={{
          headerShown: false,
        }}
        component={SearchScreen}
      />
      <Stack.Screen
        name="DistributorsScreen"
        component={DistributorsScreen}
        options={{
          headerShown: true,
          headerTitle: "Delievers in 24 hours",
          headerTitleStyle: {
            fontFamily: "Gilroy-Medium",
            fontSize: 17,
          },
        }}
      />
      <Stack.Screen name="AddProductsScreen" component={AddProductsScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
      <Stack.Screen name="LegalScreen" component={LegalScreen} />

      <Stack.Screen name="DistributorScreen" component={DistributorScreen} />
      <Stack.Screen name="OrdersBulkbreakers" component={OrdersBulkbreakers} />
      <Stack.Screen name="OrdersPocs" component={OrdersPocs} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />

      <Stack.Screen name="PlacedOrders" component={PlacedOrders} />
      <Stack.Screen name="ReceivedOrders" component={ReceivedOrders} />
      <Stack.Screen name="PlacedOrderDetails" component={PlacedOrderDetails} />

      <Stack.Screen
        name="ReceivedOrderDetails"
        component={ReceivedOrderDetails}
      />
      <Stack.Screen name="RatingScreen" component={RatingScreen} />
    </Stack.Navigator>
  );
};
