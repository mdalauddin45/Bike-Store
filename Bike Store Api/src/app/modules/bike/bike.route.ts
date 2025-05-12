import express from 'express';
import { BikeControllers } from './bike.controller';
const router = express.Router();

router.get('', BikeControllers.getAllBikes);
router.get('/:productId', BikeControllers.getSingleBike);
router.post('', BikeControllers.createBike);
router.put('/:productId', BikeControllers.updateBike);
router.delete('/:productId', BikeControllers.deleteBike);

export const bikeRoutes = router;