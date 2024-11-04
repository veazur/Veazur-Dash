const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/', (req, res) => {
    const { username, email, password } = req.body;
    res.send('Signup successful!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
