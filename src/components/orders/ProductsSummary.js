import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import Product from "../../screens/OrdersScreen/pocs/Product";
import { formatPrice } from "../../utils/formatPrice";

const ProductsSummary = ({
  getTotalPrice,
  productsToOder,
  productDetails,
  singleOrder,
}) => {
  return (
    <FlatList
      style={{
        backgroundColor: appTheme.COLORS.white,
        elevation: appTheme.STYLES.elevation,
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

          {/* <TouchableOpacity
          onPress={() => toggle()}
          style={{
            backgroundColor: appTheme.COLORS.Grey2,
            color: appTheme.COLORS.black,
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            width: "90%",
            alignSelf: "center",
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Gilroy-Medium",
            }}
          >
            Reorder
          </Text>
        </TouchableOpacity> */}
        </View>
      )}
    />
  );
};

export default ProductsSummary;

const styles = StyleSheet.create({});
