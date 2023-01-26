import express from 'express'
import { createProductCtrl, deleteProductCtrl, getAllProductsCtrl, getProductCtrl, updateProductCtrl } from '../controller/product.js'
import { verifyAdmin } from '../utilities/verifyToken.js'


const router = express.Router()


// CREATE
router.post('/', verifyAdmin, createProductCtrl)

// READ
router.get('/find/:id', getProductCtrl)
router.get('/', getAllProductsCtrl)

// UPDATE
router.put('/:id', verifyAdmin, updateProductCtrl)

// DELETE
router.delete('/:id', verifyAdmin, deleteProductCtrl)


export default router