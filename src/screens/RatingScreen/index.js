import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";

import { BottomSheet } from "react-native-btr";
import { icons } from "../../constants";
import axios from "axios";

import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";
import RatingProduct from "../../components/orders/RatingProduct";
import OrderCompleteSheet from "../../components/orders/OrderCompleteSheet";
import { Routes } from "../../navigation/Routes";

import { Rating, AirbnbRating } from "react-native-ratings";
import { updateOrderStatus } from "../../redux/actions/orderActions";
import { ORDER_BASE_URL } from "../../confg";

const Ratings = () => {
  const navigation = useNavigation();
  const [comment, setComment] = useState(null);
  const [ratingValue, setRatingValue] = useState(null);

  const dispatch = useDispatch();
  const route = useRoute();

  const { productsToOder, theDistributor, item } = route.params;

  const { orderId } = item;

  const productsState = useSelector((state) => state.product);

  const customerState = useSelector((state) => state.customer);

  const { customerDetails } = customerState;

  const { allCompanyProducts } = productsState;

  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const getTotalPrice = () => {
    return item?.orderItems.reduce(
      (accumulator, order) =>
        accumulator + productDetails(order?.productId)?.price * order?.quantity,
      0
    );
  };

  const productDetails = (productId) => {
    const x = allCompanyProducts?.filter(
      (product) => product?.productId === productId.toString()
    )[0];
    return x;
  };

  const ratingCompleted = (rating) => {
    setRatingValue(rating);
    console.log(ratingValue);
  };

  const rateDistributor = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        // stars: ratingValue,
        comment,
        companyId: theDistributor?.DIST_Code,
        reviewerId: customerDetails?.SF_Code,
      };
      const { data } = await axios.patch(
        `https://dmsapim.azure-api.net/company/company/rate-distributor/${theDistributor?.id}`,
        body,
        config
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        flex: 1,
      }}
    >
      <View showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <Text
              style={{
                fontFamily: "Gilroy-Medium",
                marginBottom: 10,
                fontSize: 17,
              }}
            >
              Rate your experience for order {item?.orderId}
            </Text>

            <Text
              style={{
                fontFamily: "Gilroy-Medium",
                fontSize: 17,
              }}
            >
              With {theDistributor?.company_name}
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <AirbnbRating
              onFinishRating={ratingCompleted}
              count={5}
              reviews={["Very Poor", "Poor", "Good", "Very Good", "Excellent"]}
              defaultRating={0}
              size={30}
            />
          </View>

          <View
            style={{
              marginTop: 40,
              paddingHorizontal: 20,
            }}
          >
            <TextInput
              placeholder="Write about your experience"
              onChangeText={(textValue) => setComment(textValue)}
              style={{
                borderWidth: 0,
                borderBottomWidth: 1,
                borderBottomColor: appTheme.COLORS.borderGRey1,
                fontFamily: "Gilroy-Medium",
                fontSize: 15,
                paddingBottom: 5,
              }}
            />
          </View>

          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: 20,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                rateDistributor();
                dispatch(updateOrderStatus("Delivered", orderId));
                toggle();
              }}
              style={{
                backgroundColor: appTheme.COLORS.mainRed,
                height: 40,
                width: 130,
                justifyContent: "center",
                borderRadius: 5,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: appTheme.COLORS.white,
                  fontSize: 16,
                  fontFamily: "Gilroy-Bold",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={{
              backgroundColor: appTheme.COLORS.white,
              marginTop: 25,
              marginBottom: 20,
            }}
            data={productsToOder}
            showsVerticalScrollIndicator={false}
            listKey={(item) => item.id.toString()}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({ item }) => (
              <RatingProduct item={item} productDetails={productDetails} />
            )}
            ListHeaderComponent={() => (
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: appTheme.COLORS.Grey,
                  paddingVertical: 20,
                  paddingLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: appTheme.COLORS.mainTextGray,
                  }}
                >
                  Order Summary
                </Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View
                style={{
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 20,
                    paddingTop: 20,
                    paddingRight: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      marginLeft: 60,
                      fontFamily: "Gilroy-Light",
                    }}
                  >
                    Total amount
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy-Bold",
                      color: appTheme.COLORS.mainBrown,
                    }}
                  >
                    {isNaN(getTotalPrice())
                      ? null
                      : `\u20A6${formatPrice(getTotalPrice())}`}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>

      <OrderCompleteSheet
        productsToOder={productsToOder}
        theDistributor={theDistributor}
        item={item}
        visible={visible}
        toggle={toggle}
      />
    </View>
  );
};

export default Ratings;

const styles = StyleSheet.create({
  productIncreaseDecreaseContainer: {
    backgroundColor: appTheme.COLORS.boxGray,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 5,
  },
  IncreaseText: {
    color: appTheme.COLORS.mainRed,
    fontWeight: "bold",
    fontSize: 15,
  },
});
