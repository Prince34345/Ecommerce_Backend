import { controllers } from '../controllers/index'
import express, { Router } from 'express';
const router: Router = express.Router();

router.get("/getProduct", controllers.getProduct);
router.get("/getAllProduct", controllers.)

export default router;