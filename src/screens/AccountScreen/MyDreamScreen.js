import { Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { Header } from "../../components/account/MyDreamHeader";

const MyDreamScreen = () => {
  const route = useRoute();
  const { myDream } = route.params;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header myDream={myDream} />
    </View>
  );
};

export default MyDreamScreen;
