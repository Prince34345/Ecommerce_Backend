import { controllers } from '../controllers/index'
import express, { Router } from 'express'
const router: Router = express.Router()

router.get('/products', controllers.getAllProducts)
router.get('/product/:id', controllers.getProduct)
// router.post('/product/:id', controllers.getAllProducts)
router.put('/product/:id', controllers.updateProduct)
router.delete('/product/:id', controllers.deleteProduct)


export default router
