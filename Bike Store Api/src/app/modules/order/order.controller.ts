import catchAsync from '../../utils/catchAsync';
import { IOrder } from './order.interface';
import { orderService } from './order.service';
import { Request, Response } from 'express';

const createOrder = async (req: Request<{}, {}, IOrder>, res: Response) => {
  try {
    const user = req.user;

    // console.log("this is ",req.body);
    const order = await orderService.createOrder(user, req.body, req.ip!);
console.log("this is ",order);
    res.status(200).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};
const getOrders = catchAsync(async (req, res) => {
  try {
    const order = await orderService.getOrders();
    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
});

const verifyPayment = catchAsync(async (req, res) => {
  try {
    const order = await orderService.verifyPayment(
      req.query.order_id as string,
    );
    res.status(200).json({
      success: true,
      message: 'Order Verify Payment successfully',
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
});

export const orderController = { createOrder, verifyPayment, getOrders };
