import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
const router = express.Router();


router.patch('/users/:id/block', AdminControllers.updateUser);
router.delete('/bikes/:id',auth("admin"), AdminControllers.deleteBike);
router.get('/users', AdminControllers.getAllUser);
router.get('/all-product', AdminControllers.getAllBike);

export const adminRoutes = router;