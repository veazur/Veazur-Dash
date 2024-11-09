const axios = require('axios');
const fs = require('fs');
require('dotenv').config({ path: './.env' });

const accounts = require('./accounts.json');

async function register() {
  const email = await askForInput('Enter your email address:');
  const username = await askForInput('Enter your username:');
  const firstName = await askForInput('Enter your first name:');
  const lastName = await askForInput('Enter your last name:');
  const password = await askForPassword('Enter your password:');

  const apiKey = process.env.PTERO;
  const apiUrl = `${process.env.PANEL_LINK}/api/application/users`;

  const userData = {
    email,
    username,
    first_name: firstName,
    last_name: lastName,
    password
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
    console.log('User created successfully!');

    accounts.push({
      ... userData
    });
    const accountsJson = JSON.stringify(accounts, null, 2);
    fs.writeFileSync('./accounts.json', accountsJson);
  })
  .catch(error => {
    console.error(error);
  });
}

async function askForInput(message) {
  return new Promise(resolve => {
    process.stdout.write(`${message} `);
    process.stdin.resume();
    process.stdin.on('data', data => {
      process.stdin.pause();
      resolve(data.toString().trim());
    });
  });
}

async function askForPassword(message) {
  return new Promise(resolve => {
    process.stdout.write(`${message} `);
    process.stdin.resume();
    process.stdin.on('data', data => {
      process.stdin.pause();
      resolve(data.toString().trim());
    });
  });
}

register();