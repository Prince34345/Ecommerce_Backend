import logger from '../config/winston'
import prisma from '../prismaClient'
import {Request, Response} from "express"

export const getCategories = async (req: Request, res: Response) => {
  try {
    const response = await prisma.categories.findMany()
    res.json(response)
    logger.info('Retrieved all getCategories data:', { response })

    return response
  } catch (error) {
    logger.error('Error in getCategories query:', { error })
    throw error
  }
}

export const createCategory = async (args: {
  categoryInfo: { Category: string }
}) => {
  try {
    const response = await prisma.categories.create({
      data: args.categoryInfo,
    })

    logger.info('Retrieved all createCategory data:', { response })

    return response
  } catch (error) {
    logger.error('Error in createCategory query:', { error })
    throw error
  }
}

export const updateCategory = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const updatedCategory = await prisma.categories.update({
      where: {
        id,
      },
      data: req.body,
    })

    if (!updatedCategory) {
      throw new Error(`Category with id ${id} not found`)
    }

    logger.info('Category updated successfully', { updatedCategory })

    return updatedCategory
  } catch (error) {
    logger.error('Error updating Category:', { error })
    throw error
  }
}

export const deleteCategory = async (req: Request, response: Response) => {
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
    logger.error('Error deleting Category:', { error })
    throw error
  }
}