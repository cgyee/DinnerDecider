require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const session = require('express-session')
const app = express();
const loginRoutes = require('./routes/loginRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const connectDB = require('./config/database')
const PORT = 8080;

app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

// connectDB();

// app.use('/login', loginRoutes);
// app.use('/register', registrationRoutes);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })