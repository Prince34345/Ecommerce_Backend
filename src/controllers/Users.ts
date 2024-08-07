import prisma from "../prismaClient";
import logger from "../config/winston";
import { NextFunction, Request, Response } from "express";
import ApiError from "./../utils/ApiError";
import httpStatus from "http-status";
import { users } from "./constant/appwrite-constant/appwrite-service";
import { ProductInfo } from "./Product";
import { Prisma } from "@prisma/client";

export interface UsersInfo {
    username: string
    email: string
    password?: string,
    wishlist?: ProductInfo[] | []
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId  = req.params.id
        const user = await users.get(userId as string)
        const response = await prisma.user.create({
            data: {
                userId: user.$id,
                username: user.name,
                email: user.email,
                wishlist: {
                    set: []
                } 
            }
        })
        logger.info('Retrieved product data')
        res.status(200).json({ message:  response ? 'User Created SuccessFully!' : 'Unable to Create Some Issue on your Data!' });
    // }
        
    } catch (error) {
        next(new ApiError("error in creating a User!", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        console.log('id is requested from get user' , id);
        const response = await prisma.user.findUnique({
            where: {
               userId: id
            },
        })
        res.status(200).json({ response })
    } catch (error) {
        next(new ApiError('error in getting user', httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response = await prisma.user.delete({
            where: {
                userId:id as string
            }
        })
        res.status(200).json({ response })
    } catch (error) {
        next(new ApiError('error in Deleting user', httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
}

// cms admin panel functio
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
   try {
       const response = await prisma.user.findMany()
       res.status(200).json({response})
   } catch (error) {
       next(new ApiError('error in Deleting user', httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
   }
}
