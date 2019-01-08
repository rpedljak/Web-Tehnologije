var v=new Validacija(document.getElementById("dodavanje2"));

function validate() {
    var input=document.getElementsByName("naziv")[0];
    v.naziv(input);
}