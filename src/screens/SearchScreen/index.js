import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
  Text,
  Pressable,
  Image,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import appTheme from "../../constants/theme";
import Product from "../../components/products/Product";
import { Distributor } from "../../components/home/Distributor";
import BottomFilter from "../../components/home/BottomFilter";
import { Filter } from "../../components/search/Filter";
import { icons } from "../../constants";

const SearchScreen = () => {
  const [showMoreProducts, setShowMoreProducts] = useState(false);
  const [showMoreDistributors, setShowMoreDistributors] = useState(false);

  const [visible, setVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  const productsState = useSelector((state) => state.product);

  const { allProducts } = productsState;

  let allTheProducts = allProducts?.filter((product) => product.quantity > 0);

  const customerState = useSelector((state) => state.customer);

  const { distributors } = customerState;

  const dispatch = useDispatch();

  function toggle() {
    setVisible((visible) => !visible);
  }

  function toggleFilter() {
    setFilterVisible((filterVisible) => !filterVisible);
  }

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.COLORS.mainBackground,
      }}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.mainRed,
          paddingHorizontal: 20,
          paddingVertical: 10,
          flexDirection: "column",
          justifyContent: "flex-end",
          height: StatusBar.currentHeight * 3.5,
        }}
      >
        <View style={styles.searchInputContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <MaterialIcon
              name="arrow-back"
              size={25}
              style={{ color: appTheme.COLORS.MainGray }}
            />
          </Pressable>
          <TextInput
            underlineColorAndroid="transparent"
            style={{
              fontSize: 15,
              paddingLeft: 5,
              flex: 1,
            }}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 15,
        }}
      >
        {!showMoreDistributors && (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 20,
                marginBottom: 15,
              }}
            >
              {!showMoreProducts ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Gilroy-Bold",
                  }}
                >
                  Products ({allProducts?.length})
                </Text>
              ) : (
                <Pressable
                  onPress={() => toggleFilter()}
                  style={{
                    backgroundColor: appTheme.COLORS.Grey2,
                    paddingLeft: 15,
                    paddingRight: 5,
                    paddingVertical: 5,
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Gilroy-Bold",
                    }}
                  >
                    Products{allProducts?.length}
                  </Text>
                  <Image source={icons.dropdownArrow} />
                </Pressable>
              )}

              {!showMoreProducts ? (
                <Pressable onPress={() => setShowMoreProducts(true)}>
                  <Text
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      color: appTheme.COLORS.mainRed,
                      fontFamily: "Gilroy-Bold",
                    }}
                  >
                    View All
                  </Text>
                </Pressable>
              ) : (
                <Pressable onPress={() => toggle()}>
                  <Text
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      color: appTheme.COLORS.mainRed,
                      fontFamily: "Gilroy-Bold",
                    }}
                  >
                    SORT BY
                  </Text>
                </Pressable>
              )}
            </View>
            <FlatList
              data={allTheProducts}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, id) => id.toString()}
              listKey={(item) => item.id.toString()}
              renderItem={({ item }) => <Product item={item} />}
            />

            {showMoreProducts && (
              <FlatList
                style={{
                  marginTop: 25,
                  marginBottom: 20,
                }}
                data={allProducts}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, id) => id.toString()}
                listKey={(item) => item.id.toString()}
                renderItem={({ item }) => <Product item={item} />}
              />
            )}
          </View>
        )}

        {/* Distributors */}
        {!showMoreProducts && (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 20,
                paddingBottom: 10,
              }}
            >
              {!showMoreDistributors ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Gilroy-Bold",
                  }}
                >
                  Distributors ({distributors.slice(0, 1).length})
                </Text>
              ) : (
                <Pressable
                  onPress={() => toggleFilter()}
                  style={{
                    backgroundColor: appTheme.COLORS.Grey2,
                    paddingLeft: 15,
                    paddingRight: 5,
                    paddingVertical: 5,
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "Gilroy-Bold",
                    }}
                  >
                    Distributors ({distributors.length})
                  </Text>
                  <Image source={icons.dropdownArrow} />
                </Pressable>
              )}

              {!showMoreDistributors ? (
                <Pressable onPress={() => setShowMoreDistributors(true)}>
                  <Text
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      color: appTheme.COLORS.mainRed,
                      fontFamily: "Gilroy-Bold",
                    }}
                  >
                    View All
                  </Text>
                </Pressable>
              ) : (
                <Pressable onPress={() => toggle()}>
                  <Text
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      color: appTheme.COLORS.mainRed,
                      fontFamily: "Gilroy-Bold",
                    }}
                  >
                    SORT BY
                  </Text>
                </Pressable>
              )}
            </View>

            {!showMoreDistributors ? (
              <FlatList
                data={distributors.slice(0, 1)}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, id) => id.toString()}
                listKey={(item) => item.id.toString()}
                renderItem={({ item }) => <Distributor distributor={item} />}
              />
            ) : (
              <FlatList
                data={distributors}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, id) => id.toString()}
                listKey={(item) => item.id.toString()}
                renderItem={({ item }) => <Distributor distributor={item} />}
              />
            )}
          </View>
        )}
        {/* Distributors */}
      </ScrollView>

      {/* Bottom Filter */}

      <BottomFilter visible={visible} toggle={toggle} />

      {/* Bottom Filter */}

      <Filter filterVisible={filterVisible} toggleFilter={toggleFilter} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 45,
    backgroundColor: appTheme.COLORS.white,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    borderRadius: 4,
    paddingHorizontal: 10,
    elevation: 20,
  },
});
