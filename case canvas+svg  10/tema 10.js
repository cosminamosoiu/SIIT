function init() {
  var canvas = document.getElementById("canvas");

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#cc3300";
    ctx.fillRect(200, 200, 150, 150);

    ctx.fillStyle = "#ac7339";
    ctx.fillRect(220, 220, 40, 40);
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "black";
    ctx.strokeRect(220, 220, 40, 40);

    ctx.fillStyle = "#ac7339";
    ctx.fillRect(290, 220, 40, 40);
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "black";
    ctx.strokeRect(290, 220, 40, 40);

    ctx.fillStyle = "#ac7339";
    ctx.fillRect(262, 300, 30, 50);
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = "black";
    ctx.strokeRect(262, 300, 30, 50);

    ctx.fillStyle = "#FF2400";
    ctx.beginPath();
    ctx.moveTo(180, 200);
    ctx.lineTo(270, 110);
    ctx.lineTo(370, 200);
    ctx.fill();
  }
}

onload = init;
