import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ActivityIndicator, SafeAreaView, Platform } from "react-native";
import { LoginView } from "ad-b2c-react-native";
import * as SecureStore from "expo-secure-store";

import appTheme from "../../constants/theme";
import { login } from "../../redux/actions/authActions";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(login(navigation));
  };

  const onFail = (reason) => {
    console.log("failed");
  };

  const spinner = () => {
    return (
      <ActivityIndicator
        color={Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined}
        animating={true}
        size="large"
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginView
        // appId="8c11baca-fdbc-4b7f-b2cf-3a177588f37c"
        // redirectURI="https://devdms2.b2clogin.com/oauth2/nativeclient"
        // tenant="devdms2"
        // loginPolicy="B2C_1_dms_mobile_signup_signin"
        appId="ba87f4a6-b062-4aaa-b625-97ec904bb1e3"
        redirectURI="https://opeyemitech.b2clogin.com/oauth2/nativeclient"
        tenant="opeyemitech"
        loginPolicy="B2C_1_Signup_SIgnin"
        secureStore={SecureStore}
        renderLoading={spinner}
        onSuccess={onLogin}
        onFail={onFail}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;
