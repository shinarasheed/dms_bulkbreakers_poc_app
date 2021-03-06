import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import NoInventory from "../AccountScreen/NoInventory";
import Products from "../ProductsScreen/Products";
import { logOut } from "../../redux/actions/customerActions";

const ProductsScreen = () => {
  const customerState = useSelector((state) => state.customer);

  const { myInventory } = customerState;

  // console.log(myInventory);

  return <>{myInventory.length === 0 ? <NoInventory /> : <Products />}</>;
};

export default ProductsScreen;

const styles = StyleSheet.create({});
