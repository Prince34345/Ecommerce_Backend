import { Request, Response, response } from 'express'
import logger from '../../config/winston'
import prisma from '../../prismaClient'

export interface ProductInfo {
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

export const getProduct = async (req: Request, res: Response) => {
  logger.info('getProduct controller called')
  const paramId = req.params.id as string
  if (!paramId) {
    logger.error('id is missing in payload')
    res.status(400).send('id is missing in payload')
  }
  try {
    const response = await prisma.products.findUnique({
      where: {
        id: paramId
      },
    });
    res.json({response})
    logger.info('Retrieved product data');
    // res.status(200).json({response})
  } catch (error) {
    res.status(400).send('error in product query')
  }
}
export const getAllProducts = async (req: Request , res: Response) => {
  const { page, limit }  = req.query as { page?: number | any, limit?: number | any };
  const skip = (page - 1) * limit;
  try {
    const response = await prisma.products.findMany({
      take: Number(limit),
      skip: Number(skip),
    });
    logger.info('Retrieved all product data:', { page, limit })
    res.status(200).json({response});
    
  } catch (error) {
    logger.error('Error in getAllProducts query:', { error })
    throw error
  }
}




export const updateProduct = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const updateProduct = await prisma.products.update({where: {id}, data: req.body as ProductInfo})
    if (!updateProduct) {
      throw new Error(`Product with id ${id} not found`)
    }else{
      logger.info('Product updated successfully', { updateProduct })
      res.json({updateProduct}).status(200)
    }

    // return updateProduct
  } catch (error) {
    logger.error('Error updating product:', { error })
    throw error
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const {id} = req.params
  try {
    const deletedProduct = await prisma.products.delete({
      where: {
        id,
      },
    })

    if (!deletedProduct) {
      throw new Error(`Product with id ${id} not found`)
    }

    logger.info('Product deleted successfully', { deletedProduct })

    return true
  } catch (error) {
    logger.error('Error deleting product:', { error })
    throw error
  }
}
