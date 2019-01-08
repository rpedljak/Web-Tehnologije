var GodineAjax = (function() {
    var konstruktor=function(divSadrzaj) {
        
        //niz naziva godina koji će pomoći kasnije
        //u otkrivanju da li već postoji godina sa datim nazivom
        //u funkciji osvježi da se ne bi ispisivala ista godina
        //više puta, tj pri svakom pozivu osvježi metode
        var nizNaziva=[];

        var ajax=new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if(ajax.readyState==4 && ajax.status==200) {
                //primamo response u JSON formatu, možemo dobiti
                //objekte koristeći JSON.parse
                let niz=JSON.parse(ajax.responseText);

                for(let i=0; i<niz.length; i++) {
                    nizNaziva.push(niz[i].nazivGod);
                    divSadrzaj.innerHTML+="<div class=godina><p>Naziv godine: "+
                    niz[i].nazivGod+"</p><p>Naziv repozitorija vježbe: "+
                    niz[i].nazivRepVje+"</p><p>Naziv repozitorija spirale: "+
                    niz[i].nazivRepSpi+"</p></div>";
                }
            }
        }

        ajax.open("GET", "http://localhost:8080/godine", true);
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send();

        return {
            osvjezi:function() {
                var ajax=new XMLHttpRequest();

                ajax.onreadystatechange = function() {
                    if(ajax.readyState==4 && ajax.status==200) {
                        //primamo response u JSON formatu, možemo dobiti
                        //objekte koristeći JSON.parse
                        let niz=JSON.parse(ajax.responseText);

                        for(let i=0; i<niz.length; i++) {
                            let imaGa=false;

                            //provjera da li postoji ispisana godina sa datim nazivom
                            for(let j=0; j<nizNaziva.length; j++) {
                                if(nizNaziva[j]==niz[i].nazivGod) imaGa=true;
                            }
                            if(imaGa) continue;
                            divSadrzaj.innerHTML+="<div class=godina><p>Naziv godine: "+
                            niz[i].nazivGod+"</p><p>Naziv repozitorija vježbe: "+
                            niz[i].nazivRepVje+"</p><p>Naziv repozitorija spirale: "+
                            niz[i].nazivRepSpi+"</p></div>";
                        }
                    }
                }

                ajax.open("GET", "http://localhost:8080/godine", true);
                ajax.setRequestHeader('Content-Type', 'application/json');
                ajax.send();
            }
        }
    }
    return konstruktor;
}());