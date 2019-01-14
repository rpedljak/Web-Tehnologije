const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const zadatak = sequelize.define('zadatak', {
        naziv: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postavka: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return zadatak;
}