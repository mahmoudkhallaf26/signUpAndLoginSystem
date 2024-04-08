const { Sequelize } = require("sequelize");
const sequelize = require("../connection");
const productmodel = require("./product.schema");


const userModel = sequelize.define('user',{
    userName :{
        type : Sequelize.STRING,
        allowNull : false,
    
    },
    firstName :{
        type : Sequelize.STRING,
        allowNull : false,

    },
    lastName :{
        type : Sequelize.STRING,
        allowNull : false,

    },
    phone :{
        type : Sequelize.STRING,
        allowNull : false,

    },
    gender :{
        type : Sequelize.STRING,
        allowNull : false,

        defaultValue:'male'
    },
    confirmed:{
        type : Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue:false
    },
    role:{
        type : Sequelize.STRING,
        allowNull : false,
        defaultValue:"user"
    },
    profilePic :{
        type : Sequelize.STRING

    },
    
    email : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
        required: true
    }
});

userModel.hasMany(productmodel,{
    foreignKey:{
        onDelete:'CASCADE'
    }
});
productmodel.belongsTo(userModel)






module.exports = userModel