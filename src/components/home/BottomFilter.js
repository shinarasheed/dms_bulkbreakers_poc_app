import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { RadioButton } from "react-native-paper";

import { CheckBox, Icon } from "react-native-elements";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { useDispatch } from "react-redux";
import { sortDistributors } from "../../redux/actions/customerActions";

const BottomFilter = ({ visible, toggle }) => {
  const filters = [
    {
      key: "RHTL",
      value: "Rating(highest to lowest)",
    },
    {
      key: "RLTH",
      value: "Rating(lowest to highest",
    },

    {
      key: "PHTL",
      value: "Price(highest to lowest)",
    },

    {
      key: "PLTH",
      value: "Price(lowest to highest)",
    },
    {
      key: "DFTC",
      value: "Distance(farthest to closest)",
    },
    {
      key: "DCTF",
      value: "Distance(closet to farthest)",
    },

    {
      key: "OHTL",
      value: "Order(highest to lowest)",
    },
    {
      key: "OLTH",
      value: "Order(lowest to highest",
    },
  ];
  const [sortBy, setSortBy] = useState(null);
  const [checked, setChecked] = React.useState(false);

  const dispatch = useDispatch();

  const handleSortBy = () => {
    dispatch(sortDistributors(sortBy));
  };
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          height: "80%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Gilroy-Light",
                marginBottom: 40,
              }}
            >
              Sort By
            </Text>
            <Pressable onPress={() => toggle()}>
              <Image source={icons.cancelIcon} />
            </Pressable>
          </View>

          {filters.map((filter, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <RadioButton
                value={filter.value}
                color={appTheme.COLORS.mainRed}
                status={checked === filter.key ? "checked" : "unchecked"}
                onPress={() => {
                  setSortBy(filter.key);
                  setChecked(filter.key);
                }}
              />

              <Text
                style={{
                  fontFamily: "Gilroy-Light",
                  fontSize: 18,
                }}
              >
                {filter.value}
              </Text>
            </View>
          ))}
        </View>

        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleSortBy();
              toggle();
            }}
            style={{
              backgroundColor: appTheme.COLORS.mainRed,
              justifyContent: "center",
              borderRadius: 5,
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 15,
              height: 45,
              width: "90%",
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.white,
                fontSize: 15,
                fontFamily: "Gilroy-Bold",
              }}
            >
              Okay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

export default BottomFilter;

const styles = StyleSheet.create({
  productIncreaseDecreaseContainer: {
    backgroundColor: appTheme.COLORS.boxGray,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 5,
  },
  IncreaseText: {
    color: appTheme.COLORS.mainRed,
    fontWeight: "bold",
    fontSize: 15,
  },
});
