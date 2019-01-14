const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define('student', {
        imePrezime: {
            type: Sequelize.STRING,
            allowNull: false
        },
        index: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                is: {
                    args: [/^((1[4-9])|20)[0-9]{3}$/],
                    msg: "Index nije validan"
                }
            }
        }
    });
    return student;
}