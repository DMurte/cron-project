require('dotenv').config()
const Sequelize = require('sequelize');
const sequelize = new Sequelize('', '', '', {
    
    dialect: 'mysql',
    host: ''
});

module.exports = sequelize;
