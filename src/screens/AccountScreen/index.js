import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { adService } from "ad-b2c-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { logOut } from "../../redux/actions/customerActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { SECTIONS } from "../../components/account/data";
const AccountScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await adService.logoutAsync();
    await AsyncStorage.clear();
    dispatch(logOut());
  };

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      {SECTIONS.map((section) => {
        const { id, icon, title, description, route } = section;
        return (
          <TouchableOpacity
            key={id}
            onPress={() => handleLogout()}
            style={{
              backgroundColor: appTheme.COLORS.white,
              justifyContent: "space-between",
              flexDirection: "row",
              elevation: appTheme.STYLES.elevation,
              alignItems: "center",
              paddingHorizontal: 10,
              marginBottom: 15,
              paddingTop: 30,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image source={icon} />

              <View
                style={{
                  marginLeft: 15,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    fontSize: 17,
                    color: appTheme.COLORS.black,
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Gilroy-Light",
                    marginTop: 4,
                    color: appTheme.COLORS.textGray,
                  }}
                >
                  {description}
                </Text>
              </View>
            </View>

            <Image source={icons.chevRonRight} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
