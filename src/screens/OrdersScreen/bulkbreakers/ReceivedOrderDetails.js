import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import moment from "moment";

import appTheme from "../../../constants/theme";
import { icons } from "../../../constants";
import { Header } from "../../../components/orders/Header";
import Product from "../../../components/orders/Product";
import OrderTimeLineReceived from "../../../components/orders/bulkbreakers/OrderTimeLineReceived";
import OrderFooter from "../../../components/orders/OrderFooter";
import CustomerDetails from "../../../components/orders/CustomerDetails";
import ReOrder from "../../../components/orders/ReOrder";
import { formatPrice } from "../../../utils/formatPrice";
import { fetchAllProductsIntheCompany } from "../../../redux/actions/productActions";
import { ORDER_BASE_URL } from "../../../confg";
import CountDownTimer from "../../../components/orders/CountDownTimer";
import DeliveryMethod from "../../../components/orders/DeliveryMethod";
import ReceivedOrderFooter from "../../../components/orders/bulkbreakers/ReceivedOrderFooter";
import MessageModal from "../bulkbreakers/Modal";
import { updateProductStatus } from "../../../redux/actions/customerActions";

const ReceivedOrderDetails = () => {
  const route = useRoute();
  const [theOrder, setTheOrder] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [loadingSingleOrder, setLoadingSingleOrder] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showModal, setShowMdal] = useState(false);
  const [message, setMessage] = useState(null);

  const { productsToOder, theDistributor, item } = route.params;

  const { orderId } = item;

  const [singleOrder, setSingleOrder] = useState(item);

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
      setLoading(true);

      const {
        data: { order },
      } = await axios.patch(
        `${ORDER_BASE_URL}/UpdateOrder/UpdateStatus/${orderId}`,
        body,
        config
      );
      // setTheOrder(order?.order[0]);
      setSingleOrder(order[0]);
      setLoading(false);
      setShowMdal(true);
      setMessage(status);
      setTimeout(() => {
        setShowMdal(false);
      }, 2000);
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
      <Header single orderId={orderId} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 40,
          }}
        >
          {/* <CountDownTimer hoursMinSecs={hoursMinSecs} /> */}
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
                : singleOrder[0]?.orderStatus[0].status}
            </Text>
          </View>
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

        {/* customer details */}
        <CustomerDetails distributor={theDistributor} item={item} />

        {/* delivery method */}

        <DeliveryMethod distributor={theDistributor} />

        {/* order TimeLine */}
        <OrderTimeLineReceived
          item={item}
          singleOrder={singleOrder}
          theDistributor={theDistributor}
          productsToOder={productsToOder}
          theOrder={theOrder}
        />

        {/* footer */}

        {/* <OrderFooter distributor={theDistributor} /> */}

        {/* reject/accept order */}

        {/* <ReceivedOrderFooter orderId={orderId} /> */}

        <MessageModal showModal={showModal} message={message} />

        <ReceivedOrderFooter
          updateOrderStatus={updateOrderStatus}
          singleOrder={singleOrder}
        />
      </ScrollView>
    </View>
  );
};

export default ReceivedOrderDetails;
