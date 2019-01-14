var UcitajSelect = (function() {
    var konstruktor = function() {
        var brojac=0;

        return {
            selectGodine: function (select) {
                var ajaxGodine=new XMLHttpRequest();

                ajaxGodine.onreadystatechange = function() {
                    if(ajaxGodine.readyState==4 && ajaxGodine.status==200) {
                        //primamo response u JSON formatu, možemo dobiti
                        //objekte koristeći JSON.parse
                        let niz=JSON.parse(ajaxGodine.responseText);

                        select.innerHTML="";
                        for(let i=0; i<niz.length; i++) {
                            select.innerHTML+="<option value="+niz[i].id+">"+niz[i].nazivGod+"</option>";
                        }
                    }
                }

                ajaxGodine.open("GET", "http://localhost:8080/godine", true);
                ajaxGodine.setRequestHeader('Content-Type', 'application/json');
                ajaxGodine.send();
            },
            selectVjezbe: function(select) {
                //brojac koji služi kao provjera da li se prvi put loada stranica
                //ako da pozovi zahtjev sinhrono da se mogu učitati zadaci za vježbu
                //tek nakon što se select popuni
                brojac++;
                var ajaxVjezbe=new XMLHttpRequest();

                ajaxVjezbe.onreadystatechange = function() {
                    if(ajaxVjezbe.readyState==4 && ajaxVjezbe.status==200) {
                        //primamo response u JSON formatu, možemo dobiti
                        //objekte koristeći JSON.parse
                        let niz=JSON.parse(ajaxVjezbe.responseText);

                        select.innerHTML="";
                        for(let i=0; i<niz.length; i++) {
                            select.innerHTML+="<option value="+niz[i].id+">"+niz[i].naziv+"</option>";
                        }
                    }
                }
                var asinhron=true;
                //ako je brojač 1 ili 2 znači da se prvi put popunjavaju selecti 
                //za vježbe, što će uzrokovati da grešku u popunjavanju selecta za zadatke
                //ukoliko nam ovaj zahtjev nije sinhron
                if(brojac<=2) asinhron=false;
                ajaxVjezbe.open("GET", "http://localhost:8080/vjezbe", asinhron);
                ajaxVjezbe.setRequestHeader('Content-Type', 'application/json');
                ajaxVjezbe.send();
            },
            selectZadaciZaVjezbu: function(selectZadaci, selectVjezbe) {
                var ajaxZadaci=new XMLHttpRequest();

                ajaxZadaci.onreadystatechange = function() {
                    if(ajaxZadaci.readyState==4 && ajaxZadaci.status==200) {
                        //primamo response u JSON formatu, možemo dobiti
                        //objekte koristeći JSON.parse
                        let niz=JSON.parse(ajaxZadaci.responseText);

                        selectZadaci.innerHTML="";
                        for(let i=0; i<niz.length; i++) {
                            selectZadaci.innerHTML+="<option value="+niz[i].id+">"+niz[i].naziv+"</option>";
                        }
                    }
                }

                ajaxZadaci.open("POST", "http://localhost:8080/zadaciVjezba", true);
                ajaxZadaci.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                ajaxZadaci.send("vjezba="+selectVjezbe.options[selectVjezbe.selectedIndex].text);
            },
            selectZadaci: function(select) {
                var ajaxZadaci=new XMLHttpRequest();

                ajaxZadaci.onreadystatechange = function() {
                    if(ajaxZadaci.readyState==4 && ajaxZadaci.status==200) {
                        //primamo response u JSON formatu, možemo dobiti
                        //objekte koristeći JSON.parse
                        let niz=JSON.parse(ajaxZadaci.responseText);

                        select.innerHTML="";
                        for(let i=0; i<niz.length; i++) {
                            select.innerHTML+="<option value="+niz[i].id+">"+niz[i].naziv+"</option>";
                        }
                    }
                }

                ajaxZadaci.open("GET", "http://localhost:8080/zadaci", true);
                ajaxZadaci.setRequestHeader('Content-Type', 'application/json');
                ajaxZadaci.send();
            }
        }
    }
    return konstruktor;
}());