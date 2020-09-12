const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');
const generateMarkdown = require('./utils/generateMarkdown')
// array of questions for user
const questions = [  
 {
    type: 'input',
    message: 'What is the title?',
    name: 'title'
 },
 {
    type: 'input', 
    name: 'description',
     message: 'What is the app for?'
 },
 {
    type: 'input',  
    name:'installation',
     message: 'How do you install the app?'
 },
 {
    type: 'input',  
    name: 'usage',
     message: 'How do you use the app?'
 },
 {
    type: 'input',
    name: 'credits',
    message: 'List of Collaborators'
 },
 {
    type: 'list',  
    name: 'license',
    choices: ['MIT', 'GPLv3', 'AGPL'],
     message: 'Choose license'
 },
 {
    type: 'input',  
    name: 'contributions',
     message: 'How do other devs make contribtions?'
 },
 {
     type: 'input',
     name: 'tests',
     message: 'tests you would like to run?'
 },
 {
    type: 'input',  
    name: 'issues',
     message: 'How are issues reported?'
 },
 {
     type: 'input',
     name: 'gitHubUsername',
     message: 'what is your gitHub username?'
 },
 {
    type: 'input',
    name: 'email',
    message: 'what is your email?'
}
];

 



// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function(error){
      console.log('success')
  })
}

// function to initialize program
function init() {
   inquirer.prompt(questions).then(function(data){

    axios.get('https://api.github.com/users/willhall123').then(function(results){
        data.githubProfile = results.data.html_url  
        const readme = generateMarkdown(data);
        writeToFile('./README.md', readme)
    })
       
   });
}

// function call to initialize program
init();
