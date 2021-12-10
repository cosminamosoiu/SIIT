var crewProperties = [
  {
    id: 1,
    characterName: "El Profesor",
    actorName: "Álvaro Morte",
    pictureUrl:
      "https://m.media-amazon.com/images/M/MV5BZGVlMTQyODEtNTlmZS00MTg1LWEwNmYtZmRlNjFmNzg0MDNhXkEyXkFqcGdeQXVyMTA0MjU0Ng@@._V1_UX214_CR0,0,214,317_AL_.jpg",
  },
  {
    id: 2,
    characterName: "Tokio",
    actorName: "Úrsula Corberó",
    pictureUrl:
      "https://m.media-amazon.com/images/M/MV5BMjBkMTc4ODctY2U1NC00NjQzLTliYTItZDM1MTkwNWNmODRjXkEyXkFqcGdeQXVyMjQwMDg0Ng@@._V1_UY317_CR51,0,214,317_AL_.jpg",
  },
];
var contor = "";
function addData() {
  for (var i = 0; i < crewProperties.length; i++) {
    var displayedImage = `<img  src="${crewProperties[i].pictureUrl}"/>`;
    $("#crewList").append(
      `<tr>
           <td>${crewProperties[i].id}</td>
           <td>${crewProperties[i].characterName}</td>
           <td>${crewProperties[i].actorName}</td>
           <td id="tablePicture">${displayedImage}</td>
           <td><button class="removeCharacter">Remove</button></td>
      </tr>`
    );
  }
}
$(document).ready(function () {
  addData();

  $("#addCrew").on("click", function () {
    $("#crewForm").slideDown();
  });

  $("#saveCrewMember").on("click", function () {
    var newData = {
      id: $("#idForm").val(),
      characterName: $("#characterFormName").val(),
      actorName: $("#actorFormName").val(),
      pictureUrl: $("#picture").val(),
    };
    crewProperties.push(newData);
    var newPicture = `<img src="${newData.pictureUrl}"/>`;
    $("#crewList").append(
      `<tr>
        <td>${newData.id}</td>
        <td>${newData.characterName}</td>
        <td>${newData.actorName}</td>
        <td id="tablePicture">${newPicture}</td>
        <td><button class="removeCharacter">Remove</button></td>
      </tr>`
    );
  });

  $("#saveCrewMember").on("click", function () {
    $("#crewForm").fadeOut("slow", function () {
      $("#crewForm").trigger("reset");
    });
  });
});

$(document).on("click", ".removeCharacter", function () {
  $(this).closest("tr").remove();
});
