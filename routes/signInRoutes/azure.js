const express = require('express')
const passport = require('passport')
const config = require('../../config/config')
const router = express.Router()

router.post('/login', (req, res) => {
    console.log('🚀 ~ file: azure.js ~ line 7 ~ router.post ~ req', req.body)
    res.sendStatus(200)
})

/* This route contains old route logic that doesn't work with SPA(React) */
router.get(
    '/login',
    function (req, res, next) {
        passport.authenticate('azuread-openidconnect', {
            response: res,
            resourceURL: config.resourceURL,
            customState: 'my_state',
            failureRedirect: '/'
        })(req, res, next)
    },
    function (req, res) {
        console.log('Login was called in the Sample')
        res.redirect('/todos')
    }
)

router.get(
    '/openid/return',
    function (req, res, next) {
        passport.authenticate('azuread-openidconnect', {
            response: res,
            failureRedirect: '/'
        })(req, res, next)
    },
    function (req, res) {
        console.log('We received a return from AzureAD.')
        res.redirect('/todos')
    }
)

router.post(
    '/openid/return',
    function (req, res, next) {
        passport.authenticate('azuread-openidconnect', {
            response: res,
            failureRedirect: '/'
        })(req, res, next)
    },
    function (req, res) {
        console.log('We received a return from AzureAD.')
        res.redirect('http://localhost:3000/Address')
    }
)

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        req.logOut()
        res.redirect(config.destroySessionUrl)
    })
})

module.exports = router
