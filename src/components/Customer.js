import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { CheckBox, Icon } from "react-native-elements";

import { icons } from "../constants";
import appTheme from "../constants/theme";

const Customer = ({ item }) => {
  const [check1, setCheck1] = useState(false);

  return (
    // <TouchableOpacity
    //   onPress={() => console.log(item)}
    //   style={{
    //     marginTop: 30,
    //     marginBottom: 40,
    //   }}
    // >
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       alignItems: "center",
    //       paddingLeft: 20,
    //     }}
    //   >
    //     <Image
    //       style={{
    //         width: 20,
    //         height: 20,
    //       }}
    //       source={icons.shopIcon}
    //     />
    //     <Text
    //       style={{
    //         fontFamily: "Gilroy-Bold",
    //         fontSize: 15,
    //         marginLeft: 18,
    //         textTransform: "uppercase",
    //       }}
    //     >
    //       {item?.CUST_Name}
    //     </Text>

    //     <View
    //       style={{
    //         position: "absolute",
    //         right: 2,
    //       }}
    //     >
    //       <CheckBox
    //         center
    //         checkedIcon={
    //           <Icon
    //             name="radio-button-checked"
    //             type="material"
    //             color={appTheme.COLORS.mainYellow}
    //             size={25}
    //           />
    //         }
    //         uncheckedIcon={
    //           <Icon
    //             name="radio-button-unchecked"
    //             type="material"
    //             color="grey"
    //             size={25}
    //           />
    //         }
    //         checked={check1}
    //         onPress={() => setCheck1(!check1)}
    //       />
    //     </View>
    //   </View>

    //   <View
    //     style={{
    //       borderWidth: 0,
    //       borderBottomWidth: 1,
    //       borderBottomColor: appTheme.COLORS.borderGRey1,
    //       paddingLeft: 60,
    //       marginTop: 10,
    //       paddingBottom: 5,
    //     }}
    //   >
    //     <Text
    //       style={{
    //         fontFamily: "Gilroy-Medium",
    //         color: appTheme.COLORS.mainTextGray,
    //       }}
    //     >
    //       {item?.SF_Code}
    //     </Text>
    //   </View>
    // </TouchableOpacity>

    <View>
      <Text>customer</Text>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({});
