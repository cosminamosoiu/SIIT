function getOptions(){
    var x = document.getElementById("mySelect");
    var y=1; 
    for (i = 0; i<x.length;  i++) {
         var aux = y + '.' + x.options[i].value;
          alert (aux);
          y++;
        }
}