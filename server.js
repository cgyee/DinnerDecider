const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const connectDB = require('./config/database')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
/* Used to create schema from our custom GraphQLObject */
const { graphqlHTTP } = require('express-graphql')
const { GraphQLSchema } = require('graphql')
const { pollQueryType } = require('./graphqlschemas/Poll')
const path = require('path')
const PORT = 5000

/* Routes  */
const authRoutes = require('./routes/authRoutes')
const apiRoutes = require('./routes/api')

//Configuring Express middleware
require('./config/passport')(passport)
connectDB()

/* 
This is used in dev enviroment to do send cookies request/response with CORS, as React runs on port 3000 and Node on port 5000
Unnecesary in production as requests/response come from the same origin
*/
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

process.env.PRODUCTION
    ? app.use(express.static(path.resolve(__dirname, './client/build')))
    : app.use(express.static(path.resolve(__dirname, './client/public')))

if (process.env.production) {
} else {
    //Update me to use public when tesing dev
}

/* This is where our authentication routes and api routes are */
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)

/* Creating a new schema based on the  type pollQueryType */
const schema = new GraphQLSchema({ query: pollQueryType })
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
)

//If a GET request is made to any route not specified just run the index file
// Update me to use public when testing in dev
app.get('*', (request, response) => {
    response.sendFile(
        process.env.PRODUCTION
            ? path.resolve(__dirname, './client/build', 'index.html')
            : path.resolve(__dirname, './client/public', 'index.html')
    )
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
