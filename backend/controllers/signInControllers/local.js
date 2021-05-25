const passport = require('passport')
const validator = require('validator')
const User = require('../../models/User')

exports.getLogin = (req, res) => {
    if (req.user) {
        return res.sendStatus(200)
    }
    res.render('login', {
        title: 'Login'
    })
}

exports.postLogin = (req, res, next) => {
    const validationErrors = []
    console.log(req.body)
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        return res.status(401).send({message:validationErrors.join(' ')})
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) {
            req.flash('errors', info)
            return res.status(400).send({message:info})
        }
        req.logIn(user, (err) => {
            if (err) { return next(err) }
            req.flash('success', { msg: 'Success! You are logged in.' })
            res.send({message: 'Success! You are logged in.'})
        })
    })(req, res, next)
}

exports.logout = (req, res) => {
    req.logout()
    req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err)
        req.user = null
        res.redirect('/')
    })
}

exports.getSignup = (req, res) => {
    if (req.user) {
        return res.redirect('/post')
    }
    res.render('signup', {
        title: 'Create Account'
    })
}

exports.postSignup = (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.email)) validationErrors.push('Please enter a valid email address.')
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push('Password must be at least 8 characters long')

    if (validationErrors.length) {
        req.flash('errors', validationErrors)
        console.log(validationErrors)
        return res.status(401).send({message: validationErrors.join(' ')})
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    })

    User.findOne({
        $or: [
            { email: req.body.email },
            { userName: req.body.userName }
        ]
    }, (err, existingUser) => {
        if (err) { return next(err) }
        if (existingUser) {
            req.flash('errors', { msg: 'Account with that email address or username already exists.' })
            return res.status(409).send({message:'Account with that email address or username already exists.'})
        }
        user.save((err) => {
            if (err) { return next(err) }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err)
                }
                res.sendStatus(201)
                // res.redirect('/post')
            })
        })
    })
}