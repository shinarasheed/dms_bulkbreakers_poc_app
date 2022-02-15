import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import NoInventory from "../AccountScreen/NoInventory";
import Products from "../ProductsScreen/Products";

const ProductsScreen = () => {
  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;
  return (
    // this is temporary
    <>{customer?.CUST_Name === "Mckorr" ? <NoInventory /> : <Products />}</>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({});
