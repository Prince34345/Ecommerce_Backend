import ApiError from 'utils/ApiError'
import logger from '../config/winston'
import prisma from '../prismaClient'
import {NextFunction, Request, Response} from "express"
import httpStatus from 'http-status'


export interface CategoryInfo {
    Category:string
}


export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await prisma.categories.findMany()
    res.json(response)
    logger.info('Retrieved all getCategories data:', { response })

    return response
  } catch (error) {
    next(new ApiError("error in getting categories query", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
  }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as CategoryInfo;
  if(![body]) {
    res.send(new ApiError("Bad Request", httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]));
  }
  try {
    const response = await prisma.categories.create({
      data: body,
    })

    logger.info('Retrieved all createCategory data:', { response })

    return response
  } catch (error) {
    logger.error('Error in createCategory query:', { error })
    throw error
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params
  const body  = req.body as CategoryInfo;
  if(![body]) {
      res.send(new ApiError("Bad Request", httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]))
  }
  try {
    const updatedCategory = await prisma.categories.update({
      where: {
        id,
      },
      data: body,
    })

    if (!updatedCategory) {
      throw new Error(`Category with id ${id} not found`)
    }

    logger.info('Category updated successfully', { updatedCategory })

    return updatedCategory
  } catch (error) {
    next(new ApiError("error in deleting category", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]));
  }
}

export const deleteCategory = async (req: Request, response: Response, next: NextFunction) => {
  const {id} = req.params
  try {
    const deletedCategory = await prisma.categories.delete({
      where: {
        id,
      },
    })

    if (!deletedCategory) {
      throw new Error(`Category with id ${id} not found`)
    }

    logger.info('Category deleted successfully', { deletedCategory })

    return true
  } catch (error) {
      next(new ApiError("error in deleting category", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]));
  }
}