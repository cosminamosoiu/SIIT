function insert_Row(){
    var table = document.getElementById( 'sampleTable' ),
      row = table.insertRow(table.getElementsByTagName("tr").length),
      rowNumber = table.getElementsByTagName("tr").length;
      cell1 = row.insertCell(0),
      cell2 = row.insertCell(1);
  cell1.innerHTML = 'Row' + rowNumber  + ' cell1';
  cell2.innerHTML = 'Row' + rowNumber + ' cell2';
}