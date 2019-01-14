var v=new Validacija(document.getElementById("dodavanje"));
var bbucket;
var dodaj=document.getElementById("dodajButton");
var select=document.getElementById("s1");
var nazivRepVje;
var nazivRepSpi;
var godinaId;
var studenti;

function validate() {
    var ime=document.getElementsByName("ime")[0];
    var index=document.getElementsByName("index")[0];
    v.ime(ime);
    v.index(index);
}

function popuniSelecte() {
    var sAjax=new UcitajSelect();
    sAjax.selectGodine(s1);
}

function ucitajModul() {
    if(!bbucket) bbucket=new BitBucket(document.getElementById("keyId").value, document.getElementById("secretId").value);
    dajPodatkeOGodini();
    bbucket.ucitaj(nazivRepSpi, nazivRepVje, ispisi);
    dodaj.disabled=false;
}

function ispisi(greska,x){
    if(greska==null) {
        studenti=x;
    }
    else {
        alert(greska);
        bbucket=null;
        dodaj.disabled=true;
    }
}

function dajPodatkeOGodini() {
    var ajax=new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if(ajax.readyState==4 && ajax.status==200) {
            nazivRepSpi=JSON.parse(ajax.responseText).nazivRepSpi;
            nazivRepVje=JSON.parse(ajax.responseText).nazivRepVje;
            godinaId=JSON.parse(ajax.responseText).id;
        }
    }

    ajax.open("GET", "http://localhost:8080/dajGodinu?id="+select.options[select.selectedIndex].value,false);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();
}

function posaljiZahtjev() {
    var ajax=new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if(ajax.readyState==4 && ajax.status==200) {
            alert(JSON.parse(ajax.responseText).message);
        }
    }
    var data=JSON.stringify({godina:godinaId,studenti:studenti});

    ajax.open("POST", "http://localhost:8080/student", true);
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(data);
}