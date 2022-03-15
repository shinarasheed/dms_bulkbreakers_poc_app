import React from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import { useNavigation } from "@react-navigation/native";
import { BottomSheet } from "react-native-btr";
import { icons } from "../../../constants";

import appTheme from "../../../constants/theme";
import { reordes } from "../../../data";
import { formatPrice } from "../../../utils/formatPrice";
import { Routes } from "../../../navigation/Routes";
import Product from "../Product";

const ReOrder = ({
  visible,
  toggle,
  productsToOder,
  productDetails,
  singleOrder,
  getTotalPrice,
  // distributor,
  reorder,
  item,
}) => {
  const navigation = useNavigation();
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          height: "90%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 30,
              // backgroundColor: appTheme.COLORS.black,
            }}
          >
            <FlatList
              style={{
                backgroundColor: appTheme.COLORS.white,
                marginTop: 15,
                marginBottom: 20,
              }}
              data={productsToOder}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, id) => id.toString()}
              listKey={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Product
                  item={item}
                  productDetails={productDetails}
                  singleOrder={singleOrder}
                  reorder
                />
              )}
              ListHeaderComponent={() => (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: appTheme.COLORS.Grey,
                    paddingVertical: 20,
                    paddingLeft: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    Order Summary
                  </Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View
                  style={{
                    paddingBottom: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingBottom: 20,
                      paddingTop: 20,
                      paddingRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        marginLeft: 60,
                        fontFamily: "Gilroy-Light",
                      }}
                    >
                      Total amount
                    </Text>

                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Gilroy-Bold",
                        color: appTheme.COLORS.mainBrown,
                      }}
                    >
                      {isNaN(getTotalPrice())
                        ? null
                        : `\u20A6${formatPrice(getTotalPrice())}`}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 20,
              justifyContent: "space-between",
              flex: 1,
              // backgroundColor: appTheme.COLORS.mainYellow,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(Routes.DISTRIBUTOR_SCREEN, { item })
              }
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: appTheme.COLORS.mainRed,
                  textDecorationLine: "underline",
                  fontFamily: "Gilroy-Medium",
                  marginTop: 70,
                  marginBottom: 100,
                }}
              >
                Visit {item?.buyerDetails[0]?.buyerName}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => toggle()}
              style={{
                backgroundColor: appTheme.COLORS.mainRed,
                width: "100%",
                height: 50,
                justifyContent: "center",
                borderRadius: 5,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  fontSize: 16,
                  fontFamily: "Gilroy-Bold",
                }}
              >
                {`Confirm \u20A6${formatPrice(getTotalPrice())}`}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

export default ReOrder;

const styles = StyleSheet.create({
  productIncreaseDecreaseContainer: {
    backgroundColor: appTheme.COLORS.boxGray,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 5,
  },
  IncreaseText: {
    color: appTheme.COLORS.mainRed,
    fontWeight: "bold",
    fontSize: 15,
  },
});
