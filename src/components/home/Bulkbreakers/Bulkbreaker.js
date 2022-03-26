import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Text, View, Image, TouchableOpacity } from "react-native";
import axios from "axios";

import appTheme from "../../../constants/theme";
import { icons } from "../../../constants";
import { Routes } from "../../../navigation/Routes";
import { INVENTORY_BASE_URL } from "../../../confg";
import { truncateString } from "../../../utils/truncateString";
import { formatPrice } from "../../../utils/formatPrice";
import { StarRating } from "../../starRating";

export const Bulkbreaker = ({ bulkbreaker }) => {
  const [products, setProducts] = useState([]);

  const customerState = useSelector((state) => state.customer);
  const { customer } = customerState;

  const { customerType } = bulkbreaker;

  const navigation = useNavigation();

  useEffect(() => {
    let componentMounted = true;
    const fetchInventory = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (customerType === "Distributor") {
        const {
          data: { data },
        } = await axios.get(
          `${INVENTORY_BASE_URL}/inventory/${bulkbreaker?.DistCode}`,
          config
        );

        let availableProducts = data;
        if (componentMounted) {
          setProducts(availableProducts);
        }
      } else {
        const {
          data: { data },
        } = await axios.get(
          `${INVENTORY_BASE_URL}/bb/${bulkbreaker?.id}`,
          config
        );

        let availableProducts = data;
        if (componentMounted) {
          setProducts(availableProducts);
        }
      }
    };

    fetchInventory();

    return () => {
      componentMounted = false;
    };
  }, []);

  const pricesArray = products.map((prod) => prod.product.price);

  let minPrice = Math.min(...pricesArray);
  let maxPrice = Math.max(...pricesArray);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.BULKBREAKER_SCREEN, { bulkbreaker })
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
          {bulkbreaker?.company_name}

          {truncateString(bulkbreaker?.companyName, 15)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            {bulkbreaker?.stars && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    marginRight: 5,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  {bulkbreaker?.stars.toFixed(1)}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <StarRating number={bulkbreaker?.stars?.toFixed(1)} />
                </View>
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    fontSize: 14,
                  }}
                >
                  ({bulkbreaker?.raters})
                </Text>
              </View>
            )}

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <View>
                <Text
                  style={{
                    fontFamily: "Gilroy-Light",
                  }}
                >
                  Beers selling from{" "}
                </Text>

                <Text>{bulkbreaker?.customerType}</Text>
              </View>

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
                {bulkbreaker.byFar}
                km
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
