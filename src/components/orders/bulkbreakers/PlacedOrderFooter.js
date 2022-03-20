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

import { StarRating } from "../../starRating";
import { icons } from "../../../constants";
import appTheme from "../../../constants/theme";
import { formatPrice } from "../../../utils/formatPrice";
import { getDistanceApart } from "../../../utils/calCulateDistance";
import { INVENTORY_BASE_URL } from "../../../confg";

const OrderFooter = ({ distributor }) => {
  const navigation = useNavigation();

  const [loadingInventory, setLoadingInventory] = useState(false);
  const [inventory, setInventory] = useState([]);

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  useEffect(() => {
    const fetchInventory = async () => {
      let componentMounted = true;

      try {
        setLoadingInventory(true);
        const {
          data: { data },
        } = await axios.get(
          `${INVENTORY_BASE_URL}/inventory/${distributor?.DIST_Code}`
        );

        let availableProducts = data.filter((product) => product.quantity > 0);

        if (componentMounted) {
          setInventory(availableProducts);
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
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        marginTop: 15,
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
            fontSize: 15,
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
              marginRight: 5,
            }}
          >
            Sells From
          </Text>

          {inventory.length > 0 ? (
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
              {`\u20A6${formatPrice(1300)}`} - {`\u20A6${formatPrice(2500)}`}
            </Text>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {distributor?.ratings && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 5,
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
          //   navigation.navigate(Routes.DISTRIBUTOR_SCREEN, { distributor })
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

const styles = StyleSheet.create({});
