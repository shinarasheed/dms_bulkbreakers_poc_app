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

      // setLoading(true);

      if (customer?.CUST_Type.toLowerCase() === "poc") {
        const {
          data: { data },
        } = await axios.get(
          `${INVENTORY_BASE_URL}/bb/${distributor?.id}`,
          config
        );

        let availableProducts = data;
        // setLoading(false);
        if (componentMounted) {
          setProducts(availableProducts);
        }
      } else {
        const {
          data: { data },
        } = await axios.get(`${INVENTORY_BASE_URL}/inventory/${code}`, config);

        let availableProducts = data?.filter((product) => product.quantity > 0);
        // setLoading(false);
        if (componentMounted) {
          setProducts(availableProducts);
        }
      }
    };

    fetchInventory(distributor.DIST_Code);

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

          {truncateString(distributor?.company_name, 1)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            {distributor?.ratings && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 15,
                }}
              >
                <StarRating number={distributor?.stars?.toFixed(1)} />

                {distributor?.rating && (
                  <Text
                    style={{
                      marginRight: 3,
                      marginLeft: 15,
                      color: appTheme.COLORS.mainTextGray,
                      fontFamily: "Gilroy-Light",
                    }}
                  >
                    ({distributor?.rating})
                  </Text>
                )}
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
