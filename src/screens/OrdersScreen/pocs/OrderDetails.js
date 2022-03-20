import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { Image, View, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import { Slide, Box } from "native-base";

import { Header } from "../../../components/orders/Header";
import OrderTimeLine from "../../../components/orders/pocs/OrderTimeLine";
import OrderFooter from "../../../components/orders/pocs/OrderFooter";
import ReOrder from "../../../components/orders/pocs/ReOrder";
import { fetchAllProductsIntheCompany } from "../../../redux/actions/productActions";
import { ORDER_BASE_URL } from "../../../confg";
import ProductsSummary from "../../../components/orders/ProductsSummary";
import OrderDetailsHeader from "../../../components/orders/pocs/OrderDetailsHeader";
import appTheme from "../../../constants/theme";
import { icons } from "../../../constants";
import { Routes } from "../../../navigation/Routes";

const OrderDetails = () => {
  const route = useRoute();
  const [singleOrder, setSingleOrder] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const navigation = useNavigation();

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

  const getSingleOrder = async (orderId) => {
    try {
      // setLoadingSingleOrder(true);
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

      setSingleOrder(order);
      // setLoadingSingleOrder(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const action = setInterval(() => {
      getSingleOrder(orderId);
      console.log("checking for status...");
    }, 1000);
    return () => {
      clearInterval(action);
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
      }, 1000);
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
            paddingTop: 40,
          }}
        >
          {/* <CountDownTimer hoursMinSecs={hoursMinSecs} /> */}
        </View>

        <OrderDetailsHeader singleOrder={singleOrder} />

        {/* product summary */}
        <ProductsSummary
          getTotalPrice={getTotalPrice}
          productsToOder={productsToOder}
          productDetails={productDetails}
          singleOrder={singleOrder}
        />

        {/* order TimeLine */}
        <OrderTimeLine
          item={item}
          singleOrder={singleOrder}
          productsToOder={productsToOder}
          theDistributor={theDistributor}
        />

        {/* footer */}

        <OrderFooter item={item} />

        {/* Reorder sheet */}

        {/* <ReOrder
          visible={visible}
          toggle={toggle}
          productsToOder={productsToOder}
          productDetails={productDetails}
          singleOrder={singleOrder}
          getTotalPrice={getTotalPrice}
          bulkbreaker={theBulkbreaker}
          reorder
        /> */}
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
              paddingLeft: 20,
              elevation: 50,
              paddingTop: 5,
              paddingBottom: 15,
            }}
          >
            <View>
              <Pressable
                onPress={() => navigation.navigate(Routes.HOME_SCREEN)}
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
                // onPress={() => updateOrderStatus("Cancelled")}
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
                  Cancel Order
                </Text>
              </Pressable>
            </View>
          </Box>
        </Slide>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;
