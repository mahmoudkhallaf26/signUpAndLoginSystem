const joi  = require('joi');

const signupval = {
    body : joi.object().required().keys({
        userName:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        phone:joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).required(),age:joi.number().required(),
        firstName:joi.string().required(),
        lastName:joi.string().required(),
        gender:joi.string().optional(),
        role:joi.string().optional(),
        profilePic:joi.string().optional()
        
    })
}
module.exports = {signupval}