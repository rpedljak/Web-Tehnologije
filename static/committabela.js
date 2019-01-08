function dajMaxKolone(t,brojZadataka) {
    var maxKolone=0;
    for(var i=1;i<=brojZadataka;i++) {
        if(t.rows[i].cells.length>maxKolone) maxKolone=t.rows[i].cells.length;
    }
    return maxKolone;
}

function kreirajPocetnuTabelu(divElement,brojZadataka) {

    var tabela=document.createElement('table');
    tabela.setAttribute("id", "commiti");

    for(var i=0;i<=brojZadataka;i++) {
        var red=document.createElement("tr");
        if(i==0) {
            var prvi=document.createElement("th");
            var text1=document.createTextNode("Zadaci");
            prvi.append(text1);

            var drugi=document.createElement("th");
            var text2=document.createTextNode("Commiti");
            drugi.append(text2);
            
            red.appendChild(prvi);
            red.appendChild(drugi);
        }
        else {        
            var zadatak=document.createElement("td");
            var textZadatak=document.createTextNode("Zadatak "+i);
            zadatak.append(textZadatak);

            var celija=document.createElement("td");
            
            red.appendChild(zadatak);
            red.appendChild(celija);
        }
        tabela.appendChild(red);
    }

    divElement.appendChild(tabela);
}

function napraviKolonuCommiti(t,brojZadataka) {
    var childs=t.childNodes;
    for(var i=0;i<=brojZadataka;i++) {
        if(i==0) {
            var element=document.createElement("th");
            var text=document.createTextNode("Commiti");
            element.append(text);
            
            childs[0].appendChild(element);
        }

        else {
            var zadatak=document.createElement("td");

            childs[i].appendChild(zadatak);
        }
    }
}

function dodajCeliju(t, maxKolone, i, url, brojZadataka) {
    for(var j=0;j<t.rows[i].cells.length;j++) {
        if(t.rows[i].cells[j].innerHTML==='') {
            
            if(t.rows[i].cells[j].colSpan>1) {
                var a=document.createElement('a');
                a.href=url;
                var text=document.createTextNode(j);
                a.appendChild(text);
                t.rows[i].cells[j].appendChild(a);
                t.rows[i].cells[j].colSpan=1;
                var celija=t.rows[i].insertCell();
                celija.innerHTML="";
                celija.colSpan=maxKolone-(j+1);
            }
            else {
                var a=document.createElement('a');
                a.href=url;
                var text=document.createTextNode(j);
                a.appendChild(text);
                t.rows[i].cells[j].appendChild(a);
            }
            return;
        }
    }
    for(var j=0;j<=brojZadataka;j++) {
        if(j!=i) t.rows[j].cells[t.rows[j].cells.length-1].colSpan++;
    }
    var celija=t.rows[i].insertCell();
    celija.innerHTML="";
    for(var j=0;j<t.rows[i].cells.length;j++) {
        if(t.rows[i].cells[j].innerHTML==='') {
            var a=document.createElement('a');
            a.href=url;
            var text=document.createTextNode(j);
            a.appendChild(text);
            t.rows[i].cells[j].appendChild(a);
            t.rows[i].cells[j].colSpan=1;
        }
    }
}


var CommitTabela=(function() {

    var konstruktor=function(divElement,brojZadataka) {
    
        kreirajPocetnuTabelu(divElement,brojZadataka);
        
        return {
            dodajCommit:function(rbZadatka,url) {
                var t=document.getElementById('commiti');
                rbZadatka++;
                var maxKolone=dajMaxKolone(t,brojZadataka);
                
                dodajCeliju(t,maxKolone,rbZadatka,url,brojZadataka);

                for(var i=1;i<=brojZadataka;i++) {
                    for(var j=1;j<t.rows[i].cells.length;j++) {
                        if(t.rows[i].cells[j].colSpan>1 && t.rows[i].cells[j].innerHTML!='') {
                            t.rows[i].cells[j].colSpan=1;
                            if(j<maxKolone) {
                                var celija=t.rows[i].insertCell();
                                celija.innerHTML="";
                                celija.colSpan=maxKolone-(j+1);
                            }
                        }
                    }
                }
            },

            editujCommit:function(rbZadatka,rbCommita,url) {

                var t=document.getElementById('commiti');

                if(rbZadatka<0 || rbZadatka>t.rows.length-2 || rbCommita<0 || rbCommita>t.rows[rbZadatka+1].cells.length-2) {
                    return -1;
                }
                
                rbZadatka++;
                rbCommita++;

                if(t.rows[rbZadatka].cells[rbCommita].childNodes.length==0) {
                    return;
                }

                t.rows[rbZadatka].deleteCell(rbCommita);
                t.rows[rbZadatka].insertCell(rbCommita);
                var a=document.createElement('a');
                a.href=url;
                var text=document.createTextNode(rbCommita);
                a.appendChild(text);
                t.rows[rbZadatka].cells[rbCommita].appendChild(a);
            },

            obrisiCommit:function(rbZadatka,rbCommita) {
                
                var t=document.getElementById('commiti');

                if(rbZadatka<0 || rbZadatka>t.rows.length-2 || rbCommita<0 || rbCommita>t.rows[rbZadatka+1].cells.length-2) {
                    return -1;
                }
                
                rbZadatka++;
                rbCommita++;
                var maxKolone=dajMaxKolone(t,brojZadataka);

                if(t.rows[rbZadatka].cells.length===maxKolone && t.rows[rbZadatka].cells[t.rows[rbZadatka].cells.length-1].innerHTML!='') {
                    var brojac=0;
                    for(var i=1;i<=brojZadataka;i++) {
                        if(t.rows[i].cells.length===maxKolone && t.rows[i].cells[t.rows[i].cells.length-1].hasChildNodes()) {
                            brojac++;
                        }
                    }
                    t.rows[rbZadatka].cells[rbCommita].innerHTML=null;
                    t.rows[rbZadatka].deleteCell(rbCommita);
                    if(brojac==1) { 
                        for(var i=0;i<=brojZadataka;i++) {
                            t.rows[i].cells[t.rows[i].cells.length-1].colSpan--;
                            if(t.rows[i].cells.length===maxKolone) {
                                t.rows[i].cells[t.rows[i].cells.length-1].innerHTML=null;
                                t.rows[i].deleteCell(t.rows[i].cells.length-1);
                            }
                        }
                        maxKolone--;
                    }
                    else {
                        t.rows[rbZadatka].insertCell();
                    }
                }
                            
                else {
                    if(t.rows[rbZadatka].cells[rbCommita].innerHTML!='') {
                        t.rows[rbZadatka].cells[rbCommita].innerHTML=null;
                        t.rows[rbZadatka].deleteCell(rbCommita);
                        t.rows[rbZadatka].cells[t.rows[rbZadatka].cells.length-1].colSpan++;
                    }
                }

                if(t.rows[rbZadatka].cells.length==1) {
                    napraviKolonuCommiti(t, brojZadataka);
                }
            }
        }
    }
    return konstruktor;
}());   




