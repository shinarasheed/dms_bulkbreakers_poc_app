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
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";

import { getProducts } from "../../redux/actions/productActions";
import ProductCard from "../../components/products/ProductCard";
import ProductsFooter from "../../components/products/ProductsFooter";
import ProductsBottomSheet from "../../components/products/ProductsBottomSheet";
import { LottieLoader } from "../../components/Loaders/LottieLoader";

const DistributorScreen = () => {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const { distributor } = route.params;


  const productsState = useSelector((state) => state.product);

  const { products, loading } = productsState;

  useEffect(() => {
    dispatch(getProducts(distributor.DIST_Code));
  }, []);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const filteredProducts = products?.filter((product) =>
    product?.brand.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  if (loading) return <LottieLoader />;

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
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={icons.backIcon} style={{ marginRight: 18 }} />
        </Pressable>

        <Text
          style={{
            fontSize: 14,
            color: appTheme.COLORS.white,
            fontFamily: "Gilroy-Bold",
          }}
        >
          Buy From{" "}
          {distributor?.company_name
            ? distributor?.company_name
            : distributor?.CUST_Name}
        </Text>
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

      {products?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard theProduct={item} />}
        />
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
            This Seller does not not have any products to sell{" "}
          </Text>
        </View>
      )}

      <ProductsFooter distributor={distributor} />

      {/* bottom sheet */}
      <ProductsBottomSheet visible={visible} toggle={toggle} />
    </View>
  );
};

export default DistributorScreen;

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
