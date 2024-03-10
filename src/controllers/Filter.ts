import prisma from "../prismaClient";
import logger from "../config/winston";
import {Request, Response} from "express";


interface FilterInfo {
    Title:  String
    Values: String
}

export const getFilters = async (req: Request, res: Response) => {
    try {
     
      const response = await prisma.filters.findMany()
      res.json(response).status(200)
      logger.info('Retrieved all filters data:', { response })
  
      return response
    } catch (error) {
      logger.error('Error in getFilters query:', { error })
      throw error
    }
  }
  
export const createFilter = async (args: {
    filterInfo: {
      Title: string
      Values: string
    }
  }) => {
    try {
      const response = await prisma.filters.create({
        data: args.filterInfo,
      })
  
      logger.info('Retrieved all createFilters data:', { response })
  
      return response
    } catch (error) {
      logger.error('Error in createFilters query:', { error })
      throw error
    }
}
  
export const updateFilter = async (req:Request, res: Response) => {
    const {id} = req.params
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
      logger.error('Error updating filter:', { error })
      throw error
    }
  }
  
export const deleteFilter = async (req:Request, res: Response) => {
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
      logger.error('Error deleting filter:', { error })
      throw error
    }
  }