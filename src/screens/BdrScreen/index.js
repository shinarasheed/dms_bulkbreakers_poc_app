import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { getBdr, getBdrCustomers } from "../../redux/actions/customerActions";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";

const BdrScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);

  const { bdr } = customerState;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: appTheme.COLORS.white,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          marginTop: 50,
        }}
      >
        {/* <Text
          style={{
            color: appTheme.COLORS.black,
            fontSize: 20,
            fontFamily: "Gilroy-Medium",
            marginBottom: 10,
          }}
        >
          Welcome...
        </Text> */}

        <Text
          style={{
            color: appTheme.COLORS.black,
            fontSize: 20,
            fontFamily: "Gilroy-Medium",
            marginBottom: 10,
          }}
        >
          Continue as...
        </Text>
      </View>

      {bdr && (
        <View>
          <TouchableOpacity
            style={{
              marginBottom: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Gilroy-Medium",
                  fontSize: 18,
                  textTransform: "capitalize",
                }}
              >
                {bdr?.firstname}
              </Text>

              <Text
                style={{
                  fontFamily: "Gilroy-Medium",
                  fontSize: 18,
                  marginLeft: 5,
                  textTransform: "capitalize",
                }}
              >
                {bdr?.lastname}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(getBdrCustomers(bdr?.email))}
            style={{
              backgroundColor: appTheme.COLORS.mainRed,
              justifyContent: "center",
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 14,
              paddingHorizontal: 15,
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.white,
                fontSize: 17,
                fontFamily: "Gilroy-Medium",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BdrScreen;

const styles = StyleSheet.create({});
