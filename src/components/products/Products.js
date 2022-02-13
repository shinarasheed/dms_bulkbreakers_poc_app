import React from "react";
import { Text, View, FlatList, KeyboardAvoidingView } from "react-native";
import appTheme from "../../constants/theme";
import ProductCard from "./ProductCard";

const AllProducts = ({ products }) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={products}
      keyExtractor={(distributor) => distributor.id.toString()}
      renderItem={({ item }) => <ProductCard theProduct={item} />}
    />
  );
};

export default AllProducts;
