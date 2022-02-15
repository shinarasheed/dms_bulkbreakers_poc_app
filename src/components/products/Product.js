import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { icons } from "../../constants";
import axios from "axios";

import appTheme from "../../constants/theme";
import { Routes } from "../../navigation/Routes";
import { formatPrice } from "../../utils/formatPrice";
import { COMPANY_BASE_URL } from "../../confg";

const Product = ({ item }) => {
  const {
    product: { brand, sku, price, imageUrl },
    companyCode,
    quantity,
  } = item;

  const navigation = useNavigation();
  const [loadingDistributor, setLoadingDistributor] = useState(false);
  const [distributor, setdistributor] = useState(null);

  const getTheDistributor = async () => {
    try {
      setLoadingDistributor(true);
      const {
        data: { result },
      } = await axios.get(`${COMPANY_BASE_URL}/company/code/${companyCode}`);
      setdistributor(result);
      setLoadingDistributor(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheDistributor();
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.DISTRIBUTOR_SCREEN, { distributor })
      }
      style={{
        backgroundColor: appTheme.COLORS.white,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 10,
      }}
    >
      <Image style={{ width: 30, height: 60 }} source={{ uri: imageUrl }} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              marginRight: 5,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {brand}
          </Text>

          <Text
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              marginRight: 5,
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Medium",
            }}
          >
            {sku}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.darkgray,
            }}
          >
            Sold by{" "}
          </Text>

          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.black,
            }}
          >
            {companyCode}{" "}
          </Text>

          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.textGray,
            }}
          >
            (5.0 <Image source={icons.starIcon} />)
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.black,
            }}
          >
            {"\u20A6"}
            {formatPrice(price)}/case
          </Text>

          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.black,
            }}
          >
            ({quantity} remaining)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Product;
