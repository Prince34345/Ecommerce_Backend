import prisma from "../prismaClient";
import logger from "../config/winston";
import {NextFunction, Request, Response} from "express";
import ApiError from "./../utils/ApiError";
import httpStatus from "http-status";


interface FilterInfo {
    Title:  String
    Values: String
}

export const getFilters = async (req: Request, res: Response, next:NextFunction) => {
    try {
     
      const response = await prisma.filters.findMany()
      res.json(response).status(200)
      logger.info('Retrieved all filters data:', { response })
  
      return response
    } catch (error) {
       next(new ApiError("error in filtering query.", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
  }
  
export const createFilter = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as FilterInfo
    if(![body]) {
        res.send(new ApiError("Bad Request!", httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]));
    }
    try {
      const response = await prisma.filters.create({
        data: req.body,
      })
  
      logger.info('Retrieved all createFilters data:', { response })
  
      return response
    } catch (error) {
        next(new ApiError("Error in creating product", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
}
  
export const updateFilter = async (req:Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const body = req.body as FilterInfo
    if(![body]) {
      res.send(new ApiError("Bad Request!", httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]));
    }
    try {
      const updatedfilter = await prisma.filters.update({
        where: {
          id
        },
        data: req.body,
      })
  
      if (!updatedfilter) {
        throw new Error(`filter with id ${id} not found`)
      }
  
      logger.info('filter updated successfully', { updatedfilter })
  
      return updatedfilter
    } catch (error) {
      next(new ApiError("error in updating filters.", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
  }
  
export const deleteFilter = async (req:Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    try {
      const deletedfilter = await prisma.filters.delete({
        where: {
          id,
        },
      })
  
      if (!deletedfilter) {
        throw new Error(`filter with id ${id} not found`)
      }
  
      logger.info('filter deleted successfully', { deletedfilter })
  
      return true
    } catch (error) {
      next(new ApiError("error in deleting filters.", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
    }
  }