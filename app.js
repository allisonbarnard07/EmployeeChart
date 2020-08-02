const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeeList = [];
const managerQuestions = [
    {   ///Input manager's name
        type: "input",
        name: "name",
        message: "What is the manage's name?",
        validate: async (input) => {
            ///Validating name - Not blank
            if (input == "" || /\s/.test(input)) {
                return "Please enter manager's first and last name.";
            }
            return true;
        }
    },
    {   ///Input manger's email
        type: "input",
        name: "email",
        message: "What is the manager's email?",
        validate: async (input) => {
            //Validating email
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email.";
        }
    },
    {   ///Input manager's office number
        type: "input",
        name: "office",
        message: "What is the manager's office number?",
        validate: async (input) => {
            ///Validating office number - only has numbers
            if (isNaN(input)) {
                return "Please only enter numbers.";
            }
            return true;
        }
    },
    {   ///Creating an employee list
        type: "Employee List",
        name: "Team",
        message: "Do you have any team members?",
        choices: ["Yes", "No"]
    }
]

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "Please enter employee's name.",
        validate: async (input) => {
            ///Validating name - Not blank
            if (input == "") {
                return "Please enter employee's name.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter employee's email:",
        validate: async (input) => {
            ///Validating email
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email.";
        }
    },
    {
        type: "EmployeeList",
        name: "role",
        message: "What is their role?",
        choices: ["engineer", "intern"]
    },
    {
        when: input => {
            return input.role == "Intern"
        },
        type: "input",
        name: "school",
        message: "Enter Intern's school name:",
        validate: async (input) => {
            //Validate name - Not blank
            if (input == "") {
                return "Please enter a valid school name.";
            }
            return true;
        }
    },
    {
        when: input => {
            return input.role == "Engineer"
        },
        type: "input",
        name: "github",
        message: "Please enter Engineer's GitHub username.",
        validate: async (input) => {
            ///Validating username - not blank
            if (input == "" || /\s/.test(input)) {
                return "Please enter a valid GitHub username";
    }
    return true
}
    },
    {
        type: "Employee List",
        name: "add",
        message: "Would you like to add another team member?",
        choices: ["Yes", "No"]
    }
]

//Building the lists

function buildemployeeList(){
    inquirer.prompt(employeeQuestions).then(employeeInfo => {
        if (employeeInfo.role == "engineer") {
            var newMember = new Engineer(employeeInfo.name, teamList.lengeth + 1, employeeInfo.email, employeeInfo.github);
        } else { var newMember = new Intern(employeeInfo.name, teamList.lengeth + 1, employeeInfo.email, employeeInfo.school);
        }
        employeeList.push(newMember);
        if (employeeInfo.add === "Yes"){
            console.log("");
            buildemployeeList();
        }
        else {
            buildHTMLPage();
        }
    })
}

function buildHTMLPage(){
    var newFile = fs.readFileSync("./templates/main.html")
    fs.writeFileSyncc("./output/team.html", newFile, function (err) {
        if (err) throw err;
    })

    console.log("Employee HTML shell page generated!");

    for (member of employeeList){
        if (member.getRole() == "Manager") buildHtmlCard("manager", member.getName(), member.getId(), member.getEmail(), "Office: " + member.getOffice());
    } if (member.getRole() == "Engineer") {
        buildHtmlCard("engineer", member.getName(), member.getId(), member.getEmail(), "Github: " + member.getGithub());
    } if (member.getRole() == "Intern") {
        buildHtmlCard("intern", member.getName(), member.getId(), member.getEmail(), "School: " + member.getSchool());
    }
}
        fs.appendFileSync("./team.html", "</div></main></body></html>", function (err) {
            if (err) throw err;
        });
        console.log("HTMLpage has been built!")
    

    function buildHtmlCard(memberType, name, id, email, propertyValue) {
        let data = fs.readFileSync(`./templates/${memberType}.html`, 'utf8')
        data = data.replace("nameHere", name);
        data = data.replace("idHere", `ID: ${id}`);
        data = data.replace("emailHere", `Email: <a href="mailto:${email}">${email}</a>`);
        data = data.replace("propertyHere", propertyValue);
        fs.appendFileSync("./teamPage.html", data, err => { if (err) throw err; })
        console.log("Card appended");
    }

    function init() {
        inquire.prompt(managerQuestions).then(managerInfo => {
            let teamManager = new Manager(managerInfo.name, 1, managerInfo.email, managerInfo.officeNum);
            employeeList.push(teamManager);
            console.log(" ");
            if (managerInfo.hasTeam === "Yes") {
                buildemployeeList();    
            } else {
                buildHtmlPage();
            }
        })
    }
    
