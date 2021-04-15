require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const loginRoutes = require('./routes/loginRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const connectDB = require('./config/database')
const PORT = 8080;


app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectDB();

app.use('/login', loginRoutes);
app.use('/register', registrationRoutes);

app.get('/post', (request, response) => {
    (async () => {
        const myHeaders = {'Authorization':`Bearer ${process.env.KEY}`}

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const data = await fetch("https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco", requestOptions);
        const res = await data.json()
        response.json(res);
    })()
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })