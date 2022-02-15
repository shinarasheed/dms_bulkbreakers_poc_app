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
} from "react-native";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";

import AddProductFooter from "../../components/account/AddProductFooter";
import BulkProductCard from "../../components/products/BulkProductCard";

import { fetchAllProductsIntheCompany } from "../../redux/actions/productActions";
import { LottieLoader } from "../../components/Loaders/LottieLoader";

const AddProductsScreen = () => {
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const productsState = useSelector((state) => state.product);

  const { allCompanyProducts, loading } = productsState;

  const filteredProducts = allCompanyProducts?.filter((product) =>
    product?.brand.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  useEffect(() => {
    dispatch(fetchAllProductsIntheCompany());
  }, []);

  function toggle() {
    setVisible((visible) => !visible);
  }

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

      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <BulkProductCard theProduct={item} />}
      />

      <AddProductFooter />
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
