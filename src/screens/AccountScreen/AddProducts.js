import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  TextInput,
  Text,
  View,
  Pressable,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BottomSheet } from "react-native-btr";

import AddProductFooter from "../../components/account/AddProductFooter";
import BulkProductCard from "../../components/products/BulkProductCard";

import {
  deleteProductToSell,
  fetchAllProductsIntheCompany,
} from "../../redux/actions/productActions";
import { LottieLoader } from "../../components/Loaders/LottieLoader";
import AddProductBottomSheet from "../../components/account/AddProductBottomSheet";
import { findIndex, cloneDeep, pullAt } from "lodash";
import { formatPrice } from "../../utils/formatPrice";

const AddProductsScreen = () => {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tempProduct, setTempProduct] = useState({});

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const products_tosell = useSelector((state) => state.product.products_tosell);
  const array = cloneDeep(products_tosell);

  console.log(tempProduct, "---tempProduct---");

  useEffect(() => {
    dispatch(fetchAllProductsIntheCompany());
  }, []);

  const productsState = useSelector((state) => state.product);
  const customerState = useSelector((state) => state.customer);

  const { myInventory } = customerState;

  const [priceSet, setPriceSet] = useState(false);
  const [thePrice, setThePrice] = useState(null);

  const { allCompanyProducts, loading } = productsState;

  let result = allCompanyProducts?.filter((o1) =>
    myInventory.some((o2) => parseInt(o1.productId) === parseInt(o2.productId))
  );

  const filteredProducts = allCompanyProducts?.filter((product) =>
    product?.brand.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  function toggle() {
    setVisible((visible) => !visible);
  }

  const deleteItem = (productID) => {
    dispatch(deleteProductToSell(productID));
  };

  // if (loading) return <LottieLoader />;

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.mainRed,
          paddingLeft: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 10,
          paddingTop: StatusBar.currentHeight * 1.5,
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image source={icons.backIcon} style={{ marginRight: 18 }} />
          <Text
            style={{
              fontFamily: "Gilroy-Bold",
              color: appTheme.COLORS.white,
              fontSize: 15,
            }}
          >
            Add Products
          </Text>
        </Pressable>
      </View>
      <View style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={20}
          style={{ color: appTheme.COLORS.mainYellow }}
        />
        <TextInput
          placeholder="Search for products"
          style={{
            fontSize: 15,
            paddingLeft: 5,
            flex: 1,
            fontFamily: "Gilroy-Medium",
          }}
          onChangeText={(textValue) => setSearchTerm(textValue)}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredProducts?.map((thisProduct, index) => {
          const { id, brand, imageUrl, price, sku } = thisProduct;
          const indexx = findIndex(products_tosell, {
            productId: id,
          });
          // console.log(products_tosell[indexx]?.price, "===========");
          const productIsInInventory = findIndex(myInventory, {
            productId: id,
          });
          const thisPrice =
            productIsInInventory >= 0
              ? myInventory[productIsInInventory].price
              : indexx >= 0
              ? products_tosell[indexx].price
              : null;

          // const secondindexx = findIndex(result, {
          //   id: id,
          // });

          // const secondindexx = result.indexOf(thisProduct);

          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: appTheme.COLORS.borderGRey,
                backgroundColor:
                  indexx >= 0 || productIsInInventory >= 0
                    ? "#ECEFF4"
                    : "#FFFFFF",
                alignItems: "center",
                paddingVertical: 20,
              }}
            >
              <Image
                style={{ width: 30, height: 60 }}
                source={{ uri: imageUrl }}
              />
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
                      <Text
                        style={{
                          fontSize: 15,
                          color: !priceSet
                            ? appTheme.COLORS.MainGray
                            : appTheme.COLORS.black,
                          fontFamily: "Gilroy-Medium",
                        }}
                      >
                        {!thisPrice
                          ? " Price not set"
                          : "\u20A6" + formatPrice(thisPrice) + "/" + "case"}
                      </Text>
                      {indexx < 0 && productIsInInventory < 0 ? (
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            setTempProduct(thisProduct);
                            toggle();
                          }}
                        >
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              backgroundColor: appTheme.COLORS.mainRed,
                              borderRadius: 5,
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: 5,
                            }}
                          >
                            <Text
                              style={{
                                color: appTheme.COLORS.white,
                              }}
                            >
                              +
                            </Text>
                          </View>

                          <Text
                            style={{
                              color: appTheme.COLORS.mainRed,
                              fontFamily: "Gilroy-Bold",
                            }}
                          >
                            ADD
                          </Text>
                        </TouchableOpacity>
                      ) : productIsInInventory < 0 ? (
                        <TouchableOpacity onPress={() => deleteItem(id)}>
                          <Image source={icons.deleteIcon} />
                        </TouchableOpacity>
                      ) : (
                        <View></View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <AddProductFooter />
      <AddProductBottomSheet
        visible={visible}
        toggle={toggle}
        product={tempProduct}
        setThePrice={setThePrice}
      />
    </View>
  );
};

export default AddProductsScreen;

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9799A0",
    paddingLeft: 20,
    elevation: 15,
  },

  animationContainer: {
    backgroundColor: appTheme.COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
