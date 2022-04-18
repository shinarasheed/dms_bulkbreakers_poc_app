import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Header } from "../../components/orders/Header";
import appTheme from "../../constants/theme";
import TermsConditions from "./TermsConditions";
import { Routes } from "../../navigation/Routes";

const DreamScreen = () => {
  const route = useRoute();
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  function toggle() {
    setVisible((visible) => !visible);
  }

  const { dream } = route.params;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header uppercase title={`${dream?.name} dream`} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
          flex: 1,
          paddingVertical: 20,
        }}
      >
        <View>
          <Text
            style={{
              color: appTheme.COLORS.black,
              fontSize: 20,
              textTransform: "capitalize",
              fontFamily: "Gilroy-Medium",
              marginBottom: 20,
            }}
          >
            {dream?.name} dream rules
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
              lineHeight: 22,
              marginBottom: 10,
            }}
          >
            1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Parturient sed quis nulla vitae consectetur aliquet arcu libero
            lorem. Odio quis tempus elementum varius eget et. Urna donec eu. zz
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
              lineHeight: 22,
              marginBottom: 10,
            }}
          >
            2. Fusce viverra tempor odio mollis. Commodo metus convallis eget
            morbi lectus. Maecenas dignissim tellus habitasse mauris arcu
            egestas nibh. Morbi quis facilisis erat mauris aliquet ultricies
            proin. Leo purus tortor, sapien, et, neque at lobortis amet.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
              lineHeight: 22,
              marginBottom: 10,
            }}
          >
            3. Vestibulum dictum mi commodo mauris pellentesque. Eget nulla
            donec imperdiet condimentum quisque nisi.
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
              lineHeight: 22,
              marginBottom: 10,
            }}
          >
            4. Id id laoreet augue diam sed ac, nec neque. Tincidunt vel, cursus
            turpis leo lectus est. Pharetra, vitae odio tincidunt tincidunt quam
            eleifend hac aliquet lectus.
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
              lineHeight: 22,
              marginBottom: 10,
            }}
          >
            5. Ornare cras tincidunt duis malesuada. Sed amet nibh sit urna,
            etiam velit habitasse non non. Commodo amet feugiat ac, mauris.
            Felis non sem posuere pharetra sed nec.
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
              lineHeight: 22,
              marginBottom: 10,
            }}
          >
            6. Ornare cras tincidunt duis malesuada. Sed amet nibh sit urna,
            etiam velit habitasse non non. Commodo amet feugiat ac, mauris.
            Felis non sem posuere pharetra sed nec.
          </Text>
        </View>
      </ScrollView>

      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate(Routes.MYDREAM_SCREEN, { dream })}
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
            Get Started
          </Text>
        </TouchableOpacity>

        <Pressable
          onPress={() => toggle()}
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Gilroy-Medium",
            }}
          >
            Promo Terms & Conditions
          </Text>
        </Pressable>
      </View>

      <TermsConditions toggle={toggle} visible={visible} />
    </View>
  );
};

export default DreamScreen;
