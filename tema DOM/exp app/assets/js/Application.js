function Application() {
  this.name = "Actors list";
  this.tableElement = $("#crew-list");
  this.tableBodyElement = $("#crew-list").find("tbody");
  this.actorsList = [];
}

/*
Application.prototype = {
    init: function() {},
    _onRemoveButton: function() {}
}*/

Application.prototype.init = function () {
  this._addEventListeners();
  this.loadActors();
};

Application.prototype._onRemoveButton = function () {
  console.log("remove");
  $(this).closest("tr").remove();
};

Application.prototype._addEventListeners = function () {
  this.tableElement.on("click", ".remove", this._onRemoveButton);
};

Application.prototype.loadActors = function () {
  $.ajax({
    method: "GET",
    url: "/data/actors.json",
    success: (actors) => this.onActorsLoaded(actors),
    error: this.onError,
  });
};

Application.prototype._render = function (filterText = "") {
  this.destroyTable();
  this.actorsList
    .filter(
      (item) =>
        !filterText || (filterText && item.actorName.includes(filterText))
    )
    .forEach((actor) => {
      var row = actor.getRow();
      this.tableBodyElement.append(row);
    });
};

Application.prototype.onActorsLoaded = function (actors) {
  actors.forEach(
    ({
      id,
      characterName,
      actorName,
      pictureURL,
      yearOfBirth = "Not provided",
    }) => {
      var actor = new Actor(
        id,
        characterName,
        actorName,
        pictureURL,
        yearOfBirth
      );
      this.actorsList.push(actor);
    }
  );
  this._render();
  /**this.interval = setInterval(() => {
        var actor = new Actor(1001, 'Margelatu', 'Florin Piersic ' + new Date().getTime(), '', '1948');
        var row = actor.getRow();
        this.tableBodyElement.append(row);
        this.actorsList.push(actor);
    }, 3000);
    */
};

Application.prototype.onError = function (jqXhr, textStatus) {
  console.log("textStatus: ", textStatus);
};

Application.prototype.destroyTable = function () {
  this.tableBodyElement.empty();
  clearInterval(this.interval);
};
