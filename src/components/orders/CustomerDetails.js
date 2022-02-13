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
      <View>
        <Text
          style={{
            color: appTheme.COLORS.textGray,
            fontFamily: "Gilroy-Bold",
            fontSize: 18,
            marginBottom: 15,
          }}
        >
          Buyer Details
        </Text>

        <Text
          style={{
            color: appTheme.COLORS.black,
            fontFamily: "Gilroy-Medium",
            marginBottom: 10,
            fontSize: 18,
          }}
        >
          Mckhor Industrail Ventures
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <Image
          source={icons.locationIconRed}
          style={{
            marginRight: 10,
            width: 25,
            height: 25,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.mainRed,
            }}
          >
            0.9km away
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Gilroy-Light",
                color: appTheme.COLORS.mainTextGray,
              }}
            >
              46, Fatai Aremo Lane, Off Mr Biggs, Ikeja
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontFamily: "Gilroy-Light",
                color: appTheme.COLORS.mainTextGray,
              }}
            >
              Along, Lagos
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Gilroy-Medium",
                  marginBottom: 5,
                  color: appTheme.COLORS.black,
                }}
              >
                Lagos South
              </Text>

              <Text
                style={{
                  fontSize: 17,
                  fontFamily: "Gilroy-Medium",
                  textTransform: "uppercase",
                  marginTop: 5,
                }}
              >
                lagos
              </Text>
            </View>
          </View>
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
            justifyContent: "center",
            borderRadius: 5,
            backgroundColor: appTheme.COLORS.white,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: appTheme.COLORS.Grey2,
            flex: 1,
            marginRight: 20,
            elevation: 10,
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
            justifyContent: "center",
            borderRadius: 5,
            backgroundColor: appTheme.COLORS.white,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: appTheme.COLORS.Grey2,
            flex: 1,
            elevation: 10,
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
      </View>
    </View>
  );
};

export default OrderFooter;

const styles = StyleSheet.create({});
