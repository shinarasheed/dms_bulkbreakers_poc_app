import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { useSelector } from "react-redux";
import React from "react";
import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { Header } from "../../components/orders/Header";

const Profile = () => {
  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
      }}
    >
      <Header title="Profile" />

      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 70,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
          }}
        >
          <Image source={icons.profileIcon} />
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
              Name & ID
            </Text>
            <Text
              style={{
                color: appTheme.COLORS.black,
                fontSize: 18,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {customer?.CUST_Name}
            </Text>
            <Text
              style={{
                color: appTheme.COLORS.black,
                fontSize: 15,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {customer?.DIST_Code}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 30,
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
            <Text
              style={{
                color: appTheme.COLORS.black,
                fontSize: 15,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {customer?.DIST_Code}
            </Text>
          </View>
        </View>

        <View style={{}}>
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
                Phone number
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

              <TextInput
                style={{
                  borderWidth: 1,
                  width: 70,
                  borderColor: appTheme.COLORS.borderGRey,
                  marginRight: 5,
                  borderRadius: 5,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: appTheme.COLORS.mainTextGray,
                }}
                value={customer?.phoneNumber}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 30,
            }}
          >
            <Image source={icons.WhatsAppIcon} />
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
                WhatsApp
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
          <Image source={icons.locationFilled} />
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
              Address
            </Text>
            <Text
              style={{
                color: appTheme.COLORS.black,
                fontSize: 18,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {customer?.address}
            </Text>
            <Text
              style={{
                color: appTheme.COLORS.black,
                fontSize: 15,
                fontFamily: "Gilroy-Medium",
              }}
            >
              {customer?.district}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
