import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateAdmin from '../pages/admin/userManagement/CreateAdmin';
import CreateUser from '../pages/admin/userManagement/CreateUser';
import UserData from '../pages/admin/userManagement/UserData';
import UserDetails from '../pages/admin/userManagement/UserDetails';

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Create User',
        path: 'create-user',
        element: <CreateUser />,
      },
      {
        name: 'All Users',
        path: 'students-data',
        element: <UserData />,
      },
      {
        path: 'user-data/:userId',
        element: <UserDetails />,
      },
      {
        name: 'Create Admin',
        path: 'create-admin',
        element: <CreateAdmin />,
      },
    ],
  }
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