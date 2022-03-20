import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";

export const Header = ({
  single,
  orderId,
  title,
  isOpen,
  setIsOpen,
  singleOrder,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainRed,
        paddingTop: StatusBar.currentHeight * 1.5,
        paddingBottom: 15,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.navigate(Routes.HOME_SCREEN)}>
          <Image source={icons.backIcon} style={{ marginRight: 18 }} />
        </Pressable>

        <Text
          style={{
            fontSize: 16,
            color: appTheme.COLORS.white,
            fontFamily: "Gilroy-Bold",
          }}
        >
          {single ? `ORDER ${orderId}` : `${title}`}
        </Text>
      </View>

      {singleOrder && (
        <Icon
          name="dots-three-vertical"
          size={20}
          style={{ color: appTheme.COLORS.white, marginRight: 5 }}
          onPress={() => setIsOpen(!isOpen)}
        />
      )}
    </View>
  );
};
