const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const LocalStrategy = require('passport-local').Strategy
const config = require('../config/config')
const User = require('../models/User')
const MSUser = require('../models/MSUser')


module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, "Invalid email or password.");
        });
      });
    })
  ),
  passport.use(
    new OIDCStrategy({
        identityMetadata: config.creds.identityMetadata,
        clientID: config.creds.clientID,
        responseType: config.creds.responseType,
        responseMode: config.creds.responseMode,
        redirectUrl: config.creds.redirectUrl,
        allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
        clientSecret: config.creds.clientSecret,
        validateIssuer: config.creds.validateIssuer,
        isB2C: config.creds.isB2C,
        issuer: config.creds.issuer,
        passReqToCallback: config.creds.passReqToCallback,
        scope: config.creds.scope,
        loggingLevel: config.creds.loggingLevel,
        nonceLifetime: config.creds.nonceLifetime,
        nonceMaxAmount: config.creds.nonceMaxAmount,
        useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
        cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
        clockSkew: config.creds.clockSkew,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('auth: ', profile)
        const newUser = {
          microsoftId:profile.oid,
          userName: profile.displayName
        }

        try {
          let user = await MSUser.findOne({ microsoftId: profile.oid })
          console.log(user);

          if (user) {
            user = await User.findOne({email: newUser.microsoftId})
            done(null, user)
          } else {
            user = await MSUser.create(newUser)
            user = await User.create({email:newUser.microsoftId, userName:newUser.userName})
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}