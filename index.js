const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/signup-confirm', (req, res) => {
    const apiKey = process.env.PTERO;
    const apiUrl = 'https://panel_link/api/application/users';

    axios({
        method: 'post',
        url: apiUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        data: {
            email: req.body.email,
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }
    })
    .then(response => {
        console.log(response.data);
        res.send('User created successfully');
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Error creating user');
    });
});

app.listen(port, () => {
    console.log(`Veazur Client is running on http://localhost:${port}`);
});