import React, { useState } from "react";
import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { BottomSheet } from "react-native-btr";
import { CheckBox, Icon } from "react-native-elements";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";

export const Filter = ({ filterVisible, toggleFilter }) => {
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

  return (
    <BottomSheet
      visible={filterVisible}
      onBackButtonPress={toggleFilter}
      onBackdropPress={toggleFilter}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          height: "35%",
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
                fontSize: 18,
                fontFamily: "Gilroy-Medium",
              }}
            >
              Show Me
            </Text>
            <Pressable onPress={() => toggleFilter()}>
              <Image source={icons.cancelIcon} />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomColor: appTheme.COLORS.borderGRey1,
              borderBottomWidth: 1,
            }}
          >
            <CheckBox
              center
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color={appTheme.COLORS.mainYellow}
                  size={25}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={25}
                />
              }
              checked={check4}
              onPress={() => setCheck4(!check4)}
            />

            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
              }}
            >
              Products
            </Text>
          </View>

          {/* distributors */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CheckBox
              center
              checkedIcon={
                <Icon
                  name="radio-button-checked"
                  type="material"
                  color={appTheme.COLORS.mainYellow}
                  size={25}
                />
              }
              uncheckedIcon={
                <Icon
                  name="radio-button-unchecked"
                  type="material"
                  color="grey"
                  size={25}
                />
              }
              checked={check5}
              onPress={() => setCheck5(!check5)}
            />

            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
              }}
            >
              Distributors
            </Text>
          </View>
        </View>

        {/* distributors */}

        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => toggleFilter()}
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
              elevation: 20,
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
