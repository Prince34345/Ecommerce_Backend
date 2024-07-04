import { NextFunction, Request, Response, response } from 'express'
import logger from '../config/winston'
import prisma from '../prismaClient'
import ApiError from './../utils/ApiError'
import httpStatus from 'http-status'
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

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
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
    console.log("test", response)
    logger.info(`Retrieved product data ${response}`);
    res.status(200).json({response})
  } catch (error) {
    next(
      new ApiError(
        'error in product query',
        httpStatus.INTERNAL_SERVER_ERROR,
        httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
      ),
    )
  }
}
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as ProductInfo
    if(![body]) {
        res.send(new ApiError("bad request!", httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]))
    }else{

    const response = await prisma.products.create({
      data: req.body
    });
    res.json(response.id)
    logger.info('Retrieved product data');
    res.status(200).json({response})
    }
  } catch (error) {
      next(new ApiError("error in creating a Product!", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
  }
}

export const getAllProducts = async (req: Request , res: Response, next: NextFunction) => {
  const { page, limit }  = req.query as { page?: number | any, limit?: number | any };
  // console.log("test", page)
  if (!page || !limit || page === 0)  {res.send(new ApiError("Bad Request",httpStatus.BAD_REQUEST,httpStatus[httpStatus.BAD_REQUEST]))}
  const skip = (page - 1) * limit;
  
  try {
    const response = await prisma.products.findMany({
      take: Number(limit),
      skip: Number(skip),
    });
    logger.info('Retrieved all product data:', { page, limit })
    res.status(200).json({response});
    
  } catch (error) {
    next(new ApiError("Error in getting the All Product query", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
  }
}




export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  const body = req.body as ProductInfo
  if (![body]) {
    res.send(new ApiError("Bad request", httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]))
  }
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
    next(new ApiError("Error in updating Product query", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
  }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
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
       next(new ApiError("Error in Delete Product query", httpStatus.INTERNAL_SERVER_ERROR, httpStatus[httpStatus.INTERNAL_SERVER_ERROR]))
  }
}


export const getSearchProduct = async (req: Request, res: Response, next: NextFunction) => {
      const { page, limit} = req.query as {page?: number | any, limit?: number | any}
     if (!page || !limit) return res.send(new ApiError("Bad Search Request", httpStatus.BAD_REQUEST, httpStatus[httpStatus.BAD_REQUEST]))
     const {searchTerm} = req.query as {searchTerm?: string}
      const skip = (page - 1) * limit;
      const SearchedProduct = await prisma.products.findMany({
       take: Number(limit),
       skip: Number(skip),
       where: {
         OR: [ 
           {ProductTitle: searchTerm},
           {ProductType: searchTerm},
           {Gender: searchTerm},
           {Category: searchTerm},
           {Colour: searchTerm}
         ]
       }
    })
     try {  
        if (!SearchedProduct) {res.send(new ApiError("Bad Searching!", httpStatus.BAD_GATEWAY, httpStatus[httpStatus.BAD_GATEWAY])) }
        else {logger.info("Search Product", {SearchedProduct}) 
              res.json({SearchedProduct}).status(200)
        }   
     } catch (error) {
         res.json({msg: `Cannot Get The Searching   ${error} problem is there.`})
     }
}