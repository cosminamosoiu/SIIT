function removecolor() {
    var x = document.getElementById("colorSelect");
    var optionSelected= x.options[x.selectedIndex].text;
    for (i = 0; i<x.length;  i++) {
        if (x.options[i].value === optionSelected) {
          x.remove(i);
        }
     }
}