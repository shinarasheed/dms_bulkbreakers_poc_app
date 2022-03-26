import React from "react";

import { useSelector } from "react-redux";

import Distributors from "../../components/home/Distributors";
import Bulkbreakers from "../../components/home/Bulkbreakers";
import Bdrs from "../../components/home/Bdrs";

const HomeScreen = () => {
  const customerState = useSelector((state) => state.customer);

  const { customer } = customerState;

  return (
    <>
      {customer?.CUST_Type.toLowerCase() === "bulkbreaker" ? (
        <Distributors />
      ) : (
        <Bulkbreakers />
        // <Bdrs />
      )}
    </>
  );
};

export default HomeScreen;
