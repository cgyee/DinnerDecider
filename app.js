const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const { response } = require('express');
const uri = `mongodb+srv://admin:${process.env.dbPASSWORD}@gettingstarted.1jz8f.mongodb.net/${process.env.dbNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('dotenv').config();
const PORT = 8080;

app.get('/input/:text', (request, response) => {
    const result = request.params.text;
    response.json({'result':result});
})

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

app.get('/categories/:text', (request, response) => {
    const  param = request.params.text;
    (async () => {
        const myHeaders = {'Authorization':`Bearer ${process.env.KEY}`}

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const data = await fetch(`https://api.yelp.com/v3/businesses/search?location=33309&categories=${param}`, requestOptions);
        const res = await data.json()
        response.json(res);
    })()
});

app.post('/login/attempt', (request, response) => {
    console.log(request.body);
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })