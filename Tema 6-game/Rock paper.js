var options = ["Rock", "Paper", "Scissors"];
var userValue = "";
var computerValue = "";
function generateOptions(type) {
  var index = 0;
  index = Math.floor(Math.random() * 3);
  if (type === "user") {
    userValue = index;
    document.getElementById("userValue").value = options[index];
    document.getElementById("userButton").disabled = true;
  } else if (type === "computer") {
    computerValue = index;
    document.getElementById("computerValue").value = options[index];
    document.getElementById("computerButton").disabled = true;
  }
  if (
    document.getElementById("userValue").value != "" &&
    document.getElementById("computerValue").value != ""
  ) {
    var finalWinner = getWinner(userValue, computerValue);
    document.getElementById("winner").innerHTML = finalWinner;
  }
}

function getWinner(useValue, computerValue) {
  if (userValue === computerValue) {
    displayDraw();
    return `It's a draw`;
  } else if (userValue === 0 && computerValue === 1) {
    displayPaper();
    return "Computer wins";
  } else if (userValue === 0 && computerValue === 2) {
    displayRock();
    return "Player wins";
  } else if (userValue === 1 && computerValue === 0) {
    displayPaper();
    return "Player wins";
  } else if (userValue === 2 && computerValue === 0) {
    displayRock();
    return "Computer wins";
  } else if (userValue === 1 && computerValue === 2) {
    displayScissors();
    return "Computer wins";
  } else if (userValue === 2 && computerValue === 1) {
    displayScissors();
    return "Player wins";
  }
}
function reset() {
  document.getElementById("userButton").disabled = false;
  document.getElementById("userValue").value = "";
  document.getElementById("computerButton").disabled = false;
  document.getElementById("computerValue").value = "";
  document.getElementById("winner").innerHTML = "";
  document.getElementById("winnerImage").innerHTML = "";
}
function displayRock() {
  var img = document.createElement("img");
  img.src = "img1.jpg";
  document.getElementById("winnerImage").appendChild(img);
}
function displayPaper() {
  var img = document.createElement("img");
  img.src = "img2.jpg";
  document.getElementById("winnerImage").appendChild(img);
}
function displayScissors() {
  var img = document.createElement("img");
  img.src = "img3.jpg";
  document.getElementById("winnerImage").appendChild(img);
}
function displayDraw() {
  var img = document.createElement("img");
  img.src = "draw.jpeg";
  document.getElementById("winnerImage").appendChild(img);
}
