import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { AdminServices } from "./admin.service";
import User from "../user/user.model";
import { BikeServices } from "../bike/bike.service";
import { Request, Response } from 'express';

const updateUser = catchAsync(async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);

      if (!user) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          success: false,
          message: "User not found",
          error: { details: "The provided user ID does not exist." },
        });
      }
  
      const result = await AdminServices.updateUserInDB(id, {isBlocked: true});
      sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "User blocked successfully",
      });
    } catch (error: unknown) {
      const typedError = error as Error;
      sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Validation error",
        error: {
          details: typedError.message || "Invalid Id",
          stack:
            process.env.NODE_ENV !== "production" ? typedError.stack : undefined,
        },
      });
    }
  });
  
  const deleteBike = catchAsync(async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await User.findById(id);

      if (!blog) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          success: false,
          message: "Blog not found",
          error: { details: "The provided blog ID does not exist." },
        });
      }
      const result = await BikeServices.deleteBikeFromDB(id);
      sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: "Blog Delete successfully",
        data: result,
      });
    } catch (error: unknown) {
      const typedError = error as Error;
      sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Validation error",
        error: {
          details: typedError.message || "Invalid blog data",
          stack:
            process.env.NODE_ENV !== "production" ? typedError.stack : undefined,
        },
      });
    }
  });
  const getAllUser = async (req: Request, res: Response) => {
    try {
      const result = await AdminServices.getAllUserFromDB();
      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err,
      });
    }
  };
  export const AdminControllers = {
    updateUser,
    deleteBike,
    getAllUser
  }