import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { TouchableOpacity, Image, Text, View } from "react-native";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";
import { truncateString } from "../../utils/truncateString";
import { StarRating } from "../starRating";

export const TopDistributor = ({ distributor }) => {
  const navigation = useNavigation();

  const customerState = useSelector((state) => state.customer);
  const { customer } = customerState;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.DISTRIBUTOR_SCREEN, { distributor })
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
          width: 150,
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
          {truncateString(distributor?.company_name, 10)}
        </Text>

        {distributor?.ratings && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 15,
            }}
          >
            <StarRating number={distributor?.stars?.toFixed(1)} />
            <Text
              style={{
                marginLeft: 3,
                color: appTheme.COLORS.mainTextGray,
                fontFamily: "Gilroy-Light",
              }}
            >
              ({distributor?.rating})
            </Text>
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
