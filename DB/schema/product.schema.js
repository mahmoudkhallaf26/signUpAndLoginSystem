const { Sequelize } = require("sequelize");
const sequelize = require("../connection");

const productmodel =  sequelize.define("product",{
    name :{
        type : Sequelize.STRING,
        allowNull : false,
        required : true
    },
    des:{
        type : Sequelize.STRING,
        allowNull : false,
        required : true
    },
    numberOfavilable:{
        type : Sequelize.INTEGER,
        allowNull : false,
        required : true
    },
    price:{
        type : Sequelize.INTEGER,
        allowNull : false,
        required : true
    }
    

});




  module.exports = productmodel