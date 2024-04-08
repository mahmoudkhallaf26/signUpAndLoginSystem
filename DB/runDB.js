const sequelize = require("./connection")


const DB = ()=>{
   
    sequelize.sync({alter:true}).then(() => {
        console.log('table created');
      });
   }

   module.exports = DB