import express from 'express'
import { createCartCtrl, updateCartCtrl, deleteCartCtrl, getUserCart, getAllUsersCarts } from '../controller/cart.js'
import { verifyToken, verifyAdmin } from '../utilities/verifyToken.js'


const router = express.Router()


// CREATE
router.post('/', verifyToken, createCartCtrl)

// READ
router.get('/find/:userId', verifyToken, getUserCart)
router.get('/', verifyAdmin, getAllUsersCarts)

// UPDATE
router.put('/:id', verifyToken, updateCartCtrl)

// DELETE
router.delete('/:id', verifyToken, deleteCartCtrl)


export default router