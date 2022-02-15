import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes";

const NoInventory = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.mainRed,
          paddingLeft: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 10,
          paddingTop: StatusBar.currentHeight * 1.5,
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image source={icons.backIcon} style={{ marginRight: 18 }} />
          <Text
            style={{
              fontFamily: "Gilroy-Bold",
              color: appTheme.COLORS.white,
              fontSize: 15,
            }}
          >
            Products
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: appTheme.COLORS.mainBackground,
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <Image source={icons.NoProductIcon} />
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Gilroy-Medium",
              marginTop: 10,
            }}
          >
            You do not have any products in your store yet
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.ADDPRODUCTS_SCREEN)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            width: "100%",
            justifyContent: "center",
            borderRadius: 5,
            borderColor: appTheme.COLORS.borderGRey1,
            paddingVertical: 10,
          }}
        >
          <Pressable
            style={{
              width: 25,
              height: 25,
              backgroundColor: appTheme.COLORS.mainYellow,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 5,
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.white,
              }}
            >
              +
            </Text>
          </Pressable>

          <Text
            style={{
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
              fontSize: 18,
            }}
          >
            Add Products
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoInventory;
