const passport = require('passport')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

/* Check if the user is logged in or not, if req.user is set or not */
exports.getLogin = (req, res) => {
    if (req.user) {
        return res.status(200).send({ id: req.user.id })
    }
    res.sendStatus(401)
}

/* POST - log in information (data can be found in req.body) and validate if the information is valid  */
exports.postLogin = (req, res, next) => {
    const validationErrors = []
    console.log(req.body)
    /* Check that the email and password is valid if not send relevant error messages */
    if (!validator.isEmail(req.body.email))
        validationErrors.push('Please enter a valid email address.')
    if (validator.isEmpty(req.body.password))
        validationErrors.push('Password cannot be blank.')

    if (validationErrors.length) {
        return res.status(401).send({ message: validationErrors.join(' ') })
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false
    })

    /* Authenticate user using passport, if inforamtion is valid set req.user  */
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(400).send({ message: info })
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err)
            }
            // const body = { id: user.id, email: user.email }
            // const token = jwt.sign({ user: body }, 'TOP_SECRET')

            // return res.json({ token })
            return res.sendStatus(200)
        })
    })(req, res, next)
}

/* GET - log out user, end session and set req.user to null */
exports.logout = (req, res) => {
    req.logout()
    req.session.destroy((err) => {
        if (err)
            console.log(
                'Error : Failed to destroy the session during logout.',
                err
            )
        req.user = null
        res.redirect('/')
    })
}

/* POST - Create new user using information in req.body */
exports.postSignup = (req, res, next) => {
    /* Check that the email and password is valid if not send relevant error messages */
    const validationErrors = []
    if (!validator.isEmail(req.body.email))
        validationErrors.push('Please enter a valid email address.')
    if (!validator.isLength(req.body.password, { min: 8 }))
        validationErrors.push('Password must be at least 8 characters long')

    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        console.log(validationErrors)
        return res.status(401).send({ message: validationErrors.join(' ') })
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false
    })

    /* Create new user object modeled after UserSchema */
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    })
    // console.log('🚀 ~ file: local.js ~ line 76 ~ user', user)

    /* Check if a user with a matching email or username already exists if it doesn't create that new user and set req.user */
    User.findOne(
        {
            $or: [{ email: req.body.email }, { userName: req.body.userName }]
        },
        (err, existingUser) => {
            if (err) {
                return next(err)
            }
            if (existingUser) {
            }
            user.save((err) => {
                if (err) {
                    return next(err)
                }
                req.logIn(user, (err) => {
                    if (err) {
                        return next(err)
                    }
                    res.sendStatus(201)
                })
            })
        }
    )
}
