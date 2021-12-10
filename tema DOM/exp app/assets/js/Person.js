function Person(name, gender) {
    this.name = name;
    this.gender = gender;
}

Person.prototype.walk = function() {
    console.log(this.name + ' is walking');
}