import prisma from "../prismaClient";
import { NextFunction, Request, Response } from "express";
import ApiError from "./../utils/ApiError";
import httpStatus from "http-status";
import logger from "../config/winston";

export const updateWishlist = async (req: Request, res: Response, next: NextFunction) => {
   try {
       const {id} = req.params
       const wishlistArr = req.body
       const response = await prisma.users.update({
          where: {
            userId: id
          },
          data: {
            wishlist: wishlistArr || []
          }
       })
       res.status(200).json({response})
       logger.info('check the updating wishlist')
   } catch (error) {
       next(new ApiError(error, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.REQUESTED_RANGE_NOT_SATISFIABLE]))
       logger.info('check the error updating wishlist')
    }
}

export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const response  = await prisma.users.findUnique({
             where: {
                userId: id
             },
             select: {
                wishlist: true
             }
        })
        res.status(200).json({response})
        logger.info('check for getting wishlist')
    } catch (error) {
        next(new ApiError(error, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
        logger.info('check for error in getting wishlist', error)
        
    }
}