require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session)

const fetch = require('node-fetch');
const loginRoutes = require('./routes/loginRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/database');
const PORT = 8080;

require('./config/passport')(passport);

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:  new MongoStore({ mongooseConnection: mongoose.connection }),
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.resolve(__dirname, '../frontend/public')));

app.use('/api/login', loginRoutes);
app.use('/api/register', registrationRoutes);

app.use('/auth', authRoutes);

app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../frontend/public', 'index.html'));
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })