import React, { useEffect, useState } from "react";
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
import { useForm, Controller } from "react-hook-form";

import { BottomSheet } from "react-native-btr";
import { icons } from "../../constants";
import axios from "axios";

import appTheme from "../../constants/theme";
import { formatPrice } from "../../utils/formatPrice";
import RatingProduct from "../../components/orders/RatingProduct";
import OrderCompleteSheet from "../../components/orders/OrderCompleteSheet";
import { Routes } from "../../navigation/Routes";

// import { Rating, AirbnbRating } from "react-native-ratings";
import { AirbnbRating } from "react-native-elements";
// import { updateOrderStatus } from "../../redux/actions/orderActions";
import { CUSTOMER_BASE_URL, ORDER_BASE_URL } from "../../confg";
import { fetchAllProductsIntheCompany } from "../../redux/actions/productActions";
import { ActivityIndicator } from "react-native-paper";

const Ratings = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const [ratingValue, setRatingValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const dispatch = useDispatch();
  const route = useRoute();

  const { productsToOder, theDistributor, item } = route.params;

  const { orderId } = item;

  const productsState = useSelector((state) => state.product);

  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  const { allCompanyProducts } = productsState;

  useEffect(() => {
    dispatch(fetchAllProductsIntheCompany());
  }, []);

  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const productDetails = (productId) => {
    const x = allCompanyProducts?.filter(
      (product) => product?.productId === productId.toString()
    )[0];
    return x;
  };

  const ratingCompleted = (rating) => {
    setRatingValue(rating);
  };

  const casesSold = productsToOder?.reduce(
    (accumulator, item) =>
      item?.buyingQuantity
        ? accumulator + item?.buyingQuantity
        : accumulator + item?.quantity,
    0
  );

  const updateCasesSold = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const payload = {
        BB_Code: theDistributor?.BB_Code,
        dreamPoint: casesSold,
        country: theDistributor?.country,
      };

      console.log(payload);

      const { data } = await axios.patch(
        `${CUSTOMER_BASE_URL}/mydream/update-points`,
        payload,
        config
      );

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (status) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        status,
      };

      setUpdating(true);

      const { data } = await axios.patch(
        `${ORDER_BASE_URL}/UpdateOrder/UpdateStatus/${orderId}`,
        body,
        config
      );

      const { isSuccess } = data;

      if (isSuccess) {
        updateCasesSold();
        setUpdating(false);
        toggle();
      } else {
        setUpdating(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rateDistributor = async (data) => {
    const { comment } = data;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        stars: ratingValue,
        comment,
        outletCode: theDistributor?.BB_Code,
        raterCode: customer?.BB_Code,
        orderId: orderId,
        country: customer?.country,
      };

      setLoading(true);
      const { data } = await axios.patch(
        `${CUSTOMER_BASE_URL}/customer/rate-customer`,
        body,
        config
      );

      const { success } = data;

      if (success) {
        setLoading(false);
        updateOrderStatus("Delivered");
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for when the order is just placed
  const totalAmount = productsToOder?.reduce(
    (accumulator, item) =>
      accumulator + item?.sellerPrice * item?.buyingQuantity,
    0
  );

  return (
    <View
      style={{
        backgroundColor: appTheme.COLORS.white,
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
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
              With {theDistributor?.sellerName}
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
              defaultRating={1}
              size={30}
            />
          </View>

          <View
            style={{
              marginTop: 40,
              paddingHorizontal: 20,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Write about your experience"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  style={{
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: appTheme.COLORS.borderGRey1,
                    fontFamily: "Gilroy-Medium",
                    fontSize: 15,
                    paddingBottom: 5,
                  }}
                />
              )}
              name="comment"
            />
            {errors.comment && (
              <Text
                style={{
                  color: appTheme.COLORS.mainRed,
                }}
              >
                comment is required.
              </Text>
            )}
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
              onPress={handleSubmit(rateDistributor)}
              style={{
                backgroundColor: appTheme.COLORS.mainRed,
                height: 45,
                width: 140,
                justifyContent: "center",
                borderRadius: 5,
                marginTop: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <ActivityIndicator
                  color={
                    Platform.OS === "android"
                      ? appTheme.COLORS.white
                      : undefined
                  }
                  animating={loading}
                  size="small"
                />
              ) : (
                <Text
                  style={{
                    color: appTheme.COLORS.white,
                    fontSize: 16,
                    fontFamily: "Gilroy-Bold",
                  }}
                >
                  Submit
                </Text>
              )}
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
                    {totalAmount
                      ? `\u20A6${formatPrice(totalAmount)}`
                      : `\u20A6${formatPrice(item?.totalPrice)}`}
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
