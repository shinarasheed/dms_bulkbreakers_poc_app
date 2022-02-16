// import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Image,
//   TextInput,
//   Text,
//   View,
//   Pressable,
//   StatusBar,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import appTheme from "../../constants/theme";
// import { icons } from "../../constants";
// import Icon from "react-native-vector-icons/MaterialIcons";

// import ProductCard from "../../components/account/ProductCard";
// import ProductsFooter from "../../components/products/ProductsFooter";
// import ProductsBottomSheet from "../../components/products/ProductsBottomSheet";
// import { LottieLoader } from "../../components/Loaders/LottieLoader";

// const Products = () => {
//   const [visible, setVisible] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const navigation = useNavigation();

//   const customerState = useSelector((state) => state.customer);

//   const { isLoading, myInventory } = customerState;

//   function toggle() {
//     setVisible((visible) => !visible);
//   }

//   const filteredProducts = myInventory?.filter((item) =>
//     item.product?.brand.toLowerCase().includes(searchTerm.toLocaleLowerCase())
//   );

//   if (isLoading) return <LottieLoader />;

//   return (
//     <View
//       style={{
//         backgroundColor: appTheme.COLORS.white,
//         flex: 1,
//       }}
//     >
//       <View
//         style={{
//           backgroundColor: appTheme.COLORS.mainRed,
//           paddingLeft: 20,
//           flexDirection: "row",
//           alignItems: "center",
//           paddingBottom: 10,
//           paddingTop: StatusBar.currentHeight * 1.5,
//         }}
//       >
//         <Pressable onPress={() => navigation.goBack()}>
//           <Image source={icons.backIcon} style={{ marginRight: 18 }} />
//         </Pressable>

//         <Text
//           style={{
//             fontSize: 14,
//             color: appTheme.COLORS.white,
//             fontFamily: "Gilroy-Bold",
//           }}
//         >
//           Products
//         </Text>
//       </View>
//       <View style={styles.searchInputContainer}>
//         <Icon
//           name="search"
//           size={20}
//           style={{ color: appTheme.COLORS.mainYellow }}
//         />
//         <TextInput
//           placeholder="Search for products"
//           style={{
//             fontSize: 15,
//             paddingLeft: 5,
//             flex: 1,
//             fontFamily: "Gilroy-Medium",
//           }}
//           onChangeText={(textValue) => setSearchTerm(textValue)}
//         />
//       </View>

//       {myInventory?.length > 0 ? (
//         <FlatList
//           style={{
//             paddingTop: 20,
//           }}
//           showsVerticalScrollIndicator={false}
//           data={filteredProducts}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => <ProductCard theProduct={item} />}
//         />
//       ) : (
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: 40,
//           }}
//         >
//           <Text
//             style={{
//               fontFamily: "Gilroy-Medium",
//               fontSize: 18,
//               textAlign: "center",
//               color: appTheme.COLORS.mainRed,
//             }}
//           >
//             This Distributor does not not have any products to sell{" "}
//           </Text>
//         </View>
//       )}

//       {/* <ProductsFooter distributor={distributor} /> */}

//       {/* bottom sheet */}
//       {/* <ProductsBottomSheet visible={visible} toggle={toggle} /> */}
//     </View>
//   );
// };

// export default Products;

// const styles = StyleSheet.create({
//   searchInputContainer: {
//     height: 50,
//     backgroundColor: appTheme.COLORS.white,
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: "#9799A0",
//     paddingLeft: 20,
//     elevation: 15,
//   },

//   animationContainer: {
//     backgroundColor: appTheme.COLORS.white,
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
// });

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import ProductsTab from "../../components/account/ProductsTab";
import { Header } from "../../components/account/Header";

import appTheme from "../../constants/theme";
import { icons } from "../../constants";
import Products from "../../components/account/Products";
import { getMyInventory } from "../../redux/actions/customerActions.js";

export default function Index() {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const categories = ["all", "in stock", "out of stock"];
  const [searchTerm, setSearchTerm] = useState("");

  const customerState = useSelector((state) => state.customer);

  const { customer, myInventory, isLoading } = customerState;

  const [allInventory, setAllInventory] = useState([]);
  const [inStockInventory, setInStockInventory] = useState([]);
  const [outOfStcokInventory, setOutOfStockInventory] = useState([]);

  // i should not have need for this
  useEffect(() => {
    setAllInventory(myInventory);
    setInStockInventory(myInventory);
    setOutOfStockInventory(myInventory);
  }, [myInventory, navigation]);

  const ShowProducts = (index) => {
    switch (index) {
      case 0:
        return <Products inventory={allInventory} />;

      case 1:
        return <Products inventory={inStockInventory} />;

      default:
        return <Products inventory={outOfStcokInventory} />;
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.COLORS.mainBackground,
        flex: 1,
      }}
    >
      <Header title="products" />

      <View style={{ paddingHorizontal: 20 }}>
        <ProductsTab
          categories={categories}
          index={index}
          setIndex={setIndex}
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
            color: appTheme.COLORS.black,
          }}
          onChangeText={(textValue) => setSearchTerm(textValue)}
        />
      </View>

      {isLoading ? (
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
            animating={isLoading}
            size="large"
          />
        </View>
      ) : (
        ShowProducts(index)
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInputContainer: {
    height: 50,
    backgroundColor: appTheme.COLORS.white,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#9799A0",
    borderWidth: 0,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 20,
  },
});
