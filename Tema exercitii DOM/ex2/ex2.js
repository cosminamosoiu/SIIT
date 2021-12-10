
function getFormvalue() {
    var fullName = '';
    fullName = document.getElementsByName("fname")[0].value + ' ' + document.getElementsByName("lname")[0].value
    alert (fullName);
}