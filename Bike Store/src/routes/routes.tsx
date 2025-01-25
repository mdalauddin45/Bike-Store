import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { adminPaths } from './admin.routes';
import { routeGenerator } from '../utils/routesGenerator';
import { userPaths } from './user.routes';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import ChangePassword from '../pages/ChangePassword';
import Product from '../pages/user/bike/Product';
import Checkout from '../pages/user/bike/Checkout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      { 
        path: "products/:productId", 
        element: <Product />,
      },
      {
        path: "order/:productId",  
        element: <Checkout />,
      },
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute role="user">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(userPaths),
    
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/change-password',
    element: <ChangePassword />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;