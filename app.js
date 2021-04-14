require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = 8080;

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://admin:${process.env.dbPASSWORD}@gettingstarted.1jz8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
    (async () => {
        try {
            await client.connect();
            const database = await client.db("gettingStarted");
            const table = await database.collection('people');
            const res = await table.findOne(request.body);
            console.log(res);

        }
        catch (err) {
            console.log(err);
        }
        finally {
            await client.close();
        }
    })()
})

app.post('/register/new', (request, response) => {
    console.log(request.body);
    (async () => {
        try {
            await client.connect();
            const database = await client.db("gettingStarted");
            const table = await database.collection('people');
            const res = await table.insertOne(request.body);

        }
        catch (err) {
            console.log(err);
        }
        finally {
            await client.close();
        }
    })()
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })