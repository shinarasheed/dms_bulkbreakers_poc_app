import { useState } from "react";
import {
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";
import { getCustomerDetails } from "../../redux/actions/customerActions";

const ContinueScreen = () => {
  const [authCode, setAuthCode] = useState("");
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const customerState = useSelector((state) => state.customer);

  const { error, isLoading } = customerState;

  const handleOnchange = (textValue) => {
    setAuthCode(textValue);
  };

  const handleContinue = () => {
    dispatch(getCustomerDetails(authCode, navigation));
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: appTheme.COLORS.white,
        paddingBottom: 40,
      }}
    >
      <View
        style={{
          marginTop: 100,
        }}
      >
        <Text
          style={{
            color: appTheme.COLORS.black,
            fontSize: 25,
            fontFamily: "Gilroy-Medium",
            marginBottom: 20,
          }}
        >
          Welcome!
        </Text>
        <Text
          style={{
            fontFamily: "Gilroy-Medium",
            fontSize: 15,
          }}
        >
          Please enter your authentication
        </Text>

        <Text
          style={{
            fontFamily: "Gilroy-Medium",
            fontSize: 15,
          }}
        >
          code below
        </Text>
        <View
          style={{
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <TextInput
            placeholder="Enter Code"
            style={{
              borderWidth: 0,
              borderBottomWidth: 1,
              borderBottomColor: appTheme.COLORS.borderGRey1,
              fontFamily: "Gilroy-Medium",
            }}
            onChangeText={(textValue) => handleOnchange(textValue)}
          />
          {error && (
            <Text
              style={{
                color: appTheme.COLORS.mainRed,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {error}
            </Text>
          )}
        </View>

        <View>
          <TouchableOpacity
            onPress={() => handleContinue()}
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

      <Image
        style={{
          alignSelf: "center",
        }}
        source={icons.smallAbLogo}
      />
    </View>
  );
};

export default ContinueScreen;
