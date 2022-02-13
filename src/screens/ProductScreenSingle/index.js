import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  TextInput,
  Text,
  View,
  Pressable,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";

import { getProducts } from "../../redux/actions/productActions";
import Products from "../../components/products/Products";
import ProductsFooter from "../../components/products/ProductsFooter";
import ProductsBottomSheet from "../../components/products/ProductsBottomSheet";
import { getDistributor } from "../../redux/actions/customerActions";

const index = () => {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const customerState = useSelector((state) => state.customer);

  const { distributor } = customerState;

  const productsState = useSelector((state) => state.product);

  const { products, loading } = productsState;

  useEffect(() => {
    //add the DIST_Code from the customerDetails in the redux store
    // dispatch(getProducts(distributor?.DIST_Code));
    dispatch(getProducts("DDCAS8667"));
    dispatch(getDistributor("DDCAS8667", navigation));
  }, [navigation]);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const filteredProducts = products?.filter((product) =>
    product?.brand.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  if (loading)
    return (
      <View style={styles.animationContainer}>
        <LottieView
          style={{
            width: 150,
            height: 150,
          }}
          source={require("../../assets/loader-animation.json")}
          autoPlay
          loop
        />
      </View>
    );

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        flex: 1,
      }}
    >
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

      {products?.length > 0 ? (
        <Products products={filteredProducts} />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              fontSize: 18,
              textAlign: "center",
              color: appTheme.COLORS.mainRed,
            }}
          >
            This Distributor does not not have any products to sell{" "}
          </Text>
        </View>
      )}

      <ProductsFooter distributor={distributor} />

      {/* bottom sheet */}
      <ProductsBottomSheet visible={visible} toggle={toggle} />
    </View>
  );
};

export default index;

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
