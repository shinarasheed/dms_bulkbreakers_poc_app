import { StyleSheet, ScrollView, Text, View } from "react-native";
import React from "react";

import { Header } from "../../components/orders/Header";

const ReturnPolicy = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header title="Return Policy" />
      <ScrollView
        style={{
          paddingHorizontal: 10,
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
            marginBottom: 20,
            lineHeight: 25,
            marginTop: 20,
          }}
        >
          At International Breweries PLC, we believe that the consumer is the
          boss and are fully committed to providing our consumers with products
          of the highest possible Quality.
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
            marginBottom: 20,
            lineHeight: 25,
          }}
        >
          If you believe there is a defect in the product(s) you purchased,
          please call our Consumer Care Line on +2349062800131 or send an e-mail
          to Ibshopnowsupport@ng.ab-inbev.com to notify us of your intention to
          return the product(s).
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
            lineHeight: 25,
            marginBottom: 20,
          }}
        >
          When we receive your notification of return, you will be directed on
          how the product(s) will be retrieved.
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
            lineHeight: 25,
            marginBottom: 20,
          }}
        >
          We accept returns within 5 days from the date the product(s) was
          purchased. All returns will be replaced with the same brand that was
          purchased (no cash refunds).
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
            lineHeight: 25,
          }}
        >
          Upon receipt of the returned product(s), we will fully examine it and
          notify you via e-mail, within 7 days, on the outcome of our analysis
          and whether you are entitled to a replacement. If you are eligible, we
          will send you a replacement product or communicate to you how to
          collect the replacement product(s).
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
            lineHeight: 25,
            marginBottom: 20,
          }}
        >
          To be eligible for product replacement, please ensure that the product
          was not opened or tampered with in any way. Thank you for your
          patronage.
        </Text>
      </ScrollView>
    </View>
  );
};

export default ReturnPolicy;

const styles = StyleSheet.create({});
