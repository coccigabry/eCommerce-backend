import 'dotenv/config'
import mongoose from 'mongoose';
import express from "express";
import cors from 'cors'

import authRoute from './api/routes/auth.js'
import userRoute from './api/routes/user.js'
import productRoute from './api/routes/product.js'
import cartRoute from './api/routes/cart.js'
import orderRoute from './api/routes/order.js'
import stripeRoute from './api/routes/stripe.js'


mongoose.set('strictQuery', true)
mongoose.connect(
    `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`,
    (err) => {
        if (err) throw err
        console.log('Connected to mongoose')
    }
)


const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)
app.use('/api/checkout', stripeRoute)


app.listen(process.env.PORT || 4000, () => {
    console.log('Server listening my son!');
})