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
            type: "list",
            message: "Which license(s) would you like?",
            choices: ["Apache License 2.0", "BSD 3-Clause 'New' or 'Revised' license", "BSD 2-Clause 'Simplified' or 'FreeBSD' license", "GNU General Public License (GPL)", "GNU Library or 'Lesser' General Public License (LGPL)", "MIT license", "Mozilla Public License 2.0", "Common Development and Distribution License", "Eclipse Public License version 2.0"],
            name: "license"
        },
        {
            type: "input",
            message: "Enter guidelines for how to contribute to this project:",
            name: "contributions"
        },
        {
            type: "input",
            message: "Enter test instructions for your project:",
            name: "tests"
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

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributions](#contributions)
* [Test](#test)
* [Questions](#questions)


## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.license}

## Contributions
${answers.contributions}

## Tests
${answers.tests}

## Questions
${answers.github}
${answers.email}
    
    
    
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

