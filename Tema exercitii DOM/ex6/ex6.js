function changeContent() {
    if(document.getElementById("rowNumber").value != 'insert row number 0-2' && document.getElementById("colNumber").value != 'insert column number 0-1'){
        var row = document.getElementById("myTable").rows;
        var x = document.getElementById("rowNumber").value;
        var y = document.getElementById("colNumber").value;
        var col = row[x].cells;
        col[y].innerHTML = document.getElementById("text").value
    }
    else{
        alert("Insert values");
    }
}