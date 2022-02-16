import React from "react";
import { FlatList } from "react-native";

import ProductCard from "./ProductCard";

const Products = ({ inventory }) => {
  return (
    <FlatList
      style={{
        paddingTop: 20,
      }}
      showsVerticalScrollIndicator={false}
      data={inventory}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductCard theProduct={item} />}
    />
  );
};

export default Products;
