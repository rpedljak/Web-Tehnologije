var BitBucket = (function() {
    var konstruktor=function(key, secret) {
        var token=new Promise((resolve,reject) => {
            var ajax = new XMLHttpRequest();

            ajax.onreadystatechange = function() {
                if(ajax.readyState == 4 && ajax.status == 200) {
                    resolve(ajax.responseText);
                }
                if(ajax.readyState == 4 && ajax.status != 200) {
                    reject(ajax.responseText);
                }
            }
            ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.setRequestHeader("Authorization", 'Basic ' + window.btoa(key+':'+secret));
            ajax.send("grant_type="+encodeURIComponent("client_credentials"));
        });

        return {
            ucitaj: function(nazivRepSpi, nazivRepVje, callback) {
                token.then((rezultat) => {
                    var ajax=new XMLHttpRequest();

                    var studenti=[];
                    ajax.onreadystatechange = function() {
                        if(ajax.readyState==4 && ajax.status==200) {
                            var repozitoriji=JSON.parse(ajax.responseText);
                            for(var i=0; i<repozitoriji.values.length;i++) {
                                //da se ne ponavljaju studenti
                                var imaGa=false;

                                //čuvamo index ovako zbog preglednosti
                                var index=repozitoriji.values[i].name.substring(repozitoriji.values[i].name.length-5);

                                for(var j=0;j<studenti.length;j++) {
                                    //dva studenta mogu imati isto ime i prezime
                                    //ali ne mogu imati isti index pa ćemo po
                                    //indexu zabraniti ponavljanje
                                    if(studenti[j].index==index) {
                                        imaGa=true;
                                        break;
                                    }
                                }
                                if(!imaGa) {
                                    studenti.push({imePrezime:repozitoriji.values[i].owner.display_name,index:index});
                                }
                            }

                            //proslijeđivanje studenata
                            callback(null,studenti);
                        }
                    }

                    //query ovako zbog preglednosti
                    var query="q=name+%7E+%22"+nazivRepSpi+"%22+OR+name+%7E+%22"+nazivRepVje+"%22";

                    ajax.open("GET", "https://api.bitbucket.org/2.0/repositories/?role=member&"+query,true);
                    ajax.setRequestHeader("Authorization", 'Bearer '+JSON.parse(rezultat).access_token);
                    ajax.send();
                }); 
            }
        };
    }
    return konstruktor;
}());