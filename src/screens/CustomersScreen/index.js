import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Customer from "../../components/home/Bdrs/Customer";
import appTheme from "../../constants/theme";
import { Header } from "../../components/home/Bdrs/Header";

const CustomersScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const { bdrCustomers } = customerState;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header />

      {/* search bar */}
      <Pressable style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={18}
          style={{ color: appTheme.COLORS.mainYellow }}
        />
        <TextInput
          placeholder=" Search for sellers"
          style={{
            fontSize: 15,
            paddingLeft: 5,
            flex: 1,
            fontFamily: "Gilroy-Medium",
          }}
          onChangeText={(textValue) => setSearchTerm(textValue)}
        />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        {bdrCustomers?.map((customer, index) => {
          return <Customer key={index} customer={customer} />;
        })}
      </ScrollView>
    </View>
  );
};

export default CustomersScreen;

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    elevation: 20,
  },
});
