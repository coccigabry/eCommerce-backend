import Cart from '../models/Cart.js'


// CREATE CART
export const createCartCtrl = async (req, res) => {
    const cart = new Cart(req.body)
    try {
        const newCart = await cart.save()
        res.status(200).json(newCart)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// READ USERS CARTS
export const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
        res.status(200).json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getAllUsersCarts = async (req, res) => {
    try {
        const allUsersCarts = await Cart.find()
        res.status(200).json(allUsersCarts)
    } catch (err) {
        res.status(500).json(err)
    }
}

// UPDATE CART
export const updateCartCtrl = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedCart)
    } catch (err) {
        res.send(500).json(err)
    }
}

// DELETE CART
export const deleteCartCtrl = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart deleted')
    } catch (err) {
        res.status(500).json(err)
    }
}