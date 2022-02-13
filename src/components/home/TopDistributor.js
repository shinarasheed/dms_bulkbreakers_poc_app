import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, Text, View } from "react-native";
import axios from "axios";

import { INVENTORY_BASE_URL } from "../../confg";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";
import { truncateString } from "../../utils/truncateString";

export const TopDistributor = ({ distributor }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.PRODUCTS_SCREEN, { distributor })
      }
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingVertical: 20,
          borderRadius: 4,
          paddingHorizontal: 20,
          marginRight: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={icons.warehouse}
          style={{
            marginBottom: 10,
          }}
        />

        {/* this will be used later  */}

        {/* <Image
          source={icons.percentageIcon}
          resizeMode="contain"
          style={{
            position: "absolute",
            right: 10,
            top: 5,
            width: 35,
            height: 35,
          }}
        /> */}
        <Text
          style={{
            textAlign: "center",
            marginBottom: 5,
            fontFamily: "Gilroy-Medium",
            fontSize: 15,
          }}
        >
          {truncateString(distributor?.company_name, 14)}
        </Text>

        {distributor?.stars ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                marginRight: 5,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {distributor?.stars.toFixed(1)}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {new Array(2).fill(0).map((_, i) => (
                <Image key={i} source={icons.starIcon} />
              ))}
            </View>
            <Text
              style={{
                fontFamily: "Gilroy-Medium",
                fontSize: 14,
              }}
            >
              ({distributor?.raters})
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            {new Array(2).fill(0).map((_, i) => (
              <Image key={i} source={icons.starIcon} />
            ))}
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Image
            style={{
              marginRight: 5,
            }}
            source={icons.locationIcon}
          />
          <Text
            style={{
              color: appTheme.COLORS.textGray,
              fontFamily: "Gilroy-Medium",
              fontSize: 12,
            }}
          >
            {distributor?.byFar}
            km
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
