import OrdersRevenue from "../pages/user/bike/OrdersRevenue";
import Product from "../pages/user/bike/Product";
import Products from "../pages/user/bike/Products";
import UserDashboard from "../pages/user/UserDashboard";

export const userPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <UserDashboard />,
  },
  {
    name: 'Products',
    path: 'products',
    element: <Products />,
  },
  {
    name: 'Product',
    path: 'product',
    element: <Product />,
  },
  {
    name: 'Order Revenue',
    path: 'orders/revenue',
    element: <OrdersRevenue />,
  },
];