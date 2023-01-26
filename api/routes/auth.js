import express from 'express'
import { registerCtrl, loginCtrl } from '../controller/auth.js'


const router = express.Router()


// REGISTER
router.post('/register', registerCtrl)

// LOGIN
router.post('/login', loginCtrl)


export default router