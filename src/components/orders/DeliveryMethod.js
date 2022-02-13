import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RadioButton } from "react-native-paper";

import appTheme from "../../constants/theme";

const DeliveryMethod = () => {
  const [checked, setChecked] = React.useState(false);

  const filters = [
    {
      key: "Van-Delivery",
      value: "Store delivery",
    },
    {
      key: "Pick-Up",
      value: "Pickup",
    },
  ];
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        marginBottom: 20,
        paddingVertical: 20,
        elevation: appTheme.STYLES.elevation,
      }}
    >
      <Text
        style={{
          fontFamily: "Gilroy-Bold",
          fontSize: 18,
          fontWeight: "800",
          marginLeft: 10,
          marginBottom: 10,
          color: appTheme.COLORS.mainTextGray,
        }}
      >
        Delivery Method
      </Text>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        {filters.map((filter, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              marginRight: 60,
            }}
          >
            <RadioButton
              value={filter.value}
              color={appTheme.COLORS.mainYellow}
              status={checked === filter.key ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(filter.key);
              }}
            />

            <Text
              style={{
                fontFamily: "Gilroy-Medium",
                fontSize: 18,
                color: appTheme.COLORS.mainTextGray,
              }}
            >
              {filter.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DeliveryMethod;

const styles = StyleSheet.create({});
