import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductsValidation } from './product.validation'
import { ProducsController } from './product.controller'

const router = express.Router()

router.post('/', validateRequest(ProductsValidation.createProductValidation), ProducsController.createProducts)
router.get('/', ProducsController.getAllProducts )
// router.get('/:productId', productController.getSingleProduct)
// router.put('/:productId', productController.updateSingleProduct);
// router.delete('/:productId', productController.deleteProduct)

export const ProductRoute = router;