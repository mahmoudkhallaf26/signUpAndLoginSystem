const jwt = require('jsonwebtoken');
const userModel = require('../DB/schema/user.schema');

const role = { 
    user : "user",
    admin : "admin"
}
const auth = (data)=>{
    return async (req,res,next)=>{
        try {
            const headertoken = req.headers['authorization'];
            if (!headertoken || headertoken == null || headertoken == undefined || !headertoken.startsWith('Bearer'))
            {
                res.status(400).json({message: "in - valid headerToken"})
            }
            else
            {
                const token = headertoken.split(" ")[1]
                const decoded = jwt.verify(token,process.env.secretKey)
                foundUser = await userModel.findOne({id : decoded.id})
                if(foundUser && decoded.IsLoggin)
                {
                    if(data.includes(foundUser.role))
                    {
                        req.user = foundUser
                        next()

                    }else
                    {
                        res.status(401).json({message: "sorry you not auth"})
                    }
                    
    
                }else
                {
                    res.status(400).json({message: "in - valid token"})
                }
            }
            
        } catch (error) {
            res.status(500).json({message: "catch error",error})
            
        }

    }
}

module.exports = {auth,role}