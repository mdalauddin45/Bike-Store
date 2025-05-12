import Products from "../pages/user/bike/Products";
import UserDashboard from "../pages/user/UserDashboard";
import Order from "../pages/user/bike/Order";

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
  {
    name: "Orders",
    path: "orders",
    element: <Order />,
  },
  
  
];
