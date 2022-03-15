import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { useNavigation } from "@react-navigation/native";

import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";
import ProductsBottomSheet from "../../components/products/ProductsBottomSheet";
import { Routes } from "../../navigation/Routes";

const OrderCompleteSheet = ({
  productsToOder,
  theDistributor,
  item,
  visible,
  toggle,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggle}
        onBackdropPress={toggle}
      >
        <View
          style={{
            backgroundColor: appTheme.COLORS.white,
            height: "30%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => toggle()}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
              }}
            >
              <Image source={icons.cancelIcon} />
            </Pressable>

            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginBottom: 10,
                }}
                source={icons.statusIcon}
              />
              <Text
                style={{
                  marginBottom: 10,
                  color: appTheme.COLORS.black,
                  fontSize: 17,
                  fontFamily: "Gilroy-Medium",
                }}
              >
                Your Order has been completed
              </Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Routes.PLACED_ORDER_DETAILS, {
                    productsToOder,
                    theDistributor,
                    item,
                  })
                }
                style={{
                  backgroundColor: appTheme.COLORS.mainRed,
                  justifyContent: "center",
                  borderRadius: 5,
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  width: 130,
                  height: 40,
                }}
              >
                <Text
                  style={{
                    color: appTheme.COLORS.white,
                    fontSize: 17,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default OrderCompleteSheet;

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: appTheme.COLORS.white,
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingBottom: 15,
    paddingTop: 15,
    marginTop: 30,
  },

  orderSummay: {
    flexDirection: "row",
    alignItems: "center",
  },

  footerButtonText: {
    color: appTheme.COLORS.white,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});
