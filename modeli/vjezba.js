const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const vjezba = sequelize.define('vjezba', {
        naziv: {
            type: Sequelize.STRING,
            unique: true
        },
        spirala: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
    return vjezba;
}