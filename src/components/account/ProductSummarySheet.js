import React from "react";
import { Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";

import { BottomSheet } from "react-native-btr";

import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";

import ProductCard2 from "../products/ProductCard2";
import { icons } from "../../constants";

const ProductsSummarySheet = ({ visible, toggle }) => {
  const products_tosell = useSelector((state) => state.product.products_tosell);
  console.log(products_tosell);

  //   const totalAmount = products_tosell?.reduce(
  //     (accumulator, item) => accumulator + item?.price * item?.,
  //     0
  //   );

  const ProductCard = ({ theProduct }) => {
    const { productSku, price, imageUrl } = theProduct;

    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: appTheme.COLORS.borderGRey,
          backgroundColor: appTheme.COLORS.white,
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Image style={{ width: 30, height: 60 }} source={{ uri: imageUrl }} />
        <View style={{ marginLeft: 20, flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 15,
                textTransform: "capitalize",
                marginBottom: 5,
                marginRight: 5,
                color: appTheme.COLORS.black,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {productSku}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textTransform: "capitalize",
                marginBottom: 5,
                color: appTheme.COLORS.black,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {price}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity onPress={() => deleteItem(indexx)}>
                  <Image source={icons.deleteIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingTop: 20,
          borderTopEndRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products_tosell}
          keyExtractor={(item) => item.productId.toString()}
          renderItem={({ item }) => <ProductCard theProduct={item} />}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: appTheme.COLORS.white,
          paddingVertical: 20,
          elevation: 50,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: appTheme.COLORS.mainRed,
            width: "100%",
            height: 50,
            justifyContent: "center",
            borderRadius: 5,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            elevation: 50,
          }}
        >
          {/* <Text
            style={{
              color: appTheme.COLORS.white,
              fontSize: 16,
              fontFamily: "Gilroy-Bold",
            }}
          >
            {totalAmount !== undefined &&
              `Confirm \u20A6${formatPrice(totalAmount)}`}
          </Text> */}
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default ProductsSummarySheet;
