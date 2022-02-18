import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Input } from "react-native-elements";

import { icons } from "../../constants";
import appTheme from "../../constants/theme";
import { Routes } from "../../navigation/Routes";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const Location = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.mainRed,
          flexDirection: "row",
          paddingBottom: 15,
          alignItems: "flex-end",
          paddingHorizontal: 20,
          height: StatusBar.currentHeight * 3.5,
        }}
      >
        <Pressable onPress={() => navigation.navigate(Routes.HOME_SCREEN)}>
          <Image source={icons.backIcon} />
        </Pressable>
        <Text
          style={{
            color: appTheme.COLORS.white,
            fontSize: 16,
            fontFamily: "Gilroy-Bold",
            marginLeft: 20,
          }}
        >
          Your Location
        </Text>
      </View>

      <View>
        <GooglePlacesAutocomplete
          styles={styles.map}
          placeholder="Enter your address here"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data, details);
          }}
          query={{
            key: "AIzaSyB8dE8co9lVO0eoQxdQCcxuEq04B03nH6c",
            language: "en",
          }}
          // predefinedPlaces={[homePlace, workPlace]}
        />

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 80,
            marginLeft: 10,
          }}
        >
          <Image source={icons.currentLocation} />
          <Text
            style={{
              marginLeft: 15,
              fontFamily: "Gilroy-Medium",
              fontSize: 16,
            }}
          >
            Use my Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  map: {
    fontFamily: "Gilroy-Medium",
    color: appTheme.COLORS.black,
  },
});
