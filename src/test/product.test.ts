import {getAllProducts, getProduct, updateProduct, createProduct, deleteProduct} from "../controllers/Product"

describe('getAllProducts', () => {
    it('should return paginated results based on page and limit query params', () => {
      const req: any = {
        query: {
          page: '2',
          limit: '1',
        },
      };
      const res: any = {
        json: jest.mock("./mock/mockProduct.json"),
      };
      const next = jest.fn();
  
      getAllProducts(req, res, next);
  
      expect(res.json).toHaveBeenCalledWith([{ id: 2, name: 'Product 2' }]);
      expect(next).toHaveBeenCalled();
    });
  
    it('should return default paginated results if no query params are provided', () => {
      const req: any = {
        query: {},
      };
      const res: any = {
        json: jest.fn(),
      };
      const next = jest.fn();
  
      getAllProducts(req, res, next);
  
      expect(res.json).toHaveBeenCalledWith([
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
        { id: 3, name: 'Product 3' },
      ]);
      expect(next).toHaveBeenCalled();
    });
  });