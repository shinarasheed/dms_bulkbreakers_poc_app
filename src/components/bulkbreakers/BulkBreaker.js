import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, Image, TouchableOpacity } from "react-native";
import axios from "axios";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";
import { INVENTORY_BASE_URL } from "../../confg";
import { formatPrice } from "../../utils/formatPrice";

export const Bulkbreaker = ({ bulkbreaker }) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let componentMounted = true;

    const fetchInventory = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const {
          data: { data },
        } = await axios.get(
          `${INVENTORY_BASE_URL}/bb/${bulkbreaker?.id}`,
          config
        );

        if (componentMounted) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
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
            marginBottom: 5,
            fontFamily: "Gilroy-Medium",
            fontSize: 15,
          }}
        >
          {bulkbreaker?.sellerName}
        </Text>
        <Text
          style={{
            fontSize: 12,
            backgroundColor: appTheme.COLORS.boxGray,
            borderRadius: 10,
            paddingHorizontal: 8,
            paddingVertical: 3,
            width: 160,
            marginBottom: 5,
            fontFamily: "Gilroy-Medium",
          }}
        >
          90% deliveries in 24 hours
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text
                style={{
                  fontFamily: "Gilroy-Light",
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

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginRight: 5,
                  fontFamily: "Gilroy-Light",
                }}
              >
                5.0
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {new Array(4).fill(0).map((_, i) => (
                  <Image key={i} source={icons.starIcon} />
                ))}
              </View>
              <Text
                style={{
                  fontFamily: "Gilroy-Light",
                }}
              >
                (73 orders)
              </Text>
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
                }}
              >
                {bulkbreaker?.byFar}
                km
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
