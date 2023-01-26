import express from 'express'
import { createOrderCtrl, updateOrderCtrl, deleteOrderCtrl, getUserOrders, getAllUsersOrders, getIncomeStats } from '../controller/order.js'
import { verifyToken, verifyAdmin, verifyUser } from '../utilities/verifyToken.js'


const router = express.Router()


// CREATE
router.post('/', verifyToken, createOrderCtrl)

// READ
router.get('/find/:userId', verifyUser, getUserOrders)
router.get('/', verifyAdmin, getAllUsersOrders)
router.get('/income', verifyAdmin, getIncomeStats)

// UPDATE
router.put('/:id', verifyAdmin, updateOrderCtrl)

// DELETE
router.delete('/:id', verifyAdmin, deleteOrderCtrl)


export default router