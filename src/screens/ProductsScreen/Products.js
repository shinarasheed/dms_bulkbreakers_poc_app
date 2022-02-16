import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import ProductsTab from "../../components/account/ProductsTab";
import { Header } from "../../components/account/Header";

import appTheme from "../../constants/theme";
import Products from "../../components/account/Products";

export default function Index() {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const categories = ["all", "in stock", "out of stock"];
  const [searchTerm, setSearchTerm] = useState("");

  const customerState = useSelector((state) => state.customer);

  const { customer, myInventory, isLoading } = customerState;

  const [allInventory, setAllInventory] = useState([]);
  // const [inStockInventory, setInStockInventory] = useState([]);
  // const [outOfStcokInventory, setOutOfStockInventory] = useState([]);

  const inStockInventory = myInventory.filter((item) => item.instock === true);
  const outOfStcokInventory = myInventory.filter(
    (item) => item.instock === false
  );

  // i should not have need for this
  // useEffect(() => {
  //   setAllInventory(myInventory);
  //   setInStockInventory(myInventory);
  //   setOutOfStockInventory(myInventory);
  // }, [myInventory, navigation]);

  const ShowProducts = (index) => {
    switch (index) {
      case 0:
        return <Products inventory={myInventory} />;

      case 1:
        return <Products inventory={inStockInventory} />;

      default:
        return <Products inventory={outOfStcokInventory} />;
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <Header title="products" />

      <View style={{ paddingHorizontal: 20 }}>
        <ProductsTab
          categories={categories}
          index={index}
          setIndex={setIndex}
        />
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
            color: appTheme.COLORS.black,
          }}
          onChangeText={(textValue) => setSearchTerm(textValue)}
        />
      </View>

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator
            color={
              Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
            }
            animating={isLoading}
            size="large"
          />
        </View>
      ) : (
        ShowProducts(index)
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9799A0",
    borderWidth: 0,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 20,
  },
});
