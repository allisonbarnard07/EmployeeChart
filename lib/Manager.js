const Employees = require ("./employees");

class Manager extends Employee{
    constructor (name, id, email, office){
    super (name, id, email);
    this.office = office;
}
getOffice() {
    return this.office;
}
getPosition(){
    return "Manager";
}
}

module.exports = Manager