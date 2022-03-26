import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";

import { getDistributorProducts } from "../../redux/actions/productActions";
import { LottieLoader } from "../../components/Loaders/LottieLoader";
import { DistributorFlow } from "../../components/home/DistributorFlow";

const DistributorScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();

  const { distributor } = route.params;

  const productsState = useSelector((state) => state.product);

  const { products, loading } = productsState;

  //gets inventory
  useEffect(() => {
    dispatch(getDistributorProducts(distributor?.DistCode));
  }, []);

  if (loading) return <LottieLoader />;

  return <DistributorFlow products={products} distributor={distributor} />;
};

export default DistributorScreen;
