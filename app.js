const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
app.use(cors())
const PORT = 8080;

app.get('/input/:text', (request, response) => {
    const result = request.params.text;
    response.json({'result':result});
})

app.get('/post', (request, response) => {
    (async () => {
        const myHeaders = {'Authorization':`Bearer ${key}`}

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
        const myHeaders = {'Authorization':`Bearer ${key}`}

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const data = await fetch(`https://api.yelp.com/v3/businesses/search?location=33309&categories=${param}`, requestOptions);
        const res = await data.json()
        response.json(res);
    })()
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
  })