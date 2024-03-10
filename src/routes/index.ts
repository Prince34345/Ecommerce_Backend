import { Categorycontrollers, Filtercontrollers, controllers, Favouritecontrollers } from '../controllers/root/index';
import express, { Router } from 'express';
const router: Router = express.Router()


// Prodcut Routes
router.get('/products', controllers.getAllProducts)
router.get('/product/:id', controllers.getProduct)
router.post('/product', controllers.createProduct)
router.put('/product/:id', controllers.updateProduct)
router.delete('/product/:id', controllers.deleteProduct)



//Filter Routes
router.get('/filters', Filtercontrollers.getFilters)
router.post('/filter/:id', Filtercontrollers.createFilter)
// router.post('/filter/:id', controllers.getAllfilters)
router.put('/filter/:id', Filtercontrollers.updateFilter)
router.delete('/filter/:id', Filtercontrollers.deleteFilter)


//category Routes
router.get('/categories', Categorycontrollers.getCategories)
router.post('/category/:id', Categorycontrollers.createCategory)
// router.post('/category/:id', controllers.getAllcategorys)
router.put('/category/:id', Categorycontrollers.updateCategory)
router.delete('/category/:id', Categorycontrollers.deleteCategory)


//favProducts Routes 
router.get('/favourites', Favouritecontrollers.getFavProducts)
router.post('/favourite/:id', Favouritecontrollers.createFavProduct)
// router.post('/Favourite/:id', controllers.getAllFavourites)
router.delete('/favourite/:id', Favouritecontrollers.deleteFavProduct)


export default router
