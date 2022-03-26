import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Pressable,
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
import { getDistanceApart } from "../../utils/calCulateDistance";
import { INVENTORY_BASE_URL } from "../../confg";
import { BottomSheet } from "react-native-btr";

const SellerInfo = ({ bulkbreaker, infoVisible, toggleInfo }) => {
  const navigation = useNavigation();

  const [loadingInventory, setLoadingInventory] = useState(false);
  const [inventory, setInventory] = useState([]);

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

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

  const pricesArray = inventory?.map((prod) => prod.product.price);

  let minPrice = Math.min(...pricesArray);
  let maxPrice = Math.max(...pricesArray);
  return (
    <BottomSheet
      visible={infoVisible}
      onBackButtonPress={toggleInfo}
      onBackdropPress={toggleInfo}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingHorizontal: 20,
          elevation: appTheme.STYLES.elevation,
          borderRadius: 5,
          paddingTop: 30,
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => toggleInfo()}
          style={{
            position: "absolute",
            width: 15,
            height: 15,
            right: 30,
            top: 15,
          }}
        >
          <Image source={icons.cancelIcon} />
        </TouchableOpacity>

        <View>
          <Text
            style={{
              color: appTheme.COLORS.black,
              fontFamily: "Gilroy-Bold",
              marginBottom: 10,
              fontSize: 18,
            }}
          >
            {bulkbreaker?.sellerName}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
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
                color: appTheme.COLORS.mainTextGray,
                fontFamily: "Gilroy-Light",
              }}
            >
              Beers Selling From
            </Text>

            <Text
              style={{
                fontFamily: "Gilroy-Medium",
                fontSize: 12,
              }}
            >
              {" "}
              {"\u20A6"}
              {formatPrice(minPrice)} - {"\u20A6"}
              {formatPrice(maxPrice)}
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
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
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Pressable
            onPress={() =>
              Linking.openURL(`tel:+234${bulkbreaker?.phoneNumber}`)
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 5,
              backgroundColor: appTheme.COLORS.white,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: appTheme.COLORS.Grey2,
              flex: 1,
              justifyContent: "center",
              marginRight: 20,
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
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: appTheme.COLORS.Grey2,
              flex: 1,
              justifyContent: "center",
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
        </View>
      </View>
    </BottomSheet>
  );
};

export default SellerInfo;
