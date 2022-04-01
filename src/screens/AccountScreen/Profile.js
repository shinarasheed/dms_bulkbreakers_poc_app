import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { Header } from "../../components/orders/Header";
import { CUSTOMER_BASE_URL } from "../../confg";

const Profile = () => {
  const [updating, setUpdating] = useState(false);
  const [theCustomer, setTheCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [whatsAppNumber, setWhatsApNumber] = useState("");
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  const getCustomerDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setLoading(true);

      const {
        data: { result },
      } = await axios.get(`${CUSTOMER_BASE_URL}/customer/${customer?.id}`);
      setTheCustomer(result);
      setPhoneNumber(result?.phoneNumber);
      setWhatsApNumber(result?.phoneNumber);
      setEmail(result?.email);
      setLoading(false);
    } catch (error) {
      setError("please provide a valid phone number");
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  const updatePhoneNumber = async () => {
    const body = {
      code: customer?.BB_Code,
      phoneNumber: phoneNumber,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      setUpdating(true);

      const { data } = await axios.patch(
        `${CUSTOMER_BASE_URL}/updatecustomer/update-phone`,
        body,
        config
      );

      getCustomerDetails();
      setUpdating(false);
    } catch (error) {
      console.log(error);
      setUpdating(false);
    }
  };

  const discardChanges = () => {
    setPhoneNumber(theCustomer?.phoneNumber);
    setWhatsApNumber(theCustomer?.phoneNumber);
    setEmail(theCustomer?.email);
  };

  const handleOnchange = (value) => {
    setEditing(true);
    setPhoneNumber(value);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header title="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: appTheme.COLORS.mainBackground,
        }}
      >
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              paddingTop: 30,
            }}
          >
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Image
                  style={{
                    marginRight: 10,
                  }}
                  source={icons.profileIcon}
                />
                <Text
                  style={{
                    color: appTheme.COLORS.MainGray,
                  }}
                >
                  Name & ID
                </Text>
              </View>

              <Text
                style={{
                  color: appTheme.COLORS.black,
                  fontSize: 15,
                  fontFamily: "Gilroy-Medium",
                  width: "100%",
                }}
              >
                {theCustomer?.CUST_Name}
              </Text>

              <View
                style={{
                  marginTop: 10,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: appTheme.COLORS.borderGRey,
                  paddingBottom: 2,
                }}
              >
                <Text
                  style={{
                    color: appTheme.COLORS.black,
                    fontSize: 15,
                    fontFamily: "Gilroy-Medium",
                    width: "100%",
                  }}
                >
                  {theCustomer?.BB_Code}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    marginRight: 10,
                  }}
                  source={icons.emailIcon}
                />
                <Text
                  style={{
                    color: appTheme.COLORS.MainGray,
                  }}
                >
                  Email
                </Text>
              </View>

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
                value={
                  theCustomer?.email == null
                    ? "You do not have an email address"
                    : email
                }
                onChangeText={(value) => setEmail(value)}
              />
            </View>

            <View
              style={{
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  style={{
                    marginRight: 10,
                  }}
                  source={icons.phoneIcon2}
                />

                <Text
                  style={{
                    color: appTheme.COLORS.MainGray,
                    marginBottom: 8,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  Phone number
                </Text>
              </View>
              {error && (
                <View>
                  <Text
                    style={{
                      color: appTheme.COLORS.mainRed,
                      fontSize: 15,
                    }}
                  >
                    {error}
                  </Text>
                </View>
              )}

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
                  color: appTheme.COLORS.mainTextGray,
                  fontFamily: "Gilroy-Medium",
                  fontSize: 16,
                }}
                value={phoneNumber}
                onChangeText={(value) => handleOnchange(value)}
              />
            </View>

            <View
              style={{
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{
                    marginRight: 10,
                  }}
                  source={icons.WhatsAppIcon}
                />
                <Text
                  style={{
                    color: appTheme.COLORS.MainGray,
                    marginBottom: 8,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  WhatsApp number
                </Text>
              </View>

              <TextInput
                style={{
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  width: "100%",
                  borderColor: appTheme.COLORS.borderGRey,
                  marginRight: 5,
                  borderRadius: 5,
                  textAlign: "left",
                  color: appTheme.COLORS.mainTextGray,
                  fontFamily: "Gilroy-Medium",
                  fontSize: 16,
                }}
                value={whatsAppNumber}
                onChangeText={(value) => setWhatsApNumber(value)}
              />
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <Image
                  style={{
                    marginRight: 10,
                  }}
                  source={icons.locationFilled}
                />
                <Text
                  style={{
                    color: appTheme.COLORS.MainGray,
                    marginBottom: 8,
                  }}
                >
                  Address
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Gilroy-Medium",
                    color: appTheme.COLORS.MainGray,
                  }}
                >
                  {theCustomer?.address}
                </Text>
                <Text
                  style={{
                    color: appTheme.COLORS.black,
                    fontSize: 15,
                    fontFamily: "Gilroy-Medium",
                    fontSize: 16,
                  }}
                >
                  {theCustomer?.district}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: appTheme.COLORS.borderGRey,
                  marginTop: 20,
                }}
              ></View>
            </View>
          </View>

          {/* rating */}

          <View
            style={{
              marginTop: 40,
              backgroundColor: appTheme.COLORS.white,
              paddingVertical: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontFamily: "Gilroy-Medium",
                marginBottom: 10,
              }}
            >
              Your current rating
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                  marginRight: 10,
                }}
              >
                4.9
              </Text>
              <Image source={icons.rating} />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Gilroy-Medium",
                  fontSize: 15,
                }}
              >
                (109 Orders)
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15,
                }}
              >
                <Image source={icons.excellentRating} />
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    textTransform: "capitalize",
                    marginLeft: 10,
                  }}
                >
                  excellent
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15,
                }}
              >
                <Image source={icons.excellentRating} />
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    textTransform: "capitalize",
                    marginLeft: 10,
                  }}
                >
                  good
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15,
                }}
              >
                <Image source={icons.excellentRating} />
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    textTransform: "capitalize",
                    marginLeft: 10,
                  }}
                >
                  average
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 15,
                }}
              >
                <Image source={icons.excellentRating} />
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    textTransform: "capitalize",
                    marginLeft: 10,
                  }}
                >
                  poor
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Image source={icons.excellentRating} />
                <Text
                  style={{
                    fontFamily: "Gilroy-Medium",
                    textTransform: "capitalize",
                    marginLeft: 10,
                  }}
                >
                  very poor
                </Text>
              </View>
            </View>
          </View>
        </View>

        {editing && (
          <View
            style={{
              backgroundColor: appTheme.COLORS.white,
              paddingHorizontal: 20,
              justifyContent: "center",
              marginTop: 20,
              paddingVertical: 20,
              elevation: 20,
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
              {updating ? (
                <ActivityIndicator
                  color={
                    Platform.OS === "android"
                      ? appTheme.COLORS.white
                      : undefined
                  }
                  animating={updating}
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
                  Save Changes
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => discardChanges()}
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
        )}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
