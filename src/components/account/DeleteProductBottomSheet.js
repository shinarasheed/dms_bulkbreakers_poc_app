import React, { useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { BottomSheet } from "react-native-btr";
import appTheme from "../../constants/theme";
import { deleteInventoryProduct } from "../../redux/actions/customerActions";
import { INVENTORY_BASE_URL } from "../../confg";
import { getMyInventory } from "../../redux/actions/customerActions";

const DeleteProductBottomSheet = ({
  deleteVisible,
  toggleDelete,
  deletePayload,
}) => {
  const customerState = useSelector((state) => state.customer);
  const { deleteStatus, isLoading, customer } = customerState;
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const deleteProduct = async (deletePayload) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${INVENTORY_BASE_URL}/bb/delete-product`,
        {
          data: deletePayload,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { status } = data;

      setStatus(status);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setStatus(false);
      setLoading(false);
    }
  };

  return (
    <BottomSheet
      visible={deleteVisible}
      onBackButtonPress={toggleDelete}
      onBackdropPress={toggleDelete}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingTop: 30,
          borderTopEndRadius: 10,
          borderTopLeftRadius: 10,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          {status ? (
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                fontFamily: "Gilroy-Medium",
                marginBottom: 10,
              }}
            >
              product successfully deleted
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                fontFamily: "Gilroy-Medium",
                marginBottom: 10,
              }}
            >
              Are you sure you want to delete this product
            </Text>
          )}

          {status ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(getMyInventory(customer?.id));
                toggleDelete();
              }}
              style={{
                backgroundColor: appTheme.COLORS.mainRed,
                width: "100%",
                height: 50,
                justifyContent: "center",
                borderRadius: 5,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
                elevation: 50,
              }}
            >
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  fontSize: 16,
                  fontFamily: "Gilroy-Bold",
                }}
              >
                ok
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => deleteProduct(deletePayload)}
              style={{
                backgroundColor: appTheme.COLORS.mainRed,
                width: "100%",
                height: 50,
                justifyContent: "center",
                borderRadius: 5,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
                elevation: 50,
              }}
            >
              {loading ? (
                <ActivityIndicator
                  color={
                    Platform.OS === "android"
                      ? appTheme.COLORS.white
                      : undefined
                  }
                  animating={loading}
                  size="large"
                />
              ) : (
                <Text
                  style={{
                    color: appTheme.COLORS.white,
                    fontSize: 16,
                    fontFamily: "Gilroy-Bold",
                  }}
                >
                  Yes Delete
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default DeleteProductBottomSheet;
