const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

let badge;

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
            message: "Which license would you like?",
            choices: ["Apache 2.0", "BSD 2", "BSD 3", "GNU (GPL v3)", "GNU (LGPL v3)", "MIT", "Mozilla 2.0"],
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

${badge}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributions](#contributions)
* [Testing](#testing)
* [Questions](#questions)
* [License](#license)


## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributions
${answers.contributions}

## Testing
${answers.test}

## Questions
If you have any further questions, feel free to reach out to me! <br>
<a href='https://www.github.com/${answers.github}'>Github</a> <br>
<a href='mailto:${answers.email}'>${answers.email}</a>

## License
Usage is provided under the ${answers.license} license.
    
    
    
    `
};

function chooseBadge(answers){
    if(answers.license === 'Apache 2.0'){
        badge = '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)'
    } else if(answers.license === 'BSD 2'){
        badge = '![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)'
    } else if (answers.license === 'BSD 3'){
        badge = '![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)'
    } else if (answers.license === 'GNU (GPL v3)'){
        badge = '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)'
    } else if (answers.license === 'GNU (LGPL v3)'){
        badge = '![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)'
    } else if (answers.license === 'MIT'){
        badge = '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)'
    } else if (answers.license === 'Mozilla 2.0'){
        badge = '![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)'
    }
}

promptUser()
.then(function(answers){
    
    chooseBadge(answers)
    const readme = generateReadMe(answers);
    
    return writeFileAsync("sampleREADME.md", readme);
})
.then(function(){
    console.log("Your README has been successfully generated!");
})
.catch(function(err){
    console.log(err);
})

