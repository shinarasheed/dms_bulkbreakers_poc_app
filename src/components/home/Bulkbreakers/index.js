import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { TopBulkbreaker } from "./TopBulkbreaker";
import { Bulkbreaker } from "./Bulkbreaker";
import BottomFilter from "../BottomFilter";

import { getBulkbreakers } from "../../../redux/actions/customerActions";
import { Header } from "../Header";
import { icons } from "../../../constants";
import { LottieLoader2 } from "../../Loaders/LottieLoader";

const Bulkbreakers = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const customerState = useSelector((state) => state.customer);

  const {
    distributors: bulkbreakers,
    customer,
    loadingSellers,
  } = customerState;

  const topBulkbreakers = bulkbreakers?.slice(0, 5);

  const filteredBulkbreakers = bulkbreakers?.filter((bb) =>
    bb?.companyName?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  function toggle() {
    setVisible((visible) => !visible);
  }

  useEffect(() => {
    dispatch(getBulkbreakers());
  }, []);

  if (loadingSellers) return <LottieLoader2 />;

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
              onPress={() => navigation.navigate(Routes.BULKBREAKERS_SCREEN)}
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
              data={topBulkbreakers}
              // listKey={(item) => item.id.toString()}
              keyExtractor={(distributor) => distributor?.BB_Code?.toString()}
              renderItem={({ item }) => (
                <TopBulkbreaker bulkbreaker={item} customer={customer} />
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
                    Sellers in your area ({bulkbreakers?.length})
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
            data={filteredBulkbreakers}
            listKey={(item) => item.id.toString()}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({ item }) => (
              <Bulkbreaker bulkbreaker={item} customer={customer} />
            )}
          />
        </View>
      </ScrollView>

      <BottomFilter visible={visible} toggle={toggle} />
    </View>
  );
};

export default Bulkbreakers;

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
