import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { adminRoutes } from "../modules/admin/admin.route";
import { bikeRoutes } from "../modules/bike/bike.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/products",
    route: bikeRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
