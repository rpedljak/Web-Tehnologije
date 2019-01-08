var v=new Validacija(document.getElementById("student"));

function validate() {
    var input=document.getElementsByName("query")[0];
    v.ime(input);
}