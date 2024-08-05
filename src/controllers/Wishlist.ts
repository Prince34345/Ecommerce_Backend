import prisma from "../prismaClient";
import { NextFunction, Request, Response } from "express";
import ApiError from "./../utils/ApiError";
import httpStatus from "http-status";
import logger from "../config/winston";

export const updateWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        logger.info('wishlist id', id)
        const wishlist = req.body?.wishlist as any[];
        const response = await prisma.user.update({
            where: {
                userId: id
            },
            data: {
               wishlist: wishlist
            },
        })
        res.status(200).json({ response: response.wishlist })
        logger.info('check the updating wishlist')
    } catch (error) {
        next(new ApiError(error, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
        logger.info('check the error updating wishlist')
    }
}

export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        logger.info('debug 1', id)
        const response = await prisma.user.findFirst({
            where: {
                userId: id
            },
            select: {
                wishlist: true
            },
        })
        res.status(200).json({ response })
        logger.info('check for getting wishlist')
    } catch (error) {
        next(new ApiError(error, httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
        logger.info('check for error in getting wishlist', error)

    }
}