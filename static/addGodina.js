var v=new Validacija(document.getElementById("side"));

function validate() {
    var nazif1=document.getElementsByName("nazivGod")[0];
    var nazif2=document.getElementsByName("nazivRepVje")[0];
    var nazif3=document.getElementsByName("nazivRepSpi")[0];
    v.naziv(nazif1);
    v.naziv(nazif2);
    v.naziv(nazif3);

    if(nazif1.style.backgroundColor!="white" || nazif2.style.backgroundColor!="white" || nazif3.style.backgroundColor!="white") {
        return false;
    }
    return true;
}

function pozoviAjax() {
    var a=new GodineAjax(document.getElementById("glavniSadrzaj"));
    a.osvjezi();
}