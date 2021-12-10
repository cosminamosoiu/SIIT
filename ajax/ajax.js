

$(document).ready(function () {
    /*function reqListener () {
      console.log(this);
      //console.log(this.responseText);
    }
    
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://jsonplaceholder.typicode.com/todos1/");
    oReq.send();*/
    function onActorsLoaded(actors) {
        actors.forEach( ({ id, characterName, actorName, pictureURL, yearOfBirth = 'Not provided' }) => {
            var row = `<tr>
                <td>${id}</td>
                <td>${characterName}</td>
                <td>${actorName}</td>
                <td><img src="${pictureURL}"></td>
                <td>${yearOfBirth}</td>
                <td><button class="removeCharacter">Remove</button></td></tr>`;
            $('#crewList tbody').append(row);
        })
    }

    

  $("#addCrew").on("click", function () {
      $("#crewForm").slideDown();
      });
  
  $("#saveCrewMember").on("click", function () {
    var birthDate = '';
    if ($("#yearOfBirthForm").val() === ""){
      birthDate = "Not provided";
    }else{
       birthDate = $("#yearOfBirthForm").val();
      }
    var newData = {
      id: $("#idForm").val(),
      characterName: $("#characterFormName").val(),
      actorName: $("#actorFormName").val(),
      pictureUrl: $("#picture").val(),
      yearOfBirth: birthDate,
    };
    var newPicture = `<img src="${newData.pictureUrl}"/>`;
    $("#crewList").append(
      `<tr>
        <td>${newData.id}</td>
        <td>${newData.characterName}</td>
        <td>${newData.actorName}</td>
        <td id="tablePicture">${newPicture}</td>
        <td>${newData.yearOfBirth}</td>
        <td><button class="removeCharacter">Remove</button></td>
      </tr>`
    );
  });

  $("#saveCrewMember").on("click", function () {
        $("#crewForm").fadeOut("slow", function () {
          $("#crewForm").trigger("reset");
        });
      });

  $(document).on("click", ".removeCharacter", function () {
      $(this).closest("tr").remove();
   });


   function onError(jqXhr, textStatus) {
        console.log('textStatus: ', textStatus);
    }

    $.ajax({
        method: 'GET',
        url: '/actors.json',
        success: onActorsLoaded,
        error: onError
    });
});


