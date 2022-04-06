import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import React from "react";
import { icons } from "../../../constants";
import appTheme from "../../../constants/theme";
import { getBdrCustomer } from "../../../redux/actions/customerActions";

const Customer = ({ customer }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => dispatch(getBdrCustomer(customer?.id))}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: appTheme.COLORS.white,
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: appTheme.COLORS.borderGRey,
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={icons.shopIcon} style={{ width: 20, height: 20 }} />

        <View>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 18,
              fontFamily: "Gilroy-Medium",
              textTransform: "capitalize",
            }}
          >
            {customer?.CUST_Name}
          </Text>
          <Text>{customer.CUST_Type}</Text>
        </View>
      </View>
      <Image source={icons.chevRonRight} />
    </TouchableOpacity>
  );
};

export default Customer;

const styles = StyleSheet.create({});
