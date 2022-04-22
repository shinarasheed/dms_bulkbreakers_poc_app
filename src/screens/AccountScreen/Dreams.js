import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import appTheme from "../../constants/theme";
import { Header } from "../../components/orders/Header";
import { formatPrice } from "../../utils/formatPrice";
import { Routes } from "../../navigation/Routes";
import { CUSTOMER_BASE_URL } from "../../confg";

const Dreams = () => {
  const navigation = useNavigation();
  const [dream, setDream] = useState(null);
  const [myDream, setMyDream] = useState(null);
  const [selectedDream, setSelectedDream] = useState(null);
  const [loading, setLoading] = useState(false);

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  useEffect(() => {
    const getMyDream = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const payload = {
          BB_Code: customer?.BB_Code,
          country: customer?.country,
        };

        const { data } = await axios.post(
          `${CUSTOMER_BASE_URL}/mydream/getdream`,
          payload,
          config
        );

        const { results } = data;

        setMyDream(results[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getMyDream();
  }, []);

  const createADream = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        BB_Code: customer?.BB_Code,
        dreamName: selectedDream?.name,
        dreamPoint: selectedDream?.points,
        dreamDuration: selectedDream?.duration,
        country: customer?.country,
      };

      setLoading(true);

      const { data } = await axios.post(
        `${CUSTOMER_BASE_URL}/mydream/create-dream`,
        body,
        config
      );

      setLoading(false);

      const { success, results } = data;
      if (success) {
        navigation.navigate(Routes.DREAM_SCREEN, { dream });
      } else {
        return;
      }

      console.log(data, "dream");
    } catch (error) {
      console.log(error);
    }
  };

  const dreams = [
    {
      id: 1,
      name: "keke",
      points: 1000,
      duration: 60,
      img: require("../../../assets/images/kekedream.png"),
    },
    {
      id: 2,
      name: "chiller",
      points: 400,
      duration: 60,
      img: require("../../../assets/images/chillerdream.png"),
    },
    {
      id: 3,
      name: "smartphone",
      points: 400,
      duration: 60,
      img: require("../../../assets/images/phonedream.png"),
    },
    {
      id: 4,
      name: "trolley",
      points: 400,
      duration: 60,
      img: require("../../../assets/images/trollydream.png"),
    },
    {
      id: 5,
      name: "airtime",
      points: 400,
      duration: 60,
      img: require("../../../assets/images/airtimedream.png"),
    },
  ];

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header title="I have a drem" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: appTheme.COLORS.countDownYellow,
            borderRadius: 10,
            flexDirection: "row",
            borderColor: appTheme.COLORS.mainYellow,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Gilroy-Light",
              lineHeight: 20,
            }}
          >
            You now have a chance to realise your dream of owning a Keke, Glass
            Chiller, Smartphone or Trolley. Please select your dream below to
            get started.
          </Text>
        </TouchableOpacity>

        <View>
          {dreams.map((dream) => (
            <Pressable
              disabled={myDream?.dream_name !== dream?.name}
              onPress={() => {
                // setSelectedDream(dream);
                // createADream();
                navigation.navigate(Routes.DREAM_SCREEN, { myDream });
              }}
              key={dream.id}
              style={{
                marginVertical: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={dream?.img}
                style={{ width: "100%", height: 200 }}
              />

              <View
                style={{
                  backgroundColor: appTheme.COLORS.black,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  // width: 120,
                  position: "absolute",

                  top: 135,
                  left: 31,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Gilroy-Medium",
                    color: appTheme.COLORS.white,
                    textAlign: "center",
                  }}
                >
                  win a {dream.name}
                </Text>
              </View>

              <View
                style={{
                  position: "absolute",
                  left: 0,
                  paddingLeft: 30,
                }}
              >
                <View
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      textTransform: "uppercase",
                      fontFamily: "Gilroy-Bold",
                    }}
                  >
                    {dream.name} dream
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: appTheme.COLORS.black,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    marginBottom: 5,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Gilroy-Medium",
                      color: appTheme.COLORS.white,
                    }}
                  >
                    Sell {formatPrice(dream.points)} cases of drink
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Dreams;
