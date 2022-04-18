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
import { getDistributorProducts } from "../../../redux/actions/productActions";
import { ORDER_BASE_URL } from "../../../confg";
import ProductsSummary from "../../../components/orders/ProductsSummary";
import OrderDetailsHeader from "../../../components/orders/pocs/OrderDetailsHeader";
import appTheme from "../../../constants/theme";
import { icons } from "../../../constants";
import { Routes } from "../../../navigation/Routes";
import { getMyInventory } from "../../../redux/actions/customerActions";

const OrderDetails = () => {
  const route = useRoute();
  const [singleOrder, setSingleOrder] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const navigation = useNavigation();

  const { productsToOder, bulkbreaker: theDistributor, item } = route.params;
  const customerState = useSelector((state) => state.customer);
  const productsState = useSelector((state) => state.product);

  const { products } = productsState;
  // console.log(products, "products");

  const { customer, myInventory } = customerState;

  // console.log(myInventory, "myInventory");

  const { orderId } = item;

  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const dispatch = useDispatch();

  // console.log(theDistributor, "new");

  const { customerType } = theDistributor;

  useEffect(() => {
    if (customerType === "Distributor") {
      dispatch(getDistributorProducts(theDistributor?.DistCode));
    } else {
      dispatch(getMyInventory(theDistributor?.id));
    }
  }, []);

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

      setSingleOrder(order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const action = setInterval(() => {
      getSingleOrder(orderId);
      console.log("checking for status...");
    }, 2000);
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

      const {
        data: { order },
      } = await axios.patch(
        `${ORDER_BASE_URL}/UpdateOrder/UpdateStatus/${orderId}`,
        body,
        config
      );
      setSingleOrder(order[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const productDetails = (productId) => {
    const x = myInventory?.filter(
      (item) => item?.product?.productId === productId.toString()
    )[0];
    return x;
  };

  // const getTotalPrice = () => {
  //   return item?.orderItems.reduce(
  //     (accumulator, order) =>
  //       accumulator + productDetails(order?.productId)?.price * order?.quantity,
  //     0
  //   );
  // };

  const getTotalPrice = () => {
    return item?.orderItems.reduce(
      (accumulator, item) => accumulator + parseInt(item?.price),
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
                onPress={() => updateOrderStatus("Canceled")}
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
