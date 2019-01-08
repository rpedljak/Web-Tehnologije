//na ovoj spirali sam naučio ne samo nodejs,
//nego i komentarisanje koda, ko bude review
//ovaj kod, nek uživa

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

//instance modula express i multer
const app = express();
const upload = multer({dest: __dirname+'/static/zadaci/'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


//Zadatak 1

app.use('/static', express.static('static'));
app.use(express.static('public'));


//Zadatak 2

//zadaci će se čuvati u folderu 'zadaci' koji se
//nalazi u 'static' folderu, svaki zadatak
//ima svoj odgovarajući folder, čiji je naziv
//isti kao naziv zadatka u kojem se nalaze json i pdf

app.post('/addZadatak', upload.single('postavka'), (req, res, next) => {
    let naziv=req.body.naziv;
    let dir=__dirname+"/static/zadaci/"+naziv;

    //koristi se sync metoda da bi se utvrdilo postojanje zadatka
    //prije nego se nastavi sa daljim izvršavanjem
    if(fs.existsSync(dir) || req.file.mimetype!='application/pdf') {

        //u slucaju greške potrebno je obrisati uploadani
        //file što je pristigao iz forme prije nego što završimo
        fs.unlink(__dirname+"/static/zadaci/"+req.file.filename, (err) => {
            if(err) throw err;
        })
        res.render("greska", {
            opisGreske: "Već postoji zadatak sa datim nazivom!"
        });
        return;
    }

    //koristi se sync metoda da bi se folder kreirao
    //da bismo mogli upisivati u njega
    fs.mkdirSync(dir);

    //nakon što se pošalje zahtjev file se automatski uploadao sa 
    //random imenom, pa ga je potrebno rename-ati
    fs.rename(__dirname+'/static/zadaci/'+req.file.filename, __dirname+'/static/zadaci/'+naziv+'/'+naziv+'.pdf', (err) => {
        if(err) throw err;
    });

    const upisiUJSON='{"naziv":"'+naziv+'","postavka":"/static/zadaci/'+naziv+'/'+naziv+'.pdf"}';

    fs.writeFile(__dirname+'/static/zadaci/'+naziv+'/'+naziv+'Zad.json', upisiUJSON, (err) => {
        if(err) throw err;

        res.sendFile(__dirname+'/public/addZadatak.html');
    });
});


//Zadatak 3

app.get('/zadatak', (req, res) => {
    let naziv=req.param('naziv');
    
    //provjeravamo da li postoji folder sa nazivom,
    //ukoliko ne postoji, nema ni zadatka sa datim imenom
    //šaljemo grešku, koristimo sync da bi se utvrdilo
    //postojanje zadatka prije nego što pokušamo
    //poslati postavku
    if(!fs.existsSync(__dirname+'/static/zadaci/'+naziv)) {
        res.render("greska", {
            opisGreske: "Ne postoji zadatak sa datim nazivom!"
        });
        return;
    }

    res.sendFile(__dirname+'/static/zadaci/'+naziv+'/'+naziv+'.pdf');
});


//Zadatak 4 

app.post('/addGodina', (req, res) => {
    fs.readFile('godine.csv', (err, data) => {
        if(err) throw err;

        let imaNaziv=false;

        //provjera da li godina sa datim nazivom već postoji
        //ukoliko da, šalji grešku
        let godine=data.toString();
        godineNiz=godine.split('\n');
        for(let i=0;i<godineNiz.length;i++) {
            let polja=godineNiz[i].split(',');
            if(polja[0]==req.body.nazivGod) {
                res.render("greska", {
                    opisGreske: "Već postoji godina sa datim nazivom!"
                });
                imaNaziv=true;
            }
        }
        if(!imaNaziv) {
            let novaLinija=req.body.nazivGod+','+req.body.nazivRepVje+','+req.body.nazivRepSpi+'\n';

            fs.appendFile('godine.csv',novaLinija,(err) => {
                if(err) throw err;

                res.sendFile(__dirname+'/public/addGodina.html');
            });
        }
    });
});


//Zadatak 5

app.get('/godine', (req, res) => {
    fs.readFile('godine.csv', (err, data) => {
        if(err) throw err;

        let niz=[];
        let godinaJSON=data.toString();
        let godine=godinaJSON.split('\n');
        for(let i=0;i<godine.length-1;i++) {
            let polja=godine[i].split(',');
            let objekat={nazivGod:polja[0],nazivRepVje:polja[1],nazivRepSpi:polja[2]};
            niz.push(objekat);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(niz));
    });
});


//Zadatak 6
//u /static/GodineAjax.js


//Zadatak 7

app.get('/zadaci', (req, res) => {

    //Link postavke je putanja do pdf fajla počevši od dirname
    //(folder spirale), ne uključujući dirname

    let nizNaziva=[];
    let nizPostavki=[];

    //koristimo sync metodu da bi se prvo
    //popunio niz naziva prije nego nastavimo
    //sa daljim izvršavanjem, čitamo direktorij 'zadaci'
    //i pushamo odgovarajuće nazive u nizove koje ćemo
    //ispisati kasnije u odgovarajućem formatu
    fs.readdirSync(__dirname+'/static/zadaci').filter((file) => {
        nizNaziva.push(file);
        nizPostavki.push('/static/zadaci/'+file+'/'+file+'.pdf');
    });

    //json
    if(req.accepts('application/json')) {
        let nizJSON=[];
        for(let i=0;i<nizNaziva.length;i++) {
            let objekat={naziv:nizNaziva[i],postavka:nizPostavki[i]};
            nizJSON.push(objekat);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(nizJSON));
    }

    //xml
    if(!req.accepts('application/json') && req.accepts('application/xml')) {
        res.writeHead(200, {'Content-Type': 'application/xml'});
        res.write('<?xml version="1.0" encoding="UTF-8"?>\n<zadaci>\n');
        for(let i=0;i<nizNaziva.length;i++) {
            res.write('\t<zadatak>\n\t\t<naziv> '+
                nizNaziva[i]+' </naziv>\n\t\t<postavka> '+
                nizPostavki[i]+' </postavka>\n\t</zadatak>\n');
        }
        res.end('</zadaci>');
    }

    //csv
    if(!req.accepts('application/json') && !req.accepts('application/xml') && req.accepts('text/csv')) {
        res.writeHead(200, {'Content-Type': 'text/csv'});
        for(let i=0;i<nizNaziva.length;i++) {
            res.write(nizNaziva[i]+','+nizPostavki[i]+'\n');
        }
        res.end();
    }
});


//Zadatak 8
//u /static/ZadaciAjax.js


//listen
app.listen(8080);