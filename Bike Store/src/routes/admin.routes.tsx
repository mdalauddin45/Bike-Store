import AdminDashboard from '../pages/admin/AdminDashboard';
import { AllProduct } from '../pages/admin/userManagement/AllProduct';
import { UserData } from '../pages/admin/userManagement/UserData';

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'All User',
    path: 'users',
    element: <UserData />,
  },
  {
    path: 'users/:id/block',
    element: <UserData />,
  },
  {
    name:'All Product',
    path: 'all-product',
    element: <AllProduct />,
  },
];


// export const adminPaths = [
//   {
//     path: 'dashboard',
//     element: <AdminDashboard />,
//   },
//   {
//     path: 'create-student',
//     element: <CreateStudent />,
//   },
//   {
//     path: 'create-admin',
//     element: <CreateAdmin />,
//   },
//   {
//     path: 'create-faculty',
//     element: <CreateFaculty />,
//   },
// ];