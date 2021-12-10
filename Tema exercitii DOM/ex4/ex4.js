function getAttributes() {
   var a = document.getElementById("w3r").href;
   var b = document.getElementById("w3r").rel;
   var c = document.getElementById("w3r").target;
   var d = document.getElementById("w3r").type;
   var e = document.getElementById("w3r").hreflang;

   alert ("The href attribute value is: " + a);
   alert ("The rel attribute value is: " + b); 
   alert ("The target attribute value is: " +c); 
   alert ("The type attribute value is: " +d); 
   alert ("The hreflang attribute value is:" +e); 
}