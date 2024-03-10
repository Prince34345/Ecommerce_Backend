import logger from '../config/winston'
import prisma from '../prismaClient'
import {Request, Response} from "express"
export const getFavProducts = async (req: Request, res: Response) => {
  try {
    const response = await prisma.favouriteProducts.findMany();
    res.json(response)

    logger.info('Retrieved all Favourite Products data:', { response })

    return response
  } catch (error) {
    logger.error('Error in getFavProducts query:', { error })
    throw error
  }
}

export const createFavProduct = async (req: Request, res: Response) => {
  try {
    // const newProduct = await prisma.favouriteProducts.create({
    //   data: args.favProductInfo,
    // })

    // logger.info('New product added in Favourite Products successfully', {
    //   newProduct,
    // })

    // return newProduct
  } catch (error) {
    logger.error('Error creating createFavProduct:', { error })
    throw error
  }
}

export const deleteFavProduct = async (req: Request, res: Response) => {
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

    logger.info('Favourite Product deleted successfully', { deletedProduct })

    return true
  } catch (error) {
    logger.error('Error deleting deleteFavProduct:', { error })
    throw error
  }
}