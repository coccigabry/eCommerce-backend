import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


// REGISTER
export const registerCtrl = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

// LOGIN
export const loginCtrl = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(401).send('User does not exist')

        const isPswCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPswCorrect) return res.status(401).send('Wrong credentials')

        const { password, ...other } = user._doc

        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        )
        res.status(200).json({ other, accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
}
