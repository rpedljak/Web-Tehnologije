//express, jer ko će se peglat sa http-om
const express = require('express');

//body parsing middleware
const bodyParser = require('body-parser');

//file system
const fs = require('fs');

//za obradu multipart podataka
const multer = require('multer');

//path modul
const path = require('path');

//za bazu
const Sequelize = require('sequelize');
const db = require('./modeli/db.js');

//Sync tabela
db.sequelize.sync();    

//instance modula express i multer
const app = express();
const upload = multer({dest: __dirname+'/static/zadaci/'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


//Prikaz stranica

app.use('/static', express.static('static'));
app.use(express.static('public'));

//Spašavanje zadataka u bazu podataka

//PDF ćemo još uvijek saveati lokalno, a u bazu ćemo
//upisivati link za download PDF-a

app.post('/addZadatak', upload.single('postavka'), (req,res) => {
    if(req.file.mimetype!='application/pdf')  {
        //u slucaju greške potrebno je obrisati uploadani
        //file što je pristigao iz forme prije nego što završimo
        fs.unlink(__dirname+"/static/zadaci/"+req.file.filename, (err) => {
            if(err) throw err;
        })
        res.render("greska", {
            opisGreske: "Postavka nije u pdf formatu!"
        });
        return;
    }

    if(req.param('naziv') && req.param('naziv')) {

        let naziv=req.param('naziv');
        let dir=__dirname+"/static/zadaci/"+naziv;

        if(fs.existsSync(dir))  {
            //u slucaju greške potrebno je obrisati uploadani
            //file što je pristigao iz forme prije nego što završimo
            fs.unlink(__dirname+"/static/zadaci/"+req.file.filename, (err) => {
                if(err) throw err;
            })
            res.render("greska", {
                opisGreske: "Postoji zadatak sa datim nazivom!"
            });
            return;
        }

        fs.mkdirSync(dir);

        //nakon što se pošalje zahtjev file se automatski uploadao sa 
        //random imenom, pa ga je potrebno rename-ati
        fs.rename(__dirname+'/static/zadaci/'+req.file.filename, __dirname+'/static/zadaci/'+naziv+'/'+naziv+'.pdf', (err) => {
            if(err) throw err;
        });

        const json='{"naziv":"'+naziv+'","postavka":"http://localhost:8080/static/zadaci/'+naziv+'/'+naziv+'.pdf"}';
        db.zadatak.create({
            naziv: naziv,
            postavka: "http://localhost:8080/static/zadaci/"+naziv+"/"+naziv+".pdf"
        }).then((upis) => {
            res.send(json);
        }).catch((err) => {
            res.send(err);
        });
    }
});


//Get zadatak po nazivu iz baze

app.get('/zadatak', (req, res) => {

    db.zadatak.findOne({where:{naziv:req.param('naziv')}
    }).then((rez) => {
        res.sendFile(__dirname+'/static/zadaci/'+rez.naziv+'/'+rez.naziv+'.pdf')
    }).catch((err) => {
        res.render("greska", {
            opisGreske: "Ne postoji zadatak sa datim imenom!"
        });
    });
});


//Spašavanje godina u bazu podataka

app.post('/addGodina', (req, res) => {
    if(req.param('nazivGod') && req.param('nazivRepVje') && req.param('nazivRepSpi')) {
        db.godina.create({
            nazivGod: req.param('nazivGod'),
            nazivRepVje: req.param('nazivRepVje'),
            nazivRepSpi: req.param('nazivRepSpi')
        }).then((upis) => {
            res.sendFile(__dirname+'/public/addGodina.html');
        }).catch((err) => {
            res.render("greska", {
                opisGreske: err
            });
        });
    }
});


//godine iz baze

app.get('/godine', (req, res) => {
    db.godina.findAll().then((rez) => {
        let niz=[];
        for(let i=0;i<rez.length;i++) {
            let objekat={id: rez[i].id,nazivGod:rez[i].nazivGod,nazivRepVje:rez[i].nazivRepVje,nazivRepSpi:rez[i].nazivRepSpi};
            niz.push(objekat);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(niz));
    });
});


//zadaci iz baze

app.get('/zadaci', (req, res) => {

    db.zadatak.findAll().then((rez) => {

        //json
        if(req.accepts('application/json')) {
            let nizJSON=[];
            for(let i=0;i<rez.length;i++) {
                let objekat={id: rez[i].id, naziv:rez[i].naziv,postavka:rez[i].postavka};
                nizJSON.push(objekat);
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(nizJSON));
        }
    
        //xml
        if(!req.accepts('application/json') && req.accepts('application/xml')) {
            res.writeHead(200, {'Content-Type': 'application/xml'});
            res.write('<?xml version="1.0" encoding="UTF-8"?>\n<zadaci>\n');
            for(let i=0;i<rez.length;i++) {
            res.write('\t<zadatak>\n\t\t<naziv> '+
                rez[i].naziv+' </naziv>\n\t\t<postavka> '+
                rez[i].postavka+' </postavka>\n\t</zadatak>\n');
            }
            res.end('</zadaci>');
        }
    
        //csv
        if(!req.accepts('application/json') && !req.accepts('application/xml') && req.accepts('text/csv')) {
            res.writeHead(200, {'Content-Type': 'text/csv'});
            for(let i=0;i<rez.length;i++) {
                res.write(rez[i].naziv+','+rez[i].postavka+'\n');
            }
            res.end();
        }
    });
});

//spašavanje vježbe u bazu

app.post('/addVjezba', (req,res) => {

    //dodavanje nove vježbe
    if(req.param('naziv')) {
        let spiralaBool;

        //provjera da li je poslano checked ili unchecked
        //da ne baci undefined error
        if(req.param('spirala')) {
            spiralaBool=true;
        }
        else {
            spiralaBool=false;
        }
        db.godina.findOne({where:{id:req.param('sGodine')}
        }).then((godina) => {
            db.vjezba.create({
                naziv: req.param('naziv'),
                spirala: spiralaBool
            }).then((upis) => {
                upis.addGodine([godina.id]);
                godina.addVjezbe([upis.id]);
                res.sendFile(__dirname+'/public/addVjezba.html');
            }).catch((err) => {
                res.render("greska", {
                    opisGreske: err
                });
            });
        }).catch((err) => {
            res.render("greska", {
                opisGreske: err
            });
        });
    }

    //povezivanje postojeće
    else {
        db.godina.findOne({where:{id:req.param('sGodine')}
        }).then((godina) => {
            db.vjezba.findOne({where:{id:req.param('sVjezbe')}
            }).then((vjezba) => {
                godina.addVjezbe([vjezba.id]);
                vjezba.addGodine([godina.id]);
                res.sendFile(__dirname+'/public/addVjezba.html');
            }).catch((err) => {
                res.render("greska", {
                    opisGreske: err
                });
            });
        }).catch((err) => {
            res.render("greska", {
                opisGreske: err
            });
        });
    }
});


//vjezbe iz baze

app.get('/vjezbe', (req,res) => {
    db.vjezba.findAll().then((rez) => {
        let niz=[];
        for(let i=0;i<rez.length;i++) {
            let objekat={id: rez[i].id, naziv:rez[i].naziv,spirala:rez[i].spirala};
            niz.push(objekat);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(niz));
    });
});


//dohvatanje zadataka koji nisu povezani sa datom vježbom

app.post('/zadaciVjezba', (req,res) => {
    db.vjezba.findOne({where: {naziv: req.param('vjezba')}
    }).then((vjezba) => {
        db.zadatak.findAll().then((zadaci) => {
            vjezba.getZadaci().then((zadaciVjezbe) => {
                for(let i=0;i<zadaci.length;i++) {
                    for(let j=0;j<zadaciVjezbe.length;j++) {
                        if(zadaci[i].id==zadaciVjezbe[j].id) {
                            zadaci.splice(i,1);
                        }
                    }
                }
                let nizJSON=[];
                for(let i=0;i<zadaci.length;i++) {
                    let objekat={id:zadaci[i].id,naziv:zadaci[i].naziv,postavka:zadaci[i].postavka};
                    nizJSON.push(objekat);
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(nizJSON));
            });
        });
    }).catch((err) => {
        res.render("greska", {
            opisGreske: err
        });
    });
});


//dodavanje zadatka na vježbu

app.post('/vjezba/:idVjezbe/zadatak', (req,res) => {
    db.vjezba.findOne({where:{id:req.param('idVjezbe')}
    }).then((vjezba) => {
        db.zadatak.findOne({where:{id:req.param('sZadatak')}
        }).then((zadatak) => {
            zadatak.addVjezbe([vjezba.id]);
            vjezba.addZadaci([zadatak.id]);
            res.sendFile(__dirname+'/public/addVjezba.html');
        }).catch((err) => {
            res.render("greska", {
                opisGreske: err
            });
        });
    }).catch((err) => {
        res.render("greska", {
            opisGreske: err
        });
    });
});


//godina po id

app.get('/dajGodinu', (req,res) => {
    db.godina.findOne({where:{id:req.param('id')}
    }).then((godina) => {
        let objekat={id:godina.id, nazivGod:godina.nazivGod, nazivRepVje:godina.nazivRepVje, nazivRepSpi:godina.nazivRepSpi};
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(objekat));
    }).catch((err) => {
        res.render("greska", {
            opisGreske: err
        });
    });
});


//dodavanje studenata u bazu

app.post('/student', (req,res) => {
    let studenti=req.param('studenti');
    let m=0;
    let n=0;
    db.student.findAll().then((studentiBaza) => {
        for(let i=0;i<studenti.length;i++) {
            let imaGa=false;
            for(let j=0;j<studentiBaza.length;j++) {
                if(studenti[i].index==studentiBaza[j].index) {
                    imaGa=true;
                }
            }
            if(!imaGa) {
                db.student.create({
                    imePrezime: studenti[i].imePrezime,
                    index: studenti[i].index,
                    studentGod: req.param('godina')
                });
                n++;
            }
            else {
                db.student.findOne({where:{index:studenti[i].index}
                }).then((studentUpdate) => {
                    studentUpdate.update({
                        studentGod: req.param('godina')
                    });
                });
                m++;
            }
        }
        db.godina.findOne({where:{id:req.param('godina')}
        }).then((godina) => {
            let uspjeh={message:"Dodano je "+n+" novih studenata i upisano "+m+" na godinu "+godina.nazivGod};
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(uspjeh));
        }).catch((err) => {
            res.render("greska", {
                opisGreske: err
            });
        });
    }).catch((err) => {
        res.render("greska", {
            opisGreske: err
        });
    });
});


//listen
app.listen(8080);