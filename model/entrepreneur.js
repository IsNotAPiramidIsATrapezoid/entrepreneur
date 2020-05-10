const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupEntrepreneurModel(config){
    const sequelize =setupDatabase(config)


    return sequelize.define('entrepreneur',{
        cedula: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        perfil: {
            type: Sequelize.STRING  
        }
    })
}