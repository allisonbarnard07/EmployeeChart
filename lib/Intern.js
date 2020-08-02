const Employee = require ("./employees");

class Intern extends Employee {
    constructor(name, id, email, school){
    super (name, id, email);
    this.school = school
}
getSchool(){
    return this.school;
}
get Position(){
    return "Intern";
}
}

module.exports = Intern
