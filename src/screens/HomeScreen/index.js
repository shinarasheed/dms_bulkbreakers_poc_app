import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

import appTheme from "../../constants/theme";

import { Routes } from "../../navigation/Routes";
import { TopDistributor } from "../../components/home/TopDistributor";
import { Distributor } from "../../components/home/Distributor";
import BottomFilter from "../../components/home/BottomFilter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getCustomerDetails,
  getDistributors,
} from "../../redux/actions/customerActions";
import { Header } from "../../components/home/Header";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  // const [customer, setCustomer] = useState(null);

  const dispatch = useDispatch();

  const customerState = useSelector((state) => state.customer);

  const { error, isLoading, distributors, customer } = customerState;

  const topDistributors = distributors?.slice(0, 3);

  function toggle() {
    setVisible((visible) => !visible);
  }

  // useEffect(() => {
  //   getCustomerDetails();
  // }, []);

  useEffect(() => {
    dispatch(getDistributors());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
      }}
    >
      <Header customer={customer} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => navigation.navigate(Routes.SEARCH_SCREEN)}
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
            Search for products or distributors
          </Text>
        </Pressable>

        {distributors?.length > 0 ? (
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
                  View All
                </Text>
              </TouchableOpacity>
            </View>

            {/* distributors */}

            <ScrollView showsHorizontalScrollIndicator={false}>
              <FlatList
                // snapToInterval={width - 20}
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
              data={distributors}
              listKey={(item) => item.id.toString()}
              keyExtractor={(item, id) => id.toString()}
              renderItem={({ item }) => (
                <Distributor distributor={item} customer={customer} />
              )}
            />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              color={
                Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
              }
              animating={true}
              size="large"
            />
          </View>
        )}
      </ScrollView>

      <BottomFilter visible={visible} toggle={toggle} />
    </View>
  );
};

export default HomeScreen;

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
