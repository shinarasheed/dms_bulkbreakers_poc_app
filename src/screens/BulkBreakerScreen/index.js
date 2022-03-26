import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRoute } from "@react-navigation/native";

import { View, Text } from "react-native";
import {
  getDistributorProducts,
  getProducts,
} from "../../redux/actions/productActions";

import { LottieLoader } from "../../components/Loaders/LottieLoader";
import { BulkBreakerFlow } from "../../components/home/BulkBreakerFlow";
import { DistributorFlow } from "../../components/home/DistributorFlow";

const BulkbreakerScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();

  const { bulkbreaker } = route.params;

  const productsState = useSelector((state) => state.product);

  const { products, loading } = productsState;

  const { customerType, DistCode, id } = bulkbreaker;

  useEffect(() => {
    if (customerType === "Distributor") {
      dispatch(getDistributorProducts(DistCode));
    } else {
      dispatch(getProducts(id));
    }
  }, []);

  if (loading) return <LottieLoader />;

  return (
    <>
      {customerType === "Distributor" ? (
        <DistributorFlow products={products} distributor={bulkbreaker} />
      ) : (
        <BulkBreakerFlow products={products} bulkbreaker={bulkbreaker} />
      )}
    </>
  );
};

export default BulkbreakerScreen;
