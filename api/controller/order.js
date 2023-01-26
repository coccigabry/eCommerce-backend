import Order from '../models/Order.js'


// CREATE CART
export const createOrderCtrl = async (req, res) => {
    const order = new Order(req.body)
    try {
        const newOrder = await order.save()
        res.status(200).json(newOrder)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// READ USERS ORDERS
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getAllUsersOrders = async (req, res) => {
    try {
        const allUsersOrders = await Order.find()
        res.status(200).json(allUsersOrders)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getIncomeStats = async (req, res) => {
    const date = new Date() //get today date
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1)) //get last month
    const prevMonth = new Date(date.setMonth(lastMonth.getMonth() - 1)) //get previous month
    try {
        const income = await Order.aggregate([ //look for incomes...
            {
                $match: {
                    createdAt: { $gte: prevMonth } //...sales previous month...
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" }, //...sort result by month creating a month variable...
                    sales: "$amount",  //...getting sales month amount...
                }
            },
            {
                $group: { //return them
                    _id: "$month", 
                    total: { $sum: "$sales" }
                }
            }
        ])

        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
}

// UPDATE CART
export const updateOrderCtrl = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.send(500).json(err)
    }
}

// DELETE CART
export const deleteOrderCtrl = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order deleted')
    } catch (err) {
        res.status(500).json(err)
    }
}