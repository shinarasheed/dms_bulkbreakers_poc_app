import { StyleSheet, Pressable, TextInput, View } from "react-native";
import React from "react";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import appTheme from "../../constants/theme";

export const SearchHeader = () => {
  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.mainRed,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <View style={styles.searchInputContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialIcon
            name="arrow-back"
            size={25}
            style={{ color: appTheme.COLORS.MainGray }}
          />
        </Pressable>
        <TextInput
          underlineColorAndroid="transparent"
          style={{
            fontSize: 15,
            paddingLeft: 5,
            flex: 1,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 45,
    backgroundColor: appTheme.COLORS.white,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 4,
    paddingHorizontal: 10,
    elevation: 20,
  },
});
