const headerMethod = ['body',"params",'query']
const handValp = (schema)=>{
    return (req,res,next)=>{
        valErorr = []
        
        headerMethod.forEach((key)=>{
            if(schema[key])
            {
                const val = schema[key].validate(req[key])
                if(val.error)
                {
                    valErorr.push(val.error.details[0])
        
                }
            }
        })

       
        if(valErorr.length)
        {
            res.status(400).json({message:"validation erorr",error:valErorr})
        }else
        {
            next()
        }

    }
}
module.exports = handValp

