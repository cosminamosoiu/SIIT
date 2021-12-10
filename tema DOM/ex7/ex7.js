function createTable() {
    var x= document.getElementById("rows").value;
    var y= document.getElementById("cells").value;
    for(var i = 0; i<x; i++ ){
        var aux = document.getElementById('myTable').insertRow(i);
        for(var j = 0; j<y; j++ ){
            var aux2 = aux.insertCell(j);
            aux2.innerHTML = "Row " + i + ' ' + "Cell " +j;
        }
    }
}