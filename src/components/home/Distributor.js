import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";

import axios from "axios";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";
import { INVENTORY_BASE_URL } from "../../confg";
import { truncateString } from "../../utils/truncateString";
import { formatPrice } from "../../utils/formatPrice";
import { StarRating } from "../starRating";

export const Distributor = ({ distributor }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const customerState = useSelector((state) => state.customer);
  const { customer } = customerState;

  const navigation = useNavigation();

  useEffect(() => {
    let componentMounted = true;
    const fetchInventory = async (code) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const {
        data: { data },
      } = await axios.get(`${INVENTORY_BASE_URL}/inventory/${code}`, config);

      let availableProducts = data?.filter((product) => product.quantity > 0);
      if (componentMounted) {
        setProducts(availableProducts);
      }
    };

    fetchInventory(distributor?.DistCode);

    return () => {
      componentMounted = false;
    };
  }, []);

  const pricesArray = products.map((prod) => prod.product.price);

  let minPrice = Math.min(...pricesArray);
  let maxPrice = Math.max(...pricesArray);

  const showRating = (rating) => {
    switch (rating) {
      case 5:
        return <Image source={icons.excellentRating} />;

      case 4:
        return <Image source={icons.goodRating} />;

      case 3:
        return <Image source={icons.averageRating} />;
      case 2:
        return <Image source={icons.poorRating} />;

      case 1:
        return <Image source={icons.veryPoorRating} />;
      default:
        return <Image source={icons.excellentRating} />;
    }
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.DISTRIBUTOR_SCREEN, { distributor })
      }
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            marginBottom: 8,
            fontFamily: "Gilroy-Medium",
          }}
        >
          {distributor?.company_name}

          {distributor?.companyName}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            {distributor?.stars && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 15,
                  marginVertical: 5,
                }}
              >
                <Text
                  style={{
                    marginRight: 3,
                    color: appTheme.COLORS.mainTextGray,
                    fontFamily: "Gilroy-Light",
                  }}
                >
                  {distributor?.stars.toFixed(1)}
                </Text>
                {showRating(distributor?.rating)}

                <Text
                  style={{
                    marginRight: 3,
                    color: appTheme.COLORS.mainTextGray,
                    fontFamily: "Gilroy-Light",
                  }}
                >
                  ({`${distributor?.ratings} Orders`})
                </Text>
              </View>
            )}

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text
                style={{
                  fontFamily: "Gilroy-Medium",
                  fontSize: 14,
                }}
              >
                Beers selling from{" "}
              </Text>
              {products.length > 0 ? (
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    fontSize: 13,
                  }}
                >
                  {`\u20A6${formatPrice(minPrice)}`} -{" "}
                  {`\u20A6${formatPrice(maxPrice)}`}
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    fontSize: 13,
                  }}
                >
                  {`\u20A6${formatPrice(1300)}`} -{" "}
                  {`\u20A6${formatPrice(2500)}`}
                </Text>
              )}
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Image style={{ marginRight: 5 }} source={icons.productIcon} />
              <Text
                style={{
                  color: appTheme.COLORS.textGray,
                  fontFamily: "Gilroy-Light",
                  fontSize: 13,
                }}
              >
                {products?.length} Products
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={{ marginRight: 5 }} source={icons.locationIcon} />
              <Text
                style={{
                  color: appTheme.COLORS.textGray,
                  fontFamily: "Gilroy-Light",
                  fontSize: 13,
                }}
              >
                {distributor.byFar}
                km
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
