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

import { icons } from "../../../constants";
import appTheme from "../../../constants/theme";
import { formatPrice } from "../../../utils/formatPrice";
import { Routes } from "../../../navigation/Routes";
import { getDistanceApart } from "../../../utils/calCulateDistance";
import { INVENTORY_BASE_URL } from "../../../confg";

const OrderFooter = ({ item }) => {
  const navigation = useNavigation();

  const [loadingInventory, setLoadingInventory] = useState(false);
  const [inventory, setInventory] = useState([]);

  const customerState = useSelector((state) => state.customer);

  const { customer, distributors } = customerState;

  const bulkbreaker = distributors.find(
    (bulkbreaker) => bulkbreaker?.SF_Code === item?.sellerCompanyId
  );

  useEffect(() => {
    let componentMounted = true;

    const fetchInventory = async () => {
      try {
        setLoadingInventory(true);
        const {
          data: { data },
        } = await axios.get(`${INVENTORY_BASE_URL}/bb/${bulkbreaker?.id}`);

        if (componentMounted) {
          setInventory(data);
          setLoadingInventory(false);
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
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        paddingVertical: 20,
        paddingHorizontal: 20,
        elevation: appTheme.STYLES.elevation,
      }}
    >
      <Text
        style={{
          color: appTheme.COLORS.mainTextGray,
          fontFamily: "Gilroy-Medium",
          fontSize: 16,
          marginBottom: 5,
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
            fontSize: 20,
          }}
        >
          {bulkbreaker?.CUST_Name}
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
        {/* <View
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
            {bulkbreaker?.stars}
          </Text>
          <Image source={icons.starsIcon} />
          <Text
            style={{
              marginLeft: 3,
              color: appTheme.COLORS.mainTextGray,
              fontFamily: "Gilroy-Light",
            }}
          >
            ({bulkbreaker?.raters})
          </Text>
        </View> */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
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
                lat: customer?.latitude,
                lon: customer?.longitude,
              },
              { lat: bulkbreaker?.latitude, lon: bulkbreaker?.longitude }
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
          onPress={() => Linking.openURL(`tel:+234${bulkbreaker?.phoneNumber}`)}
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
              `http://api.whatsapp.com/send?phone=234${bulkbreaker?.phoneNumber}`
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
          <Image source={icons.WhatsAppIcon} />
          <Text
            style={{
              marginLeft: 8,
              fontFamily: "Gilroy-Light",
            }}
          >
            WhatsApp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate(Routes.BULKBREAKER_SCREEN, {
          //     bulkbreaker,
          //   })
          // }
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
