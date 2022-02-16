import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";

export const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainRed,
        paddingTop: StatusBar.currentHeight * 1.8,
        paddingBottom: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={icons.backIcon} style={{ marginRight: 18 }} />
        </Pressable>

        <Text
          style={{
            fontSize: 16,
            color: appTheme.COLORS.white,
            fontFamily: "Gilroy-Bold",
          }}
        >
          {title}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            width: 20,
            height: 20,
            backgroundColor: appTheme.COLORS.white,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 5,
          }}
        >
          <Text
            style={{
              color: appTheme.COLORS.mainRed,
            }}
          >
            +
          </Text>
        </Pressable>

        <Text
          style={{
            color: appTheme.COLORS.white,
            fontFamily: "Gilroy-Bold",
          }}
        >
          ADD
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
