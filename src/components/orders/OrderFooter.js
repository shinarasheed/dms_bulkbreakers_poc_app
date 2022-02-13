import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";

import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";
import { Routes } from "../../navigation/Routes";
import { getDistanceApart } from "../../utils/calCulateDistance";
import { INVENTORY_BASE_URL } from "../../confg";

const OrderFooter = ({ distributor }) => {
  const navigation = useNavigation();

  const [loadingInventory, setLoadingInventory] = useState(false);
  const [inventory, setInventory] = useState(null);

  const customerState = useSelector((state) => state.customer);

  const { customerDetails } = customerState;

  const fetchInventory = async () => {
    try {
      setLoadingInventory(true);
      const {
        data: { data },
      } = await axios.get(
        `${INVENTORY_BASE_URL}/inventory/${distributor?.DIST_Code}`
      );

      let availableProducts = data.filter((product) => product.quantity > 0);

      setInventory(availableProducts);
      setLoadingInventory(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        marginTop: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        elevation: appTheme.STYLES.elevation,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          color: appTheme.COLORS.mainTextGray,
          fontFamily: "Gilroy-Medium",
          fontSize: 16,
          marginBottom: 15,
        }}
      >
        Seller
      </Text>

      <View>
        <Text
          style={{
            color: appTheme.COLORS.black,
            fontFamily: "Gilroy-Medium",
            marginBottom: 10,
          }}
        >
          {distributor?.company_name}
        </Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: appTheme.COLORS.mainTextGray,
              fontFamily: "Gilroy-Light",
            }}
          >
            Sells From
          </Text>

          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              fontSize: 14,
            }}
          >
            {" "}
            {"\u20A6"}
            {formatPrice(1300)} - {"\u20A6"}
            {formatPrice(2300)}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginRight: 4,
              color: appTheme.COLORS.mainTextGray,
              fontFamily: "Gilroy-Light",
            }}
          >
            {distributor?.stars}
          </Text>
          <Image source={icons.starsIcon} />
          <Text
            style={{
              marginLeft: 3,
              color: appTheme.COLORS.mainTextGray,
              fontFamily: "Gilroy-Light",
            }}
          >
            ({distributor?.raters})
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 15,
          }}
        >
          <Image source={icons.locationIcon} />
          <Text
            style={{
              marginLeft: 2,
              color: appTheme.COLORS.mainTextGray,
              fontFamily: "Gilroy-Light",
            }}
          >
            {getDistanceApart(
              {
                lat: customerDetails?.latitude,
                lon: customerDetails?.longitude,
              },
              { lat: distributor?.lat, lon: distributor?.long }
            )}
            km
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 15,
          }}
        >
          <Image source={icons.productIcon2} />
          <Text
            style={{
              marginLeft: 4,
              color: appTheme.COLORS.mainTextGray,
              fontFamily: "Gilroy-Light",
            }}
          >
            {inventory?.length} products
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Pressable
          onPress={() => Linking.openURL(`tel:+234${distributor.Owner_Phone}}`)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: appTheme.COLORS.white,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: appTheme.COLORS.Grey2,
          }}
        >
          <Image source={icons.phoneIcon} />
          <Text
            style={{
              marginLeft: 8,
              fontFamily: "Gilroy-Light",
            }}
          >
            Call
          </Text>
        </Pressable>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              `http://api.whatsapp.com/send?phone=234${distributor.Owner_Phone}`
            );
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: appTheme.COLORS.white,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: appTheme.COLORS.Grey2,
          }}
        >
          <Image source={icons.wattsappIcon} />
          <Text
            style={{
              marginLeft: 8,
              fontFamily: "Gilroy-Light",
            }}
          >
            WattsApp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(Routes.PRODUCTS_SCREEN, { distributor })
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: appTheme.COLORS.white,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: appTheme.COLORS.Grey2,
          }}
        >
          <Image source={icons.cartIcon} />
          <Text
            style={{
              marginLeft: 8,
              fontFamily: "Gilroy-Light",
            }}
          >
            Shop
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderFooter;

const styles = StyleSheet.create({});
