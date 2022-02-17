import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";

import axios from "axios";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import { Routes } from "../../navigation/Routes";
import { INVENTORY_BASE_URL } from "../../confg";
import { truncateString } from "../../utils/truncateString";

export const Distributor = ({ distributor }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const customerState = useSelector((state) => state.customer);
  const { customer } = customerState;

  const navigation = useNavigation();

  useEffect(() => {
    let componentMounted = true;
    const getProducts = async (code) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // setLoading(true);

      if (customer?.CUST_Type.toLowerCase() === "poc") {
        const {
          data: { data },
        } = await axios.get(`${INVENTORY_BASE_URL}/bb/${customer?.id}`, config);

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

    getProducts(distributor.DIST_Code);

    return () => {
      componentMounted = false;
    };
  }, []);

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

          {customer?.CUST_Type.toLowerCase() === "bulkbreaker"
            ? truncateString(distributor?.company_name, 1)
            : truncateString(distributor?.CUST_Name, 15)}
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
                  {new Array(5).fill(0).map((_, i) => (
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
            )}

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text
                style={{
                  fontFamily: "Gilroy-Light",
                }}
              >
                Beers selling from{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "Gilroy-Medium",
                  fontSize: 12,
                }}
              >
                {"\u20A6"}1300 - {"\u20A6"}2300{" "}
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
