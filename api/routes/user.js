import express from 'express'
import { verifyAdmin, verifyUser } from '../utilities/verifyToken.js'
import { updateUserCtrl, deleteUserCtrl, getUserCtrl, getAllUsers, getAllUsersStats } from '../controller/user.js'


const router = express.Router()


// UPDATE
router.put('/:id', verifyUser, updateUserCtrl)

// DELETE
router.delete('/:id', verifyUser, deleteUserCtrl)

// GET
router.get('/find/:id', verifyAdmin, getUserCtrl)

// GET ALL
router.get('/', verifyAdmin, getAllUsers)

// GET ALL STATS
router.get('/stats', verifyAdmin, getAllUsersStats)


export default router