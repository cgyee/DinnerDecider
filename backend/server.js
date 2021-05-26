const express = require('express');
const flash = require('express-flash')
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/database');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session)
const path = require('path');
const PORT = 5000;

/* Routes  */
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/api')


require('./config/passport')(passport);
connectDB();

app.use(cors({
    origin:'http://localhost:3000',
    methods:'GET, HEAD, PUT, POST',
    credentials:true
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(express.static(path.resolve(__dirname, '../frontend/public')));

app.use('/auth', authRoutes);
app.use('/api/', apiRoutes)
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../frontend/public', 'index.html'));
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })