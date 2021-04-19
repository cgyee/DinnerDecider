const { request, response } = require('express')
const express = require('express')
const passport = require('passport')
const config = require('../config/config')
const router = express.Router()

router.get('/login', (request, response, next) => {
    passport.authenticate('azuread-openidconnect', 
        { 
            response:response,                      
            resourceURL: config.resourceURL,    
            customState: 'my_state',            
            failureRedirect: '/' 
        }
    )(request, response, next);
},
(request, response) => {
    console.log('Login was called in the sample');
    response.redirect('/Address');
});

module.exports = router;

