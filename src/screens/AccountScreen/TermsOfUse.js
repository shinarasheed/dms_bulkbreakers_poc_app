import { StyleSheet, ScrollView, Text, View } from "react-native";
import React from "react";
import { Header } from "../../components/orders/Header";

const TermsOfUse = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header title="Terms of Use" />
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
            marginBottom: 10,
            lineHeight: 25,
            marginTop: 20,
          }}
        >
          Welcome to the NowNow mobile app (the ‘mobile app’). These terms and
          conditions (“Terms and Conditions”) apply to the app, and all of its
          divisions, subsidiaries and affiliate operated internet sites which
          reference these Terms and Conditions. This mobile app is owned and
          operated by International Breweries Plc (“IB Plc”).
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
            marginBottom: 10,
            lineHeight: 25,
          }}
        >
          IB Plc reserves the right to change, modify, add, or remove portions
          of both these Terms and Conditions at any time. Changes will be
          effective when posted on the mobile app with no other notice provided.
          Please check these Terms and Conditions regularly for updates. Your
          continued use of the mobile app following the posting of changes to
          these Terms and Conditions constitutes your acceptance of those
          changes.
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
            lineHeight: 25,
            marginBottom: 10,
          }}
        >
          Kindly review the Terms and Conditions listed below diligently prior
          to using this mobile app as your use of the mobile app indicates your
          agreement to be wholly bound by its Terms and Conditions without
          modification. You agree that if you are unsure of the meaning of any
          part of these Terms and Conditions or have any questions regarding the
          Terms and Conditions, you will not hesitate to contact us for
          clarification. These Terms and Conditions fully{" "}
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsOfUse;

const styles = StyleSheet.create({});
