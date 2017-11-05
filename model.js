const sequelize = require('./db')
const Sequelize = require('sequelize');
const Model = {

transactions : sequelize.define('transactions',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id : {
        type : Sequelize.INTEGER
    },
    status : {
        type : Sequelize.INTEGER
    },
    bricks : {
        type : Sequelize.TEXT
    },
    date : {
        type : Sequelize.DATE,
    },
    type : {
        type : Sequelize.INTEGER
    },
    origen : {
        type : Sequelize.TEXT
    },
    packages_id : {
        type : Sequelize.INTEGER
    },
    comision : {
        type : Sequelize.TEXT
    },
    cantidad : {
        type : Sequelize.DOUBLE
    },
    titulo : {
        type : Sequelize.TEXT
    },
    renting_type :{
        type : Sequelize.INTEGER
    }
    },
    {
        freezeTableName: true,
        timestamps: false
    }),

    renting_types : sequelize.define('renting_types',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        type : {
            type : Sequelize.TEXT(45)
        },
        month_first_interval : {
            type : Sequelize.DOUBLE
        },
        month_second_interval : {
            type : Sequelize.DOUBLE
        },
        month_third_interval : {
            type : Sequelize.DOUBLE,
        },
        month_fourth_interval : {
            type : Sequelize.DOUBLE
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),

    renting : sequelize.define('renting',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        ladrillos : {
            type : Sequelize.DOUBLE
        },
        valor : {
            type : Sequelize.TEXT(45)
        },
        createdAt : {
            type : Sequelize.DATE
        },
        updatedAt : {
            type : Sequelize.DATE
        },
        incremento : {
            type : Sequelize.DOUBLE,
        },
        user_id : {
            type : Sequelize.INTEGER(11)
        },
        descripcion : {
            type : Sequelize.TEXT(645)
        },
        titulo : {
            type : Sequelize.TEXT(45)
        },
        transaction_id : {
            type : Sequelize.INTEGER(45)
        },
        renting_type : {
            type : Sequelize.INTEGER(11)
        }
        },
        {
            freezeTableName: true,
            timestamps: true
        })
}

module.exports = Model;
