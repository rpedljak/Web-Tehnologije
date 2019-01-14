const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2018", "root", "root", {host: 'localhost', dialect: 'mysql'});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.student = sequelize.import(__dirname+'/student.js');
db.zadatak = sequelize.import(__dirname+'/zadatak.js');
db.godina = sequelize.import(__dirname+'/godina.js');
db.vjezba = sequelize.import(__dirname+'/vjezba.js');

//student -- više na jedan -- godina
db.godina.hasMany(db.student, {
    foreignKey:'studentGod', 
    as:'studenti'
});

//godina -- više na više -- vježba
db.godina.belongsToMany(db.vjezba, {
    through: 'godina_vjezba', 
    foreignKey: 'idgodina', 
    as: 'vjezbe'
});

db.vjezba.belongsToMany(db.godina, {
    through: 'godina_vjezba', 
    foreignKey: 'idvjezba', 
    as: 'godine'
});

//vježba -- više na više -- zadatak
db.zadatak.belongsToMany(db.vjezba, {
    through: 'vjezba_zadatak', 
    foreignKey: 'idzadatak', 
    as: 'vjezbe'
});

db.vjezba.belongsToMany(db.zadatak, {
    through: 'vjezba_zadatak', 
    foreignKey: 'idvjezba', 
    as: 'zadaci'
});

module.exports = db;