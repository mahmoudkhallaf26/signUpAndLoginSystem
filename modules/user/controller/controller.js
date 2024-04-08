const userModel = require("../../../DB/schema/user.schema")
const jwt = require('jsonwebtoken');
const sendEmail = require("../../../common/emailsender");
const bcrypt = require('bcrypt');

const getAllUser = async(req,res)=>{


    let {page,size} = req.query;
    if(!page ||page <=0)
    {
        page = 1
    }
    if(!size)
    {
        size = 4
    }
    let skip = (page-1)*size

    const users = await userModel.findAll({limit:size,offset:skip});
    res.json({message : "done" , users})
}
const addUser = async (req,res)=>{

    try {
        const {userName,email,password,phone,age,firstName,lastName,gender,role} = req.body;

        const user = await userModel.findOne({where:{email}});
        if(user)
        {
            res.status(400).json({message:"email is elready exist"})
        }else
        {

            passwordhash = await bcrypt.hash(password,parseInt(process.env.secretKey))
            const newuser = await userModel.create({userName,email,password:passwordhash,phone,age,firstName,lastName,gender,role})
            const token = jwt.sign({id:newuser.id},process.env.secretKey)
            const message = `
                <a href ="${req.protocol}://${req.headers.host}/user/confirm/${token}">click</a>`
                sendEmail(email,message)

            res.json({message : "done" , newuser})

        }

    
    
    
        
    } 
    catch (error) {
        res.status(500).json({message:"server error",error})
    }
}
const signin = async(req,res)=>{
    try {
        const {email,password} = req.body;
      const user = await userModel.findOne({where:{email}});
    if(user)
    {
        if(!user.confirmed)
        {
            res.status(400).json({message:"email is not confirmed"})
        }else
        {
             const DBpassword = await bcrypt.compare(password,user.password)

            if (DBpassword)
            {   
                const token = jwt.sign({id:user.id,IsLoggin : true},process.env.secretKey)
                res.status(200).json({message:"done",token})
            }else{
                res.status(400).json({message:"not match password"})
            }

        }

    }else
    {
        res.status(400).json({message:"email is not exist"})
    }
        
    } catch (error) {
        res.status(400).json({message:"error ser",error})
    }

}
const confirmemail = async(req,res)=>{
    try {
        const {token} = req.params;
        if(!token || token == undefined || token == null)
        {
            res.status(400).json({message : "token err"})
        }
        else
        {
            const decode = jwt.verify(token,process.env.secretKey);
            const user = await userModel.findOne({where:{id:decode.id}})
            if(user)
            {
                const updateUser = await user.update({confirmed:true},{new:true})
                res.status(200).json({message:"email confirmed",data:updateUser})
            }else
            {
                res.status(400).json({message : "email not confirm"})
            }
        }
    } catch (error) {
        res.status(500).json({message : "server error",error})
        
    }
}
const profile = async(req,res)=>{
    try {
        const user = await userModel.findOne({where:{id : req.user.id},attributes: {exclude:['password']}})
        if(user)
        {
            res.status(200).json({message:"done",user})

        }else
        {
            res.status(400).json({message:"not found"})

        }

        
    } catch (error) {
        res.status(400).json({message : "email not confirm"})
    }
}
const ubdatename = async (req,res)=>{
    
try {
    const {name} = req.body;
    const user = await userModel.findOne({where:{id:req.params.id}})
    if(user)
    {
        const userubdate = await userModel.update({name},{where:{id:req.params.id}},{new:true})
        res.status(200).json({message:"done",data : user})
    }
    else
    {
        res.status(400).json({message:"not found user"})
    }
    
} catch (error) {
    res.status(500).json({message : "server error",error})
}
}
const deleteuser = async (req,res)=>{
    const id = req.params.id
    const deleteUser = await userModel.destroy({where:{id}})
    res.json({message:"done",deleteUser})
}
const editprofile = async(req,res)=>{

    try {
       if(!req.files)
       {
        res.json({message:"not found"})
       }
       else{
        const imageurl = `${req.protocol}://${req.headers.host}/${req.files[0].destination}/${req.files[0].filename}`;
        const user = await userModel.update({profilePic:imageurl},{where:{id:req.user.id}})
        res.status(200).json({message:"done",user})
       }
    } catch (error) {
        res.status(400).json({message:"not found"})
    }
 

}
module.exports = {getAllUser,addUser,ubdatename,deleteuser,confirmemail,profile,signin,editprofile}