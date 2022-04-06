import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  SignupScreen,
  ContinueScreen,
  SelectCustomer,
  CustomersScreen,
} from "../screens";

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

export const AuthStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignupScreen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ContinueScreen" component={ContinueScreen} />
      <Stack.Screen name="SelectCustomer" component={SelectCustomer} />
      <Stack.Screen name="CustomersScreen" component={CustomersScreen} />
    </Stack.Navigator>
  );
};
