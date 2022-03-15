import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { PersistGate } from "redux-persist/integration/react";
import { NativeBaseProvider } from "native-base";

import { restoreToken } from "./src/redux/actions/customerActions";
import { store, persistor } from "./src/redux/store";
import appTheme from "./src/constants/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthStackNavigation } from "./src/navigation/AuthStackNavigation";
import { RootStackNavigation } from "./src/navigation/RootStackNavigation";

const AppWrapper = () => {
  const customerState = useSelector((state) => state.customer);

  const { token } = customerState;

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const dispatch = useDispatch();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: "transparent",
    },
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      "Gilroy-Bold": require("./src/assets/fonts/Gilroy-ExtraBold.otf"),
      "Gilroy-Light": require("./src/assets/fonts/Gilroy-Light.otf"),
      "Gilroy-Medium": require("./src/assets/fonts/Gilroy-Medium.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
    dispatch(restoreToken());
  }, []);

  if (!fontsLoaded) return <AppLoading />;

  return (
    <>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={appTheme.COLORS.mainRed} />
        <NavigationContainer theme={theme}>
          <NativeBaseProvider>
            <PersistGate loading={null} persistor={persistor}>
              {!token ? <AuthStackNavigation /> : <RootStackNavigation />}
            </PersistGate>
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}
