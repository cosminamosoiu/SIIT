function Actor(id, characterName, actorName, pictureURL, yearOfBirth) {
    Person.apply(this, [actorName, 'male']);
    this.id = id;
    this.characterName = characterName;
    this.actorName = actorName;
    this.pictureURL = pictureURL;
    this.yearOfBirth =yearOfBirth;
    this._hasIdOrName = Boolean(this.id || this.actorName);
}

Actor.prototype = Object.create(Person.prototype);


Actor.prototype.getRow = function(){
    
    return  `<tr>
    <td>${this.id}</td>
    <td>${this.characterName}</td>
    <td>${this.actorName}</td>
    <td><img src="${this.pictureURL}"></td>
    <td>${this.yearOfBirth}</td>
    <td><button class="remove">Remove</button></td></tr>`;
}

Actor.prototype.toString = function() {
    if (this._hasIdOrName) {
        return this.actorName + ' is playing the next role: ' + this.characterName;
    } 
    return 'Invalid actor'; 
}

Actor.prototype.walk = function() {
    Person.prototype.walk.call(this);
    console.log('The actor ' + this.name + ' is listening to music');
}