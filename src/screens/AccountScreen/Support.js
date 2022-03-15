import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { Header } from "../../components/orders/Header";

const Support = () => {
  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
      }}
    >
      <Header title="Support" />
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: appTheme.COLORS.countDownYellow,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: "row",
            marginHorizontal: 10,
            marginVertical: 20,
            borderColor: appTheme.COLORS.mainYellow,
            borderWidth: 1,
          }}
        >
          <Image source={icons.InfoIcon} />

          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
              }}
            >
              Kindly note that our telephone and email
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
              }}
            >
              operate between 8am and 5pm,
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
              }}
            >
              Mondays Fridays and 9am to 4pm on
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: "Gilroy-Light",
              }}
            >
              Satursday
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.black,
                fontSize: 17,
                fontFamily: "Gilroy-Light",
              }}
            >
              You can contact our CIC Agent for support
            </Text>

            <Text
              style={{
                color: appTheme.COLORS.black,
                fontSize: 17,
                fontFamily: "Gilroy-Light",
              }}
            >
              through the channels below:
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 30,
              marginRight: 50,
            }}
          >
            <Image source={icons.phoneIcon2} />
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: appTheme.COLORS.MainGray,
                }}
              >
                Phone
              </Text>
              <Text
                style={{
                  color: appTheme.COLORS.black,
                  fontSize: 18,
                  fontFamily: "Gilroy-Medium",
                  marginTop: 10,
                }}
              >
                {customer?.phoneNumber}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image source={icons.emailIcon} />
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.MainGray,
              }}
            >
              Email
            </Text>
            <Text
              style={{
                color: appTheme.COLORS.black,
                fontSize: 18,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {customer?.email}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({});
