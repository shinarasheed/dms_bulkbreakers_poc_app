import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import appTheme from "../../../constants/theme";
import { Routes } from "../../../navigation/Routes";
import { TopDistributor } from "../TopDistributor";
import { Distributor } from "../Distributor";
import BottomFilter from "../BottomFilter";

import {
  getDistributors,
  getMyInventory,
} from "../../../redux/actions/customerActions";
import { Header } from "../Header";
import { icons } from "../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logOut } from "../../../redux/actions/customerActions";
import { LottieLoader, LottieLoader2 } from "../../Loaders/LottieLoader";

const Distributors = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const customerState = useSelector((state) => state.customer);

  const { distributors, myInventory, sellersNotNear, customer, isLoading } =
    customerState;

  const topDistributors = distributors?.slice(0, 5);

  const filteredDistributors = distributors?.filter((dist) =>
    dist?.companyName?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  function toggle() {
    setVisible((visible) => !visible);
  }

  const handleLogOut = async () => {
    // await adService.logoutAsync();
    await AsyncStorage.removeItem("token");
    dispatch(logOut());
  };

  useEffect(() => {
    if (sellersNotNear) {
      Alert.alert(
        "",
        "There are not sellers within a 5km radius of your location. Your order might not be delivered within 24 hours. Do you wish to continue?",
        [
          {
            text: "No",
            onPress: () => handleLogOut(),
            style: "cancel",
          },
          { text: "OK" },
        ]
      );
    }
  }, [sellersNotNear]);

  useEffect(() => {
    dispatch(getMyInventory(customer?.id));
  }, []);

  useEffect(() => {
    dispatch(getDistributors());
  }, []);

  if (isLoading) return <LottieLoader2 />;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
      }}
    >
      <Header customer={customer} />

      {/* search bar */}
      <Pressable style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={18}
          style={{ color: appTheme.COLORS.mainYellow }}
        />
        <TextInput
          placeholder=" Search for sellers"
          style={{
            fontSize: 15,
            paddingLeft: 5,
            flex: 1,
            fontFamily: "Gilroy-Medium",
          }}
          onChangeText={(textValue) => setSearchTerm(textValue)}
        />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Pressable
          // onPress={() => navigation.navigate(Routes.SEARCH_SCREEN)}
          style={styles.searchInputContainer}
        >
          <Icon
            name="search"
            size={20}
            style={{ color: appTheme.COLORS.mainYellow, marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 5,
              flex: 1,
              fontFamily: "Gilroy-Medium",
              color: appTheme.COLORS.black,
            }}
          >
            Search for products or sellers
          </Text>
        </Pressable> */}

        {myInventory?.length === 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.ADDPRODUCTS_SCREEN)}
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
                  fontSize: 13,
                  fontFamily: "Gilroy-Light",
                }}
              >
                You have not added products to your store
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Gilroy-Light",
                }}
              >
                Tap here to add products
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <View
          style={{
            paddingHorizontal: 15,
            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Gilroy-Medium",
                fontSize: 15,
              }}
            >
              Delivers in 24 hours
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.DISTRIBUTORS_SCREEN)}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  color: appTheme.COLORS.mainRed,
                  fontSize: 12,
                  fontFamily: "Gilroy-Bold",
                }}
              >
                {/* View All */}
              </Text>
            </TouchableOpacity>
          </View>

          {/* distributors */}

          <ScrollView showsHorizontalScrollIndicator={false}>
            <FlatList
              contentContainerStyle={{ marginTop: 20, marginBottom: 20 }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={topDistributors}
              listKey={(item) => item.id.toString()}
              keyExtractor={(distributor) => distributor.id.toString()}
              renderItem={({ item }) => (
                <TopDistributor distributor={item} customer={customer} />
              )}
            />
          </ScrollView>

          <FlatList
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Gilroy-Bold",
                      fontSize: 16,
                    }}
                  >
                    Sellers in your area ({distributors?.length})
                  </Text>
                  <TouchableOpacity onPress={() => toggle()}>
                    <Text
                      style={{
                        textTransform: "uppercase",
                        color: appTheme.COLORS.mainRed,
                        fontSize: 12,
                        fontFamily: "Gilroy-Bold",
                      }}
                    >
                      Sort by
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            data={filteredDistributors}
            listKey={(item) => item.id.toString()}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({ item }) => (
              <Distributor distributor={item} customer={customer} />
            )}
          />
        </View>
      </ScrollView>

      <BottomFilter visible={visible} toggle={toggle} />
    </View>
  );
};

export default Distributors;

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    elevation: 20,
  },
});
