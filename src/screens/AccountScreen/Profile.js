import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { Header } from "../../components/orders/Header";

const Profile = () => {
  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  const [myPhoneNumber, setMyPhoneNumber] = useState("");
  const [myPhoneNumberWhatsApp, setMyPhoneNumberWhatsApp] = useState("123456");

  const [myEmail, setMyEmail] = useState("");

  useEffect(() => {
    setMyPhoneNumber(customer?.phoneNumber);
    setMyEmail(customer?.myEmail);
  }, []);

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
          paddingTop: 30,
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
              width: "100%",
              borderColor: appTheme.COLORS.borderGRey,
              paddingTop: 5,
              // borderBottomWidth: 1,
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
                width: "100%",
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
              width: "100%",
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.MainGray,
              }}
            >
              Email
            </Text>

            <TextInput
              style={{
                borderWidth: 0,
                borderBottomWidth: 1,
                width: "100%",
                borderColor: appTheme.COLORS.borderGRey,
                marginRight: 5,
                borderRadius: 5,
                textAlign: "left",
                fontWeight: "bold",
                color: appTheme.COLORS.mainTextGray,
              }}
              value={myEmail}
              onChangeText={(value) => setMyEmail(value)}
            />
          </View>
        </View>

        <View style={{}}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 30,
              marginRight: 50,
              width: "100%",
            }}
          >
            <Image source={icons.phoneIcon2} />
            <View
              style={{
                marginLeft: 10,
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: appTheme.COLORS.MainGray,
                  marginBottom: 8,
                }}
              >
                Phone number
              </Text>

              <TextInput
                style={{
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  width: "100%",
                  borderColor: appTheme.COLORS.borderGRey,
                  marginRight: 5,
                  borderRadius: 5,
                  textAlign: "left",
                  fontWeight: "bold",
                  color: appTheme.COLORS.mainTextGray,
                }}
                value={myPhoneNumber}
                onChangeText={(value) => setMyPhoneNumber(value)}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 30,
              width: "100%",
            }}
          >
            <Image source={icons.WhatsAppIcon} />
            <View
              style={{
                marginLeft: 10,
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: appTheme.COLORS.MainGray,
                  marginBottom: 8,
                }}
              >
                WhatsApp number
              </Text>

              <TextInput
                style={{
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  width: "100%",
                  borderColor: appTheme.COLORS.borderGRey,
                  marginRight: 5,
                  borderRadius: 5,
                  textAlign: "left",
                  fontWeight: "bold",
                  color: appTheme.COLORS.mainTextGray,
                }}
                value={myPhoneNumberWhatsApp}
                onChangeText={(value) => setMyPhoneNumberWhatsApp(value)}
              />
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
                marginBottom: 8,
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
