import ApiError from './../utils/ApiError';
import logger from '../config/winston'
import prisma from '../prismaClient'
import {NextFunction, Request, Response} from "express"
import httpStatus from 'http-status';


export interface FavProductInfo  {
  ProductId: number
  Gender: string
  Category: string
  SubCategory: string
  ProductType: string
  Colour: string
  Usage: string
  ProductTitle: string
  ImageURL: string
  UnitPrice: GLfloat
}


export const getFavProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await prisma.favouriteProducts.findMany();
    res.json(response)

    logger.info('Retrieved all Favourite Products data:', { response })

    return response
  } catch (error) {
    next(new ApiError("error in getting favourite product.", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
  }
}

export const createFavProduct = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as FavProductInfo;
  if(![body]) {
      res.send(new ApiError("Bad Request", httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]))
  }
  try {
    const newProduct = await prisma.favouriteProducts.create({
        data: body
    });
  } catch (error) {
      next(new ApiError("error in creating the fav Product!", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
  }
}

export const deleteFavProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params
  try {
    const deletedProduct = await prisma.favouriteProducts.delete({
      where: {
        id,
      },
    })

    if (!deletedProduct) {
      throw new Error(`Product with id ${id} not found`)
    }
  } catch (error) {  
      next(new ApiError("error in deleting the fav Product!", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
  }
}