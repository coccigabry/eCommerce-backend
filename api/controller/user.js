import User from '../models/User.js'


// UPDATE USER
export const updateUserCtrl = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

// DELETE USER
export const deleteUserCtrl = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('User deleted successfully')
    } catch (err) {
        res.status(500).json(err)
    }
}

// GET USER
export const getUserCtrl = async (req, res) => {
    try {
        const searchedUser = await User.findById(req.params.id)
        const { password, ...other } = searchedUser._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err)
    }
}

// GET ALL USERS
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        console.log(allUsers)
        res.status(200).json(allUsers)
    } catch (err) {
        res.status(500).json(err)
    }
}

// GET ALL USERS STATS
export const getAllUsersStats = async (req, res) => {
    const date = new Date() //get today date
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)) //get last year
    try {
        const data = await User.aggregate([ //look for users...
            {
                $match: {
                    createdAt: { $gte: lastYear } //...registered this year...
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" } //...sort result by month creating a month variable...
                }
            },
            {
                $group: { //return them
                    _id: "$month", 
                    total: { $sum: 1 }
                }
            }
        ])

        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}