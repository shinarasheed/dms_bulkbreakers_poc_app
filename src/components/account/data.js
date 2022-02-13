import { Routes } from "../../navigation/Routes";

export const SECTIONS = [
  {
    id: 1,
    icon: require("../../../assets/icons/ProductsAccount.png"),
    title: "Products",
    route: Routes.RECEIVED_ORDERS,
    description: "Manage the products you sell",
  },
  {
    id: 2,
    icon: require("../../../assets/icons/Profile.png"),
    title: "Profile",
    route: Routes.RECEIVED_ORDERS,
    description: "View your account details",
  },
  {
    id: 3,
    icon: require("../../../assets/icons/Support.png"),
    title: "Support",
    route: Routes.RECEIVED_ORDERS,
    description: "For help and enquiries",
  },
  {
    id: 4,
    icon: require("../../../assets/icons/Legal.png"),
    title: "Legal",
    route: Routes.RECEIVED_ORDERS,
    description: "Terms of use and policies",
  },
];
