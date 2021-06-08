const express = require('express')
const flash = require('express-flash')
const app = express()
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const connectDB = require('./config/database')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const PORT = 5000

/* Routes  */
const authRoutes = require('./routes/authRoutes')
const apiRoutes = require('./routes/api')

require('./config/passport')(passport)
connectDB()

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET, HEAD, PUT, POST, DELETE',
        credentials: true
    })
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//Update me to use public when tesing dev
app.use(express.static(path.resolve(__dirname, './client/public')))
// app.use(express.static(path.resolve(__dirname, './client/build')))

app.use('/auth', authRoutes)
app.use('/api/', apiRoutes)

// Update me to use public when testing in dev
app.get('*', (request, response) => {
    response.sendFile(
        path.resolve(__dirname, './client/public', 'index.html')
        // path.resolve(__dirname, './client/build', 'index.html')
    )
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
