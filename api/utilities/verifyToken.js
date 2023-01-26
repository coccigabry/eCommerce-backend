import jwt from 'jsonwebtoken'


// CHECK IF USER LOGGED IN
export const verifyToken = (req, res, next) => {
    const headerToken = req.headers.token
    if (!headerToken) return res.status(401).send('You are not authenticated')

    const accessToken = headerToken.split(" ")[1]
    jwt.verify(
        accessToken, 
        process.env.JWT_SECRET, 
        (err, user) => {
            if (err) return res.status(403).send('Token not valid')
            req.user = user
            next()
        }
    )
}

// CHECK USER PERMISSIONS
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(403).send('You are not allowed to perform this action')
        }
    })
}

// CHECK IF ADMIN
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(403).send('Only Admins can perform this action')
        }
    })
}