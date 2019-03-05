const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const axios = require('axios');

const dist = path.resolve('./view', 'dist');
const { blockcypher } = require('./config');

app.use(express.static(dist));
app.use

console.log(path.resolve(dist, 'index.html'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(dist, 'index.html'));
});

app.get('/api/address/:publickey', (req, res) => {
    const { baseURL, addressApi, suffixApi } = blockcypher;
    const publicKey = req.params.publickey;
    console.log(publicKey)
    axios
        .get(`${baseURL}/${addressApi}/${publicKey}/${suffixApi}`)
        .then((resAxios) => {
            console.log(resAxios.data);
            res.status(200).send(resAxios.data);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
});

module.exports = app;
