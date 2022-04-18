import { Text, View } from "react-native";
import React from "react";
import { BottomSheet } from "react-native-btr";
import appTheme from "../../constants/theme";

const TermsConditions = ({ visible, toggle }) => {
  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.white,
          paddingTop: 20,
          borderTopEndRadius: 10,
          borderTopLeftRadius: 10,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Gilroy-Bold",
            fontSize: 18,
            marginBottom: 15,
          }}
        >
          Promo Terms & Conditions{" "}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
            lineHeight: 22,
            marginBottom: 10,
          }}
        >
          1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Parturient
          sed quis nulla vitae consectetur aliquet arcu libero lorem. Odio quis
          tempus elementum varius eget et. Urna donec eu. zz
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
          morbi lectus. Maecenas dignissim tellus habitasse mauris arcu egestas
          nibh. Morbi quis facilisis erat mauris aliquet ultricies proin. Leo
          purus tortor, sapien, et, neque at lobortis amet.
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Gilroy-Medium",
            lineHeight: 22,
            marginBottom: 10,
          }}
        >
          3. Vestibulum dictum mi commodo mauris pellentesque. Eget nulla donec
          imperdiet condimentum quisque nisi.
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
      </View>
    </BottomSheet>
  );
};

export default TermsConditions;
