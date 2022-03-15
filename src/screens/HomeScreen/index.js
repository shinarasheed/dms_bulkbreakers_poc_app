import React from "react";

import { useSelector } from "react-redux";

import Distributors from "../../components/home/Distributors.js";
import Bulkbreakers from "../../components/home/Bulkbreakers.js";

const HomeScreen = () => {
  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  return (
    <>
      {customer?.CUST_Type.toLowerCase() === "bulkbreaker" ? (
        <Distributors />
      ) : (
        <Bulkbreakers />
      )}
    </>
  );
};

export default HomeScreen;
