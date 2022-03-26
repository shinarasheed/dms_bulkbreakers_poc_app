import React, { useState } from "react";
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

import ProductCard from "../../components/Distributor/ProductCard";
import ProductsFooter from "../../components/Distributor/ProductsFooter";
import ProductsBottomSheet from "../../components/Distributor/ProductsBottomSheet";

export const DistributorFlow = ({ products, distributor }) => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function toggle() {
    setVisible((visible) => !visible);
  }

  const filteredProducts = products?.filter((product) =>
    product?.brand.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

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
          paddingTop: StatusBar.currentHeight,
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
          Buy From {distributor?.companyName}
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
              fontSize: 15,
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
      {/* <ProductsBottomSheet visible={visible} toggle={toggle} /> */}
    </View>
  );
};

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
