var ZadaciAjax = (function(){
    var konstruktor = function(callbackFn){

        //tri boola koji će pomoći da saznamo
        //da li već postoji upućen zahtjev
        var xmlBool=false;
        var jsonBool=false;
        var csvBool=false;
        return {
            dajXML:function() {
                if(xmlBool || csvBool || jsonBool) {
                    callbackFn('{greska:"Već ste uputili zahtjev"}');
                }

                //postavljanje odgovarajućeg boola na true
                //da ne bude moguće uputiti novi zahtjev dok 
                //ovaj ne završi
                xmlBool=true;

                var xml=new XMLHttpRequest();

                //početak zahtjeva
                var start=new Date().getTime();
                
                xml.onreadystatechange = function() {        
                    if(xml.readyState==4 && xml.status==200) {
                        xmlBool=false;
                        callbackFn(xml.responseText);
                    }
                };

                xml.ontimeout = function(err) {
                    xmlBool=false;
                    xml.abort();
                }

                xml.open("GET", "http://localhost:8080/zadaci", true);
                xml.setRequestHeader('Accept', 'application/xml');
                xml.timeout=2000;
                xml.send();
            },
            dajCSV:function() {
                if(xmlBool || csvBool || jsonBool) {
                    callbackFn('{greska:"Već ste uputili zahtjev"}');
                }

                //postavljanje odgovarajućeg boola na true
                //da ne bude moguće uputiti novi zahtjev dok 
                //ovaj ne završi
                csvBool=true;

                var csv=new XMLHttpRequest();

                //početak zahtjeva
                var start=new Date().getTime();
                
                csv.onreadystatechange = function() {
                    if(csv.readyState==4 && csv.status==200) {
                        csvBool=false;
                        callbackFn(csv.responseText);
                    }
                }

                csv.ontimeout = function(err) {
                    csvBool=false;
                    csv.abort();
                }

                csv.open("GET", "http://localhost:8080/zadaci", true);
                csv.setRequestHeader('Accept', 'text/csv');
                csv.timeout=2000;
                csv.send();
            },
            dajJSON:function() {
                if(xmlBool || csvBool || jsonBool) {
                    callbackFn('{greska:"Već ste uputili zahtjev"}');
                }

                //postavljanje odgovarajućeg boola na true
                //da ne bude moguće uputiti novi zahtjev dok 
                //ovaj ne završi
                jsonBool=true;

                var json=new XMLHttpRequest();

                //početak zahtjeva
                var start=new Date().getTime();
                
                json.onreadystatechange = function() {
                    if(json.readyState==4 && json.status==200) {
                        jsonBool=false;
                        callbackFn(json.responseText);
                    }
                }

                json.ontimeout = function(err) {
                    jsonBool=false;
                    json.abort();
                }

                json.open("GET", "http://localhost:8080/zadaci", true);
                json.setRequestHeader('Accept', 'application/json');
                json.timeout=2000;
                json.send();
            }
        }
    }
    return konstruktor;
}());