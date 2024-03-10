import { Categorycontrollers, Filtercontrollers, controllers } from '../controllers/root/index';
import express, { Router } from 'express';
const router: Router = express.Router()


// Prodcut Routes
router.get('/products', controllers.getAllProducts)
router.get('/product/:id', controllers.getProduct)
// router.post('/product/:id', controllers.getAllProducts)
router.put('/product/:id', controllers.updateProduct)
router.delete('/product/:id', controllers.deleteProduct)



//Filter Routes
router.get('/filter', Filtercontrollers.getFilters)
router.post('/filter/:id', Filtercontrollers.createFilter)
// router.post('/filter/:id', controllers.getAllfilters)
router.put('/filter/:id', Filtercontrollers.updateFilter)
router.delete('/filter/:id', Filtercontrollers.deleteFilter)


//category Routes
router.get('/category', Categorycontrollers.getCategories)
router.post('/category/:id', Categorycontrollers.createCategory)
// router.post('/category/:id', controllers.getAllcategorys)
router.put('/category/:id', Categorycontrollers.updateCategory)
router.delete('/category/:id', Categorycontrollers.deleteCategory)

export default router
