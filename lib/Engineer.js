const Employee = require("./employees");

class Engineer extends Employee {
    constructor (name, id, email, github){
        super (name, id, email, github);
        this.github = github
    }
    getGitHub(){
        return this.github;
    }
    getPosition(){
        return 'Engineer';
    }
}

module.exports = Engineer