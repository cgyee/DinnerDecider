const express = require('express');
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

app.use('/auth', authRoutes);
// app.use('/api/address', addressRoutes)
app.post('/login/attempt', async (req, res) => {
    const data = await req.body.does
    console.log(data)
})
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../frontend/public', 'index.html'));
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })