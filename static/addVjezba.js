var v=new Validacija(document.getElementById("dodavanje2"));
var sAjax;

function popuniSelecte() {
    var s1=document.getElementById("s1");
    var s2=document.getElementById("s2");
    var s3=document.getElementById("s3");
    var s4=document.getElementById("s4");
    var s5=document.getElementById("s5");

    sAjax=new UcitajSelect();

    sAjax.selectGodine(s1);
    sAjax.selectGodine(s2);
    sAjax.selectVjezbe(s3);
    sAjax.selectVjezbe(s4);
    sAjax.selectZadaciZaVjezbu(s5,s4);
    console.log("hey "*4);
}

function posaljiZahtjev() {
    var forma=document.getElementById("dodavanje3");
    var select=document.getElementById("s4");
    forma.action="http://localhost:8080/vjezba/"+s4.options[s4.selectedIndex].value+"/zadatak";
    console.log(form.action);
}

function validate() {
    var input=document.getElementsByName("naziv")[0];
    v.naziv(input);
}

function loadZadaci() {
    sAjax.selectZadaciZaVjezbu(s5,s4);
}