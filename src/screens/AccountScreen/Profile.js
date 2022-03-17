import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { Header } from "../../components/orders/Header";
import { CUSTOMER_BASE_URL } from "../../confg";

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

  const updatePhoneNumber = async () => {
    const body = {
      code: customer?.BB_Code,
      phoneNumber: myPhoneNumber,
    };

    console.log(body);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.patch(
        `${CUSTOMER_BASE_URL}/updatecustomer/update-phone`,
        body,
        config
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
              value={
                myEmail == null ? "You do not have an email address" : myEmail
              }
              onChangeText={(value) => setMyEmail(value)}
            />
          </View>
        </View>

        <View>
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
                keyboardType="numeric"
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

      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          elevation: 50,
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: "center",
          marginTop: 70,
        }}
      >
        <TouchableOpacity
          onPress={() => updatePhoneNumber()}
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
            Save Changes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: appTheme.COLORS.white,
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
              color: appTheme.COLORS.black,
              fontSize: 16,
              fontFamily: "Gilroy-Bold",
            }}
          >
            Discard Changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
