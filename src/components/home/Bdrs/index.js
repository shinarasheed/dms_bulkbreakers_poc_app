import { ScrollView, Text, View } from "react-native";
import React from "react";
import { customersData } from "../../data";
import Customer from "./Customer";
import { Header } from "./Header";
import appTheme from "../../../constants/theme";

const Bdrs = () => {
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      {/* header */}
      <Header />

      <ScrollView>
        {customersData?.map((customer, index) => {
          return <Customer key={index} customer={customer} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Bdrs;
