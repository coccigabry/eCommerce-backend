import Product from '../models/Product.js'


// CREATE PRODUCT
export const createProductCtrl = async (req, res) => {
    const product = new Product(req.body)
    try {
        const newProduct = await product.save()
        res.status(200).json(newProduct)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// READ PRODUCTS
export const getProductCtrl = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const getAllProductsCtrl = async (req, res) => {
    const queryNew = req.query.new
    const queryCategory = req.query.category
    try {
        let allProducts

        if (queryNew) {
            allProducts = await Product.find().sort({ createdAt: -1 })
        } else if (queryCategory) {
            allProducts = await Product.find({ categories: { $in: [queryCategory] } })
        } else {
            allProducts = await Product.find()
        }
        res.status(200).json(allProducts)
    } catch (err) {
        res.status(500).json(err)
    }
}

// UPDATE PRODUCT
export const updateProductCtrl = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.send(500).json(err)
    }
}

// DELETE PRODUCT
export const deleteProductCtrl = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product deleted')
    } catch (err) {
        res.status(500).json(err)
    }
}