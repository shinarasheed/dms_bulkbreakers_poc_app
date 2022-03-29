import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Switch } from "react-native-elements";

import {
  deleteInventoryProduct,
  getMyInventory,
} from "../../redux/actions//customerActions";
import appTheme from "../../constants/theme";
import { updateProductStatus } from "../../redux/actions//customerActions";
import { formatPrice } from "../../utils/formatPrice";
import { icons } from "../../constants";
import AddProductBottomSheet from "./AddProductBottomSheet";
import EditProductBottomSheet from "./EditproductBottomSheet";

const ProductCard = ({ theProduct }) => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  const { instock, price: inventoryPrice, product } = theProduct;

  const { id, brand, sku, imageUrl, productId, price, productType, country } =
    product;

  const deletePayload = {
    bulkBreakerId: customer?.id.toString(),
    productId: id,
  };

  return (
    <>
      <View>
        <Pressable
          onPress={() => toggle()}
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: appTheme.COLORS.borderGRey,
            paddingVertical: 10,
            alignItems: "flex-start",
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
                {brand}
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
                {sku}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: appTheme.COLORS.black,
                      fontFamily: "Gilroy-Medium",
                    }}
                  >
                    {"\u20A6"}
                    {formatPrice(inventoryPrice)}
                    /case
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      color: instock
                        ? appTheme.COLORS.black
                        : appTheme.COLORS.MainGray,
                      fontFamily: "Gilroy-Medium",
                    }}
                  >
                    {instock ? "In stock" : "Out of stock"}
                  </Text>
                </View>

                <Switch
                  color={appTheme.COLORS.switchGreen}
                  value={instock ? checked : !checked}
                  onValueChange={(value) => {
                    setChecked(value);
                    dispatch(
                      updateProductStatus(customer.id, productId, value)
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </Pressable>

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            right: 20,
          }}
          onPress={() => dispatch(deleteInventoryProduct(deletePayload))}
        >
          <Image source={icons.deleteIcon} />
        </TouchableOpacity>
      </View>

      <EditProductBottomSheet
        visible={visible}
        toggle={toggle}
        product={product}
        inventoryPrice={inventoryPrice}
      />
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productIncreaseDecreaseContainer: {
    backgroundColor: appTheme.COLORS.boxGray,
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 28,
    borderRadius: 5,
  },
  IncreaseText: {
    color: appTheme.COLORS.mainRed,
    fontWeight: "bold",
    fontSize: 20,
  },
});
