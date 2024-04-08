const { role } = require("./auth")


const endpoint = {
    profile :[role.admin,role.user],
    getAllUser : [role.admin]
}

module.exports = {
    endpoint
}