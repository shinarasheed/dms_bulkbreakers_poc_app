import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
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
  );
};

export default NoInventory;
