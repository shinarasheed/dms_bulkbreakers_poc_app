import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";

import { BottomSheet } from "react-native-btr";

import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";

import ProductCard2 from "../products/ProductCard2";
import { icons } from "../../constants";
import { cloneDeep, findIndex, pullAt } from "lodash";
import {
  deleteProductToSell,
  productsToSell,
} from "../../redux/actions/productActions";

const ProductsSummarySheet = ({ visible, toggle }) => {
  const dispatch = useDispatch();
  const products_tosell = useSelector((state) => state.product.products_tosell);
  const array = cloneDeep(products_tosell);

  const deleteItem = (productID) => {
    dispatch(deleteProductToSell(productID));
  };

  //   const totalAmount = products_tosell?.reduce(
  //     (accumulator, item) => accumulator + item?.price * item?.,
  //     0
  //   );

  const ProductCard = ({ theProduct }) => {
    const { productId, productSku, price, imageUrl } = theProduct;
    const indexx = findIndex(products_tosell, {
      productId: productId,
    });

    return (
      <>
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
            </View>
            <Text
              style={{
                fontSize: 14,
                textTransform: "capitalize",
                marginBottom: 5,
                color: "#74767E",
                fontFamily: "Gilroy-Medium",
              }}
            >
              ₦{formatPrice(price)}/case
            </Text>
          </View>
          <TouchableOpacity onPress={() => deleteItem(productId)}>
            <Image source={icons.deleteIcon} />
          </TouchableOpacity>
        </View>
      </>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 17,
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              color: "#090B17",
              fontSize: 24,
              fontFamily: "Gilroy-Medium",
            }}
          >
            Added Products
          </Text>
          <Pressable onPress={() => toggle()}>
            <Image source={icons.cancelIcon} />
          </Pressable>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products_tosell}
          keyExtractor={(item) => item.productId.toString()}
          renderItem={({ item }) => <ProductCard theProduct={item} />}
          extraData={products_tosell}
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
          <Text
            style={{
              color: appTheme.COLORS.white,
              fontSize: 16,
              fontFamily: "Gilroy-Bold",
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default ProductsSummarySheet;
