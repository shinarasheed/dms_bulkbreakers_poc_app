import { View } from "react-native";
import React from "react";

import LegalSection from "../../components/account/LegalSection";
import { Routes } from "../../navigation/Routes";
import { Header } from "../../components/orders/Header";

const Legal = () => {
  const { TERMSOF_USER, PRIVACY_POLICY, RETURN_POLICY } = Routes;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header title="Legal" />
      <View>
        <LegalSection title="Terms of Use" destination={TERMSOF_USER} />
        <LegalSection title="Return Policy" destination={RETURN_POLICY} />
        <LegalSection title="Privacy Policy" destination={PRIVACY_POLICY} />
      </View>
    </View>
  );
};

export default Legal;
