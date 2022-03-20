import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  TextInput,
  Text,
  View,
  Pressable,
  StatusBar,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Slide, Box } from "native-base";
import Icon2 from "react-native-vector-icons/Entypo";

import { getProducts } from "../../redux/actions/productActions";
import ProductCard from "../../components/products/ProductCard";
import ProductsFooter from "../../components/orders/pocs/ProductsFooter";
import ProductsBottomSheet from "../../components/products/ProductsBottomSheet";
import { LottieLoader } from "../../components/Loaders/LottieLoader";
import { Routes } from "../../navigation/Routes";
import SellerInfo from "./SellerInfo";

const BulkbreakerScreen = () => {
  const [visible, setVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const { bulkbreaker } = route.params;

  const productsState = useSelector((state) => state.product);

  const { products, loading } = productsState;

  useEffect(() => {
    dispatch(getProducts(bulkbreaker?.id));
  }, []);

  function toggle() {
    setVisible((visible) => !visible);
  }

  function toggleInfo() {
    setInfoVisible((infoVisible) => !infoVisible);
  }

  const filteredProducts = products?.filter((product) =>
    product?.brand.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  if (loading) return <LottieLoader />;

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: appTheme.COLORS.mainRed,
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 10,
          paddingTop: StatusBar.currentHeight * 1.5,
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={icons.backIcon} style={{ marginRight: 18 }} />
          </Pressable>

          <Text
            style={{
              fontSize: 14,
              color: appTheme.COLORS.white,
              fontFamily: "Gilroy-Bold",
            }}
          >
            Buy From {bulkbreaker?.CUST_Name}
          </Text>
        </View>

        <Icon2
          name="dots-three-vertical"
          size={20}
          style={{ color: appTheme.COLORS.white, marginRight: 5 }}
          onPress={() => setIsOpen(!isOpen)}
        />
      </View>
      <View style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={20}
          style={{ color: appTheme.COLORS.mainYellow }}
        />
        <TextInput
          placeholder="Search for products"
          style={{
            fontSize: 15,
            paddingLeft: 5,
            flex: 1,
            fontFamily: "Gilroy-Medium",
          }}
          onChangeText={(textValue) => setSearchTerm(textValue)}
        />
      </View>

      {products?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard theProduct={item} />}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Text
            style={{
              fontFamily: "Gilroy-Medium",
              fontSize: 15,
              textAlign: "center",
              color: appTheme.COLORS.mainRed,
            }}
          >
            This Seller does not not have any products to sell{" "}
          </Text>
        </View>
      )}

      <ProductsFooter bulkbreaker={bulkbreaker} />

      {/* bottom sheet */}
      <ProductsBottomSheet
        visible={visible}
        toggle={toggle}
        toggleInfo={toggleInfo}
      />

      <SellerInfo
        bulkbreaker={bulkbreaker}
        infoVisible={infoVisible}
        toggleInfo={toggleInfo}
      />

      <Slide
        in={isOpen}
        placement="right"
        style={{
          marginTop: 25,
        }}
      >
        <Box
          _text={{
            color: "white",
          }}
          style={{
            backgroundColor: "#eee",
            width: 200,
            marginTop: 50,
            paddingLeft: 20,
            elevation: 50,
            paddingTop: 5,
            paddingBottom: 15,
          }}
        >
          <View>
            <Pressable
              onPress={() => toggleInfo()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={icons.RestaurantColored}
              />

              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Gilroy-Medium",
                }}
              >
                View Distributor Info
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(Routes.HOME_SCREEN)}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={icons.homeColored}
              />

              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "Gilroy-Medium",
                }}
              >
                Go Home
              </Text>
            </Pressable>
          </View>
        </Box>
      </Slide>
    </View>
  );
};

export default BulkbreakerScreen;

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9799A0",
    paddingLeft: 20,
    elevation: 15,
  },

  animationContainer: {
    backgroundColor: appTheme.COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
