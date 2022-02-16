import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { icons } from '../../constants';
import appTheme from '../../constants/theme';
import { BottomSheet } from "react-native-btr";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../navigation/Routes"



const ProductsAdded = ({visible2, toggle2}) => {
    const navigation = useNavigation()
  return (
    <BottomSheet
      visible={visible2}
      onBackButtonPress={toggle2}
      onBackdropPress={toggle2}
    >
      <View
        style={{
          alignItems: "center",
          paddingTop: 30,
          backgroundColor: "#FFFFFF",
          paddingBottom: 48,
          borderRadius: 20,
        }}
      >
        <Image
          style={{
            width: 35,
            height: 35,
            marginBottom: 10,
          }}
          source={icons.statusIcon}
        />
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Gilroy-Medium",
            marginBottom: 20,
            color: appTheme.COLORS.black,
            textAlign: "center",
          }}
        >
          New products have been added to your store
        </Text>
        <View style={{ marginTop: 32, flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 4,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderColor: appTheme.COLORS.borderGRey1,
              paddingHorizontal: 12,
              marginRight: 16,
            }}
            onPress={() => toggle2()}
          >
            <Text
              style={{
                color: appTheme.COLORS.black,
                fontFamily: "Gilroy-Bold",
                fontSize: 14,
              }}
            >
              Add More Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: appTheme.COLORS.mainRed,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              borderRadius: 4,
              elevation: 5,
              paddingHorizontal: 12,
            }}
            onPress={() => {
                toggle2()
                 navigation.navigate(Routes.PRODUCTS);
            }
           }
          >
            <Text
              style={{
                color: appTheme.COLORS.white,
                fontFamily: "Gilroy-Bold",
                fontSize: 14,
              }}
            >
              View My Products
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}

export default ProductsAdded

const styles = StyleSheet.create({})