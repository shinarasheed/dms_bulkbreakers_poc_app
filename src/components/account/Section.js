import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";

const Section = ({ description, title, icon, destination }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(destination)}
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
};

export default Section;

const styles = StyleSheet.create({});
