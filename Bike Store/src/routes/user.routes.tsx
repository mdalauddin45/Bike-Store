import { Children } from "react";
import Checkout from "../pages/user/bike/Checkout";
import Product from "../pages/user/bike/Product";
import Products from "../pages/user/bike/Products";
import UserDashboard from "../pages/user/UserDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Products",
    path: "products",
    element: <Products />,
  },
  
  
];
