import { Request, Response, NextFunction } from 'express';
import prisma from '../prismaClient';
import { getProduct } from '../controllers/Product';
import logger from '../config/winston';
import ApiError from './../utils/ApiError';
import httpStatus from 'http-status';

jest.mock('../prismaClient', () => ({
  products: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));


describe('getProduct', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { params: { id: '1' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should return product data if id is provided', async () => {
    const productData = {
      ProductId: 1,
      Gender: 'Male',
      Category: 'Clothing',
      SubCategory: 'Shirts',
      ProductType: 'Casual',
      Colour: 'Blue',
      Usage: 'Daily',
      ProductTitle: 'Blue Casual Shirt',
      ImageURL: 'https://example.com/image.jpg',
      UnitPrice: 50.0,
    };

    (prisma.products.findUnique as jest.Mock).mockResolvedValue(productData);

    await getProduct(req as Request, res as Response, next);

    expect(prisma.products.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith(productData);
  });

  // it('should return a 400 status and error message if id is missing in the request', async () => {
  //   req.params = {};

  //   await getProduct(req as Request, res as Response, next);

  //   expect(logger.error).toHaveBeenCalledWith('id is missing in payload');
  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.status).toHaveBeenCalledWith('id is missing in payload');
  // });

  // it('should call next with an ApiError if an error occurs while fetching product data', async () => {
  //   const error = new Error('Prisma error');
  //   (prisma.products.findUnique as jest.Mock).mockRejectedValue(error);

  //   await getProduct(req as Request, res as Response, next);

  //   expect(next).toHaveBeenCalledWith(
  //     new ApiError(
  //       'error in product query',
  //       httpStatus.INTERNAL_SERVER_ERROR,
  //       httpStatus[httpStatus.INTERNAL_SERVER_ERROR],
  //     ),
  //   );
  // });
});
