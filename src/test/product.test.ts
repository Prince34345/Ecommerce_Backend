// import prisma from '../prismaClient';
// import { getAllProduct } from '../controllers/Product';
// import logger from '../config/winston';
// import ApiError from './../utils/ApiError';
// import httpStatus from 'http-status';
// import products from './mock/mockProduct.json'
// jest.mock('../prismaClient', () => ({
//   products: {
//     findUnique: jest.fn(),
//     findMany: jest.fn(),
//     create: jest.fn(),
//     update: jest.fn()
//   },
// }));

// describe('getAllProduct', () => {
//   it('should return products with pagination', async () => {
//     const req  = Request

//     // Mock request parameters
//     when(req.query).thenReturn({ page: '1', limit: '10' });

//     // Mock the behavior of your getAllProduct function
//     // Assuming getAllProduct takes in req.query as an argument
//     when(getAllProduct(instance(req), instance(res))).thenResolve([
//       // Your mocked array of products here
//       { id: 1, name: 'Product 1' },
//       { id: 2, name: 'Product 2' },
//     ]);

//     // Call your getAllProduct function
//     await getAllProduct(instance(req), instance(res));

//     // Verify that your function was called with the correct arguments
//     verify(getAllProduct(instance(req), instance(res))).once();

//     // Verify the response
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith([
//       { id: 1, name: 'Product 1' },
//       { id: 2, name: 'Product 2' },
//     ]);
//   });
// });