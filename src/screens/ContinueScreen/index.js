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
import React from "react";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";
import axios from "axios";
import { CUSTOMER_BASE_URL } from "../../confg";

const ContinueScreen = () => {
  const [authCode, setAuthCode] = useState("");
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(null);

  const handleContinue = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        sfDigit: authCode.trim(),
      };

      setLoading(true);

      const { data } = await axios.post(
        `${CUSTOMER_BASE_URL}/customer/get-by-lastdigit/Nigeria`,
        body,
        config
      );

      const { success } = data;

      if (success) {
        navigation.navigate(Routes.SELECT_CUSTOMER_SCREEN, { authCode });
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setStatus(error.response.status);
      setLoading(false);
    }
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
            onChangeText={(textValue) => setAuthCode(textValue)}
          />
          {error && (
            <>
              <Text
                style={{
                  color: appTheme.COLORS.mainRed,
                  fontFamily: "Gilroy-Medium",
                }}
              >
                {status === 404
                  ? "Customer not found"
                  : "something went wrong. please try again"}
              </Text>
            </>
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
              {loading ? (
                <ActivityIndicator
                  color={
                    Platform.OS === "android"
                      ? appTheme.COLORS.white
                      : undefined
                  }
                  animating={loading}
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
