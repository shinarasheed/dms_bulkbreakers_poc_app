import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import { BottomSheet } from "react-native-btr";

import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { ORDER_BASE_URL } from "../../confg";

const CancelOrderSheet = ({ toggle, visible, orderId }) => {
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const updateOrderStatus = async (status) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        status,
      };

      setLoading(true);

      await axios.patch(
        `${ORDER_BASE_URL}/UpdateOrder/UpdateStatus/${orderId}`,
        body,
        config
      );

      setLoading(false);
      setCancelled(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View
        style={{
          backgroundColor: "#fff",
          height: 200,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingBottom: 20,
          paddingTop: 60,
        }}
      >
        <Pressable
          style={{ position: "absolute", top: 15, right: 20 }}
          onPress={() => toggle()}
        >
          <Image source={icons.cancelIcon} />
        </Pressable>

        {cancelled ? (
          <View>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                fontFamily: "Gilroy-Medium",
              }}
            >
              You have successfully cancelled this order
            </Text>

            <TouchableOpacity
              onPress={() => toggle()}
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
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 15,
                textAlign: "center",
                fontFamily: "Gilroy-Medium",
              }}
            >
              Are you sure you want to cancel this order?
            </Text>

            {/* <View
         style={{
           marginTop: 20,
         }}
       >
         <TextInput
           style={{
             borderWidth: 0,
             borderBottomWidth: 1,
             width: "100%",
             borderColor: appTheme.COLORS.borderGRey,
             textAlign: "left",
             color: appTheme.COLORS.mainTextGray,
             fontFamily: "Gilroy-Medium",
           }}
           value={rejectReason}
           onChangeText={(text) => setRejectReason(text)}
           placeholder="Why do you want to cancel this order?"
         />
       </View> */}
            <View
              style={{
                flexDirection: "row",
                marginTop: 40,
                justifyContent: "center",
              }}
            >
              <Pressable
                style={{
                  width: 130,
                  height: 45,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: appTheme.COLORS.borderGRey1,
                }}
                onPress={() => {
                  toggle();
                }}
              >
                <Text>No</Text>
              </Pressable>

              <Pressable
                style={{
                  width: 130,
                  height: 45,
                  backgroundColor: appTheme.COLORS.mainRed,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginLeft: 20,
                }}
                onPress={() => {
                  updateOrderStatus("Canceled");
                  //   toggle();
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
                      ...appTheme.FONTS.mainFontBold,
                      fontSize: 16,
                    }}
                  >
                    Yes, cancel
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </BottomSheet>
  );
};

export default CancelOrderSheet;
