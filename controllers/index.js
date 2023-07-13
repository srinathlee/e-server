import * as models from "../models/index.js"
import mongoose, { model } from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
const db=mongoose.connection
dotenv.config()

export const AuthorizeUser=async(req,res,next)=>{
  let jwt_token;
     try{
        const header=req.headers
        if(header!=undefined){
          jwt_token=header.authorization.split(" ")[1]
        }
        if(jwt_token===undefined){
          res.status(400).send({error:"unauthorized user invalid jwt"})
        }
        else{
           const payload=await jwt.verify(jwt_token,process.env.jwtSecreatToken)
           console.log(payload)
           req.primeuser=payload.primeuser
           next()
        }
     }

     catch(e){
      res.status(400).send({error:e})
     }
}

export const Register=async(req,res)=>{
    const {name,email,password,profile,primeuser}=req.body
    
    try{
       const user=await models.NewModel.findOne({email})
       if(user==null){
        const hasedpassword=await bcrypt.hash(password,10)
        const newuser={name,email,password:hasedpassword,profile,primeuser}
        const modleduser= new models.NewModel(newuser)
        const result=await modleduser.save()
        res.send("user registered successfully")
       }
       else{
        res.send({message:"user already exists"})
       }
    }
    catch(e){
        res.status(400).send({error:e})
    }

}

export const Login=async(req,res)=>{
    try{
   const {email,password}=req.body 
   const user=await models.NewModel.findOne({"email":email})
   if(user!=null){
    const checkPassword=await bcrypt.compare(password,user.password)
    if(checkPassword){
        const payload={email,primeuser:user.primeuser}
        const json_token=jwt.sign(payload,process.env.jwtSecreatToken,{expiresIn:'24h'})
        res.status(200).send({jwt_token:json_token,message:"login successful"})
      }
    else{
        res.status(401).send({error:"password wrong"})
    }
   }
   else{
    res.status(401).send({error:"user dosent exist"})
      }
   }

   catch(err){
      res.send({error:err})
     }
}

export const Products=async(req,res)=>{
  try{
    const primeuser=req.primeuser
    let data={primedata:null,productsdata:{}}
    const params=req.query 
    const price=params.price||0
    const rating=params.rating||0 
    const title=params.title||""

    if(primeuser){
      const primedata=await models.PrimeProductModel.find()
      data.primedata=primedata
    }
    const productsdata=await models.ProductModel.find({title:{$regex:".*"+title+".*",$options:"i"},price:{$gte:price},rating:{$gte:rating}})
    data.productsdata=productsdata
    res.status(200).send({message:'successfully fetched data',data})
  }
  catch(err){
    res.status(400).send({error:err})
  }
  
} 

