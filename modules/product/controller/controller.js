const productmodel = require("../../../DB/schema/product.schema")


const addProduct = async(req,res)=>{
    const {name,price,des,numberOfavilable,userId} = req.body
    const product = await productmodel.create({name,price,des,numberOfavilable,userId});
    res.json({message : "done",data:product})
}

module.exports = {
    addProduct
}