import { Request, Response } from 'express';
import logger from "../config/winston"
import prisma from '../prismaClient';

export const getProduct = async (req: Request, res: Response) => {
    logger.info("getProduct controller called")
    const {id} = req.query
    if(!id) {
        logger.error("id is missing in payload")
        res.status(400).send("id is missing in payload")
    }
    try {
        const response = await prisma.products.findUnique({
          where: {
            id: id,
          },
        })
    
        logger.info('Retrieved product data')
        res.status(200).json(response)
    
      } catch (error) {
        logger.error('Error in getProduct query:', { error })
        res.status(400).send("error in product query")
      }
}