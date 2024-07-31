import { Categorycontrollers, Filtercontrollers, ProductController, Favouritecontrollers, Userscontrollers, wishlistcontrollers } from '../controllers/root/index';
import express, { Router } from 'express';
const router: Router = express.Router()

router.get('/products', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getProduct);
router.post('/product', ProductController.createProduct);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);
router.get('/products/search', ProductController.getSearchProduct);

router.get('/filters', Filtercontrollers.getFilters);
router.post('/filter/:id', Filtercontrollers.createFilter);
router.put('/filter/:id', Filtercontrollers.updateFilter);
router.delete('/filter/:id', Filtercontrollers.deleteFilter);

router.get('/categories', Categorycontrollers.getCategories);
router.post('/category/:id', Categorycontrollers.createCategory);
router.put('/category/:id', Categorycontrollers.updateCategory);
router.delete('/category/:id', Categorycontrollers.deleteCategory);

router.get('/favourites', Favouritecontrollers.getFavProducts);
router.post('/favourite/:id', Favouritecontrollers.createFavProduct);
router.delete('/favourite/:id', Favouritecontrollers.deleteFavProduct);

router.get('/user/:id', Userscontrollers.getUser);
router.delete('/user/:id', Userscontrollers.deleteUser);
router.get('/users', Userscontrollers.getAllUsers);
router.post('/users', Userscontrollers.createUser);

router.patch('/wishlist/:id', wishlistcontrollers.updateWishlist);
router.get('/wishlist/:id', wishlistcontrollers.getWishlist);


export default router
