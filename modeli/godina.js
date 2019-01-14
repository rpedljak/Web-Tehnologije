const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const godina = sequelize.define('godina', {
        nazivGod: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        nazivRepSpi: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nazivRepVje: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return godina;
}