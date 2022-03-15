import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import moment from "moment";
import { Slide, Box } from "native-base";
import { icons } from "../../../constants";

import appTheme from "../../../constants/theme";
import { Header } from "../../../components/orders/bulkbreakers/HeaderPlacedOrder";
import Product from "../../../components/orders/Product";
import OrderTimeLinePlaced from "../../../components/orders/bulkbreakers/OrderTimeLinePlaced";
import OrderTimeLinePickup from "../../../components/orders/bulkbreakers/OrderTimeLinePickup";
import PlacedOrderFooter from "../../../components/orders/bulkbreakers/PlacedOrderFooter";
import DeliveryMethodPlaced from "../../../components/orders/bulkbreakers/DeliveyMethodPlaced";
import ReOrder from "../../../components/orders/pocs/ReOrder";
import { formatPrice } from "../../../utils/formatPrice";
import { fetchAllProductsIntheCompany } from "../../../redux/actions/productActions";
import { ORDER_BASE_URL } from "../../../confg";
import { Routes } from "../../../navigation/Routes";

const PlacedOrderDetails = () => {
  const route = useRoute();
  const [isOpen, setIsOpen] = React.useState(false);

  const navigation = useNavigation();
  const [singleOrder, setSingleOrder] = useState([]);
  const [loadingSingleOrder, setLoadingSingleOrder] = useState(false);

  const { productsToOder, theDistributor, item } = route.params;

  const { orderId } = item;

  const totalAmount = productsToOder?.reduce(
    (accumulator, item) => accumulator + item?.price * item?.buyingQuantity,
    0
  );

  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const productsState = useSelector((state) => state.product);

  const { allCompanyProducts } = productsState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProductsIntheCompany());
  }, []);
  useEffect(() => {
    let componentMounted = true;

    const action = setInterval(() => {
      const getSingleOrder = async (orderId) => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          const {
            data: { order },
          } = await axios.get(
            `${ORDER_BASE_URL}/GetOrder/GetOrderByOrderId/${orderId}`,
            config
          );

          if (componentMounted) {
            setSingleOrder(order);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getSingleOrder(orderId);
      console.log("checking for status...");
    }, 10000);
    return () => {
      clearInterval(action);
      componentMounted = false;
    };
  }, [singleOrder]);

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

      const { data } = await axios.patch(
        `${ORDER_BASE_URL}/UpdateOrder/UpdateStatus/${orderId}`,
        body,
        config
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const productDetails = (productId) => {
    const x = allCompanyProducts?.filter(
      (product) => product?.productId === productId.toString()
    )[0];
    return x;
  };

  const getTotalPrice = () => {
    return item?.orderItems.reduce(
      (accumulator, order) =>
        accumulator + productDetails(order?.productId)?.price * order?.quantity,
      0
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header
        single
        orderId={orderId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        singleOrder
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 20,
          }}
        >
          {/* <OrderCountDownTimer
            placed={singleOrder[0]?.orderStatus[0]?.datePlaced}
          /> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: appTheme.COLORS.black,
                fontFamily: "Gilroy-Light",
              }}
            >
              {singleOrder !== null &&
                singleOrder[0]?.orderStatus[0]?.datePlaced !== null &&
                moment(singleOrder[0]?.orderStatus[0]?.datePlaced).format(
                  "MMM Do, YYYY"
                )}
            </Text>
            <Text
              style={{
                fontFamily: "Gilroy-Light",
                marginLeft: 5,
              }}
            >
              {singleOrder[0]?.orderStatus[0]?.timePlaced !== undefined
                ? `at ${singleOrder[0]?.orderStatus[0]?.timePlaced}`
                : null}
            </Text>
          </View>

          {!singleOrder[0]?.orderStatus[0] ? (
            <ActivityIndicator
              color={
                Platform.OS === "android" ? appTheme.COLORS.mainRed : undefined
              }
              animating={true}
              size="small"
            />
          ) : (
            <View
              style={{
                borderRadius: 20,
                width: 90,
                height: 25,

                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  singleOrder[0]?.orderStatus[0].status === "Placed"
                    ? appTheme.COLORS.borderGRey1
                    : singleOrder[0]?.orderStatus[0].status === "Assigned"
                    ? appTheme.COLORS.mainYellow
                    : singleOrder[0]?.orderStatus[0].status === "Accepted"
                    ? appTheme.COLORS.mainBlue
                    : singleOrder[0].orderStatus[0].status === "Completed"
                    ? appTheme.COLORS.lightBlue
                    : singleOrder[0].orderStatus[0].status === "Rejected"
                    ? appTheme.COLORS.mainRed
                    : appTheme.COLORS.mainGreen,
              }}
            >
              <Text
                style={{
                  fontFamily: "Gilroy-Medium",
                  fontSize: 13,
                  color:
                    singleOrder[0]?.orderStatus[0].status === "Placed"
                      ? appTheme.COLORS.black
                      : singleOrder[0]?.orderStatus[0].status === "Accepted"
                      ? appTheme.COLORS.white
                      : singleOrder[0]?.orderStatus[0].status === "Completed"
                      ? appTheme.COLORS.white
                      : appTheme.COLORS.white,
                }}
              >
                {singleOrder[0]?.orderStatus[0].status === "Assigned"
                  ? "Confirmed"
                  : singleOrder[0]?.orderStatus[0].status === "Accepted"
                  ? "Dispatched"
                  : singleOrder[0]?.orderStatus[0].status === "Completed"
                  ? "Delivered"
                  : singleOrder[0]?.orderStatus[0].status === "Delivered"
                  ? "Completed"
                  : singleOrder[0]?.orderStatus[0].status === "Rejected"
                  ? "Cancelled"
                  : singleOrder[0]?.orderStatus[0].status}
              </Text>
            </View>
          )}
        </View>

        <FlatList
          style={{
            backgroundColor: appTheme.COLORS.white,
            marginTop: 15,
            elevation: appTheme.STYLES.elevation,
          }}
          data={productsToOder}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, id) => id.toString()}
          listKey={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Product
              item={item}
              productDetails={productDetails}
              singleOrder={singleOrder}
            />
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
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
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
                    fontSize: 15,
                    marginLeft: 60,
                    fontFamily: "Gilroy-Light",
                  }}
                >
                  Total amount
                </Text>

                <Text
                  style={{
                    fontSize: 16,
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

        {/* order TimeLine */}

        {singleOrder[0]?.deliveryType === "Pick-Up" ? (
          <OrderTimeLinePickup
            item={item}
            singleOrder={singleOrder}
            theDistributor={theDistributor}
            productsToOder={productsToOder}
          />
        ) : (
          <OrderTimeLinePlaced
            item={item}
            singleOrder={singleOrder}
            theDistributor={theDistributor}
            productsToOder={productsToOder}
          />
        )}

        {/* delivery method */}

        <DeliveryMethodPlaced deliveryType={singleOrder[0]?.deliveryType} />

        {/* footer */}

        <PlacedOrderFooter distributor={theDistributor} />

        {/* Remodal sheet */}

        <ReOrder
          visible={visible}
          toggle={toggle}
          productsToOder={productsToOder}
          productDetails={productDetails}
          singleOrder={singleOrder}
          getTotalPrice={getTotalPrice}
          distributor={theDistributor}
          reorder
        />
        {/* Reorder sheet */}

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
              paddingVertical: 15,
              paddingLeft: 20,
              elevation: 50,
            }}
          >
            <View>
              <Pressable
                onPress={() => navigation.navigate(Routes.HOME_SCREEN)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <Image
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  source={icons.home}
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
              <Pressable
                onPress={() => {
                  navigation.navigate(Routes.PRODUCTS_SCREEN);
                  setIsOpen(!isOpen);
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <Image source={icons.productIcon2} />

                <Text
                  style={{
                    marginLeft: 10,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  View my Products
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  updateOrderStatus("Rejected");
                  setIsOpen(!isOpen);
                }}
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
                  source={icons.rejectedIcon}
                />

                <Text
                  style={{
                    marginLeft: 10,
                    fontFamily: "Gilroy-Medium",
                  }}
                >
                  Cancell order
                </Text>
              </Pressable>
            </View>
          </Box>
        </Slide>
      </ScrollView>
    </View>
  );
};

export default PlacedOrderDetails;
