import prisma from "../prismaClient";
import { NextFunction, Request, Response } from "express";
import ApiError from "./../utils/ApiError";
import httpStatus from "http-status";
import logger from "../config/winston";

export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
      const addressData = req.body?.address as any[]
      const id = req.params.id
      try {
         const response = await prisma.user.update({
            where: {
                userId: id
            },
            data: {
                address: addressData
            }
         })
         res.status(200).json({response})
      } catch (error) {
         next(new ApiError('Error in updating the current address field', httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
      }
}

export const getAddresses = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
        const response = await prisma.user.findUnique({
            where: {
                userId:id
            }
        })
        res.status(200).json({response: response.address})
    } catch (error) {
       next(new ApiError('Error in updating the current address field', httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
}