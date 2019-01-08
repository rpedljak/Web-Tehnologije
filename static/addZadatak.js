var v=new Validacija(document.getElementById("glavniSadrzaj"));

function validate() {
    var naziv=document.getElementById("nazivZadatka");
    v.naziv(naziv);

    return (naziv.style.backgroundColor!='orangered');
}