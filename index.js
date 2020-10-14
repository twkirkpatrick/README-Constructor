const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your project title?",
            name: "title"
        },
        {
            type: "input",
            message: "Enter a description for your project:",
            name: "description"
        },
        {
            type: "input",
            message: "Enter installation instructions so developers can easily access your application:",
            name: "installation"
        },
        {
            type: "input",
            message: "Give precise details on how to use this application:",
            name: "usage"
        },
        {
            type: "input",
            message: "Enter guidelines for how to contribute to this project:",
            name: "contribution"
        },
        {
            type: "input",
            message: "Enter test instructions for your project:",
            name: "test"
        },
        {
            type: "input",
            message: "What is your Github username?",
            name: "github"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        },
       
    ]);
};

function generateReadMe(answers){
    return `# ${answers.title}
${answers.description}

## Installation
${answers.installation}
    
    
    
    `
};

promptUser()
.then(function(answers){
    const readme = generateReadMe(answers);
    return writeFileAsync("README.md", readme);
})
.then(function(){
    console.log("Your README has successfully been generated!");
})
.catch(function(err){
    console.log(err);
})

