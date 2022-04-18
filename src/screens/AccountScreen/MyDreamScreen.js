import { Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { Header } from "../../components/account/MyDreamHeader";

const MyDreamScreen = () => {
  const route = useRoute();
  const { dream } = route.params;

  const { points, name } = dream;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header title={name} points={points} />
    </View>
  );
};

export default MyDreamScreen;
