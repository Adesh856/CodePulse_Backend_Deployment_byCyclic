const jwt=require('jsonwebtoken')
const UserModel=require("../models/user.model")
require("dotenv").config()

const auth=async (req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[2]
    if(token){
        jwt.verify(token, process.env.SECRET,async function(err, decoded) {
            if(decoded){
                console.log(decoded)
                req.body.userId=decoded.userId
                const user=await UserModel.findOne({_id:decoded.userId})
                req.body.name=user.name
                console.log(req.body.userId)
                console.log(req.body.name)
                // req.role=user.role
                next()
            }else{
                res.status(401).send({"msg":"Wrong Credentials"})
            }
          });
    }else{
        res.status(401).send({"msg":"Login First"})
    }
}
module.exports=auth