import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BottomSheet } from "react-native-btr";
import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";
import { updateProductPrice } from "../../redux/actions/productActions";
import { INVENTORY_BASE_URL } from "../../confg";
import { getMyInventory } from "../../redux/actions/customerActions";

// import ProductCard2 from "../products/ProductCard2";

const AddProductBottomSheet = ({
  visible,
  toggle,
  inventoryPrice,
  product,
}) => {
  const [thePrice, setThePrice] = useState("");
  // const [isVisible, SetIsVisible] = useState(visible);
  const dispatch = useDispatch();
  // const [price, setPrice] = useState(0);
  const [error, SetError] = useState(null);
  const [disabled, SetDisabled] = useState(null);
  // const [productsToSellArray, setProductsToSellArray] = useState([]);
  // const products_tosell = useSelector((state) => state.product.products_tosell);

  const [loading, setLoading] = useState(false);
  const [priceUpdated, setPriceUpdated] = useState(false);

  useEffect(() => {
    setThePrice(inventoryPrice);
  }, []);

  // const save = (productID, productSku, productPrice, imageUrl) => {
  //   // const index = findIndex(productsToSellArray, { productId: productID });
  //   const item = {
  //     productId: productID,
  //     productSku: productSku,
  //     price: productPrice,
  //     imageUrl,
  //   };

  //   dispatch(productToSell(item));
  // };

  //   const saveAction = () => {
  //     let processedArray = products_tosell?.map((item) => ({
  //       productId: item.productId,
  //       productSku: item.productSku,
  //       price: parseInt(item.price),
  //       instock: true,
  //     }));
  //     let toDB = {};
  //     toDB["bulkBreakerId"] = customer.id.toString();
  //     toDB["products"] = processedArray;

  //     // console.log(toDB);

  //     dispatch(saveProductsToSell(toDB));
  //   };

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  const payload = {
    bulkBreakerId: customer?.id.toString(),
    productId: product?.id,
    price: parseInt(thePrice),
  };

  function between(x, min, max) {
    if (x < min && x > 0) {
      SetError("You have entered an amount with no profit margin");
      SetDisabled(true);
    } else if (x > max) {
      SetError(
        "You have entered an amount that would not be competitive in the market"
      );
      SetDisabled(true);
    } else {
      SetError(null);
      SetDisabled(false);
    }
  }

  const updateProductPricing = async (payload) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setLoading(true);

      const { data } = await axios.put(
        `${INVENTORY_BASE_URL}/bb/stock-price`,
        payload,
        config
      );

      const { status } = data;

      dispatch(getMyInventory(customer?.id));
      setLoading(false);
      setPriceUpdated(true);
    } catch (error) {
      console.log(error);
    }
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
          paddingHorizontal: 20,
        }}
      >
        {priceUpdated ? (
          <View
            style={{
              paddingVertical: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                fontFamily: "Gilroy-Medium",
                marginBottom: 10,
              }}
            >
              product price successfully updated
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: appTheme.COLORS.mainRed,
                opacity: disabled ? 0.3 : 1,
                width: 150,
                height: 50,
                justifyContent: "center",
                borderRadius: 5,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
                elevation: 50,
              }}
              onPress={() => toggle()}
            >
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  fontSize: 16,
                  fontFamily: "Gilroy-Bold",
                }}
              >
                ok
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View>
              <Image
                source={{ uri: product.imageUrl }}
                style={{ width: 30, height: 60, alignSelf: "center" }}
              />
              <Pressable
                onPress={() => toggle()}
                style={{
                  position: "absolute",
                  alignSelf: "flex-end",
                  paddingRight: 20,
                  paddingTop: 20,
                  marginBottom: 9,
                }}
              >
                <Image source={icons.cancelIcon} />
              </Pressable>
              <Text
                style={{
                  color: appTheme.COLORS.Grey84,
                  fontSize: 15,
                  alignSelf: "center",
                  marginBottom: 32,
                  fontFamily: "Gilroy-Medium",
                }}
              >
                {product.brand + " " + product.sku}
              </Text>
              <Text style={{ color: appTheme.COLORS.unFocusColor }}>
                Price per case (₦)
              </Text>
              <TextInput
                style={{
                  paddingVertical: 8,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: appTheme.COLORS.mainYellow,
                  fontFamily: "Gilroy-Medium",
                  marginBottom: 16,
                }}
                onChangeText={(textValue) => {
                  between(
                    textValue,
                    product.price - 0.5 * product.price,
                    product.price + 0.5 * product.price
                  );
                  setThePrice(textValue);
                }}
                keyboardType="numeric"
                value={thePrice.toString()}
              />

              {error && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Image source={icons.ErrorIcon} />
                  <Text style={{ color: "#D82C0D", marginLeft: 5 }}>
                    {error}
                  </Text>
                </View>
              )}

              <Text
                style={{
                  marginBottom: 8,
                  color: "#2D2F39",
                }}
              >
                Recommended price:{" "}
                <Text style={{ fontWeight: "600" }}>
                  ₦{formatPrice(product.price)}
                </Text>
              </Text>
              <Text style={{ marginBottom: 8, color: "#2D2F39" }}>
                Suggested price range:{" "}
                <Text style={{ fontWeight: "600" }}>
                  ₦{formatPrice(product.price - 0.5 * product.price)} - ₦
                  {formatPrice(product.price + 0.5 * product.price)}
                </Text>
              </Text>
            </View>

            <View
              style={{
                paddingVertical: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: appTheme.COLORS.mainRed,
                  opacity: disabled ? 0.3 : 1,
                  width: "100%",
                  height: 50,
                  justifyContent: "center",
                  borderRadius: 5,
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 50,
                }}
                disabled={disabled}
                onPress={() => {
                  // dispatch(updateProductPrice(payload));
                  updateProductPricing(payload);
                  // toggle();
                }}
              >
                {loading ? (
                  <ActivityIndicator
                    color={
                      Platform.OS === "android"
                        ? appTheme.COLORS.white
                        : undefined
                    }
                    animating={loading}
                    size="small"
                  />
                ) : (
                  <Text
                    style={{
                      color: appTheme.COLORS.white,
                      fontSize: 16,
                      fontFamily: "Gilroy-Bold",
                    }}
                  >
                    Done
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </BottomSheet>
  );
};

export default AddProductBottomSheet;
