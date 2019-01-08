var tabela;
var v;
var maxZadaci;

function kreirajTabelu(){
    var mojDiv=document.getElementById("glavni");
    var brojZadataka=document.getElementById("velicinaTabele").value;

    if(Number(brojZadataka)<=0) {
        document.getElementById("velicinaTabele").style.backgroundColor="orangered";
    }
    else {
        document.getElementById("velicinaTabele").style.backgroundColor="white";
        tabela=new CommitTabela(mojDiv,Number(brojZadataka));
        v=new Validacija(mojDiv);

        maxZadaci=brojZadataka;

        document.getElementById("kreiraj").disabled=true;
        document.getElementById("obrisi").disabled=false;
    }
}

function obrisiTabelu() {
    document.getElementById("commiti").parentNode.removeChild(document.getElementById("commiti"));

    document.getElementById("kreiraj").disabled=false;
    document.getElementById("obrisi").disabled=true;
}

function dodajCommit() {
    var rbZadatka=document.getElementById("rbZadatkaDodaj");
    var url=document.getElementById("linkDodaj");

    v.url(url);

    if(rbZadatka.value=='' || Number(rbZadatka.value)<0 || Number(rbZadatka.value)>maxZadaci-1) {
        rbZadatka.style.backgroundColor="orangered";
    }
    else {
        rbZadatka.style.backgroundColor="white";
    }

    if(rbZadatka.style.backgroundColor=="white" && url.style.backgroundColor=="white") {
        tabela.dodajCommit(Number(rbZadatka.value),url.value);
    }
}

function editujCommit() {
    var rbZadatka=document.getElementById("rbZadatkaEdituj");
    var rbCommita=document.getElementById("rbCommitaEdituj");
    var url=document.getElementById("linkEdituj");

    v.url(url);

    if(rbZadatka.value=='' || Number(rbZadatka.value)<0 || Number(rbZadatka.value)>maxZadaci-1) {
        rbZadatka.style.backgroundColor="orangered";
    }
    else {
        rbZadatka.style.backgroundColor="white";
    }

    if(rbCommita.value=='' || Number(rbCommita.value)<0) {
        rbCommita.style.backgroundColor="orangered";
    }
    else {
        rbCommita.style.backgroundColor="white";
    }
    if(rbZadatka.style.backgroundColor=="white" && url.style.backgroundColor=="white" && rbCommita.style.backgroundColor=="white") {
        tabela.editujCommit(Number(rbZadatka.value),Number(rbCommita.value),url.value);
    }
}

function obrisiCommit() {
    var rbZadatka=document.getElementById("rbZadatkaObrisi");
    var rbCommita=document.getElementById("rbCommitaObrisi");

    if(rbZadatka.value=='' || Number(rbZadatka.value)<0 || Number(rbZadatka.value)>maxZadaci-1) {
        rbZadatka.style.backgroundColor="orangered";
    }
    else {
        rbZadatka.style.backgroundColor="white";
    }

    if(rbCommita.value=='' || Number(rbCommita.value)<0) {
        rbCommita.style.backgroundColor="orangered";
    }
    else {
        rbCommita.style.backgroundColor="white";
    }

    if(rbZadatka.style.backgroundColor=="white" && rbCommita.style.backgroundColor=="white") {
        tabela.obrisiCommit(Number(rbZadatka.value),Number(rbCommita.value));
    }
}