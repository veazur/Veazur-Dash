const axios = require('axios');
const inquirer = require('inquirer');
require('dotenv').config({ path: './.env' });

async function signUp() {
    const prompt = inquirer.createPromptModule();

    try {
        const answers = await prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'First Name:'
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'Last Name:'
            },
            {
              type: 'input',
              name: 'email',
              message: 'Email:'
            },
            {
              type: 'password',
              name: 'password',
              message: 'Password:'
            },
            {
              type: 'input',
              name: 'username',
              message: 'Username:'
            }
        ]);

        const userData = {
          email: answers.email,
          username: answers.username,
          first_name: answers.first_name,
          last_name: answers.last_name,
          password: answers.password
        };

        const apiKey = process.env.PTERO;
        const url = `https://${process.env.PANEL_LINK}/api/application/users`;

        axios({
          method: 'post',
          url: url,
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

          const fs = require('fs');
          const accountsJson = JSON.stringify(userData, null, 2);
          fs.writeFileSync('./accounts.json', accountsJson);

          console.log(`User created successfully with ID: ${userId}`);
        })
        .catch(error => {
          console.error(error);
          console.log('Error creating user');
        });
    } catch (err) {
        console.error(err);
    }
}

signUp();