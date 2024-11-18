const express = require('express');
const axios = require('axios');
require('dotenv').config({ path: './.env' });
const bodyParser = require('body-parser');
const fs = require('fs');
const Sequelize = require('sequelize');

const app = express();
const port = process.env.PORT;

const db = new Sequelize('database_name', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const loggedUsers = db.define('logged_users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const accounts = require('./accounts.json');

app.post('/signup-confirm', (req, res) => {
    const apiKey = process.env.PTERO;
    const apiUrl = `${process.env.PANEL_LINK}/api/application/users`;
  
    const userData = {
      email: req.body.email,
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    };
  
    axios({
      method: 'post',
      url: apiUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      data: userData
    })
    .then(response => {
      const userId = response.data.id; 
      console.log(`User created with ID: ${userId}`);
    
      accounts.push({
        ...userData,
        id: userId
      });
      const accountsJson = JSON.stringify(accounts, null, 2);
      fs.writeFileSync('./accounts.json', accountsJson);
    
      res.redirect('/login');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error creating user');
    });
  });

  app.post('/login-confirm', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (accounts.length === 0) {
      console.log('No accounts found');
      res.status(404).send('No accounts found');
    } else {
      const account = accounts.find(account => account.email.trim().toLowerCase() === username.trim().toLowerCase());
  
      if (!account) {
        console.log('No matching account found for email:', username);
        res.status(401).send('Invalid email');
      } else {
        console.log('Matching account found:', account.email);
        if(password === account.password){
          console.log('User authenticated successfully');
          db.model('logged_users').create({
            email: account.email,
            username: username
          }).then(() => {
            req.session.username = username;
            res.redirect('/dash');
          }).catch(error => {
            console.error(error);
            res.status(500).send('Error storing login information');
          });
        } else {
          console.log('Invalid email or password');
          res.status(401).send('Invalid email or password');
        }
      }
    }
  });

  app.get('/dash', (req, res) => {
    if (req.session.loggedinUser) {
      res.send(`Welcome, ${req.session.loggedinUser.username} | Email: ${req.session.loggedinUser.email}`);
    } else {
      res.status(401).send('You are not logged in');
    }
  });
  

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/dash', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

app.get('/404', (req, res) => {
  res.sendFile(__dirname + '/public/404.html');
});

app.get("/*", (req, res) => {
  res.redirect("/404");
});

app.listen(port, () => {
  console.log(`Veazur Client is running on http://localhost:${port}`);
});