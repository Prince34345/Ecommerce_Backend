import prisma from "../prismaClient";
import logger from "../config/winston";
import { NextFunction, Request, Response } from "express";
import ApiError from "./../utils/ApiError";
import httpStatus from "http-status";
import { users } from "./constant/appwrite-constant/appwrite-service";

export interface UsersInfo {
    username: string
    email: string
    password?: string,
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.query
        const user = await users.get(userId as string)
        if (!user) {
            res.send(new ApiError("bad request!", httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]))
        }
        const response = await prisma.users.create({
            data : { 
                userId: user.$id,
                username: user.name,
                email: user.email 
            }
        })
        logger.info('Retrieved product data');
        res.status(200).json({ response });

    } catch (error) {
        next(new ApiError("error in creating a User!", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        console.log('id is requested from get user' ,id)
        const response = await prisma.users.findUnique({
            where: {
                id
            }
        })
        res.status(200).json({ response })
    } catch (error) {
        next(new ApiError('error in getting user', httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const response = await prisma.users.delete({
            where: {
                userId:id as string
            }
        })
        res.status(200).json({ response })
    } catch (error) {
        next(new ApiError('error in Deleting user', httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
}
// export const updateUserData = async (req: Request, res: Response, next: NextFunction) => {
//     const id = req.params.id;
//     const updatedData = 
//     try {
//         const response = await prisma.users.update({
//             where: {
//                 id
//             },
//             data: req.body
//         })
//         res.status(200).json({ updated: response ? true : false })
//     } catch (error) {
//         next(new ApiError('error in updating user', httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
//     }
// }
// cms admin panel functio
// export const getAllUsers = async () => {

// }
