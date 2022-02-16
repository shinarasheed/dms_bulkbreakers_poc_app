import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import appTheme from "../../constants/theme";

const ProductsTab = ({ categories, index, setIndex }) => {
  return (
    <View style={styles.categoryListContainer}>
      {categories.map((item, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.8}
          onPress={() => setIndex(i)}
        >
          <View>
            <Text
              style={{
                textTransform: "uppercase",
                fontFamily: "Gilroy-Medium",
                fontSize: 14,
                color:
                  index == i ? appTheme.COLORS.black : appTheme.COLORS.MainGray,
              }}
            >
              {item}
            </Text>
            {index == i && (
              <View
                style={{
                  height: 2,
                  width: "100%",
                  backgroundColor: appTheme.COLORS.secondary,
                  marginTop: 5,
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProductsTab;

const styles = StyleSheet.create({
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
