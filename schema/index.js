import {mongoose} from 'mongoose'

 export const newSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmpassword:String,
    profile:String,
    primeuser:Boolean
})

export const productSchema=new mongoose.Schema({
    title:String,
    brand:String,
    price:Number,
    id:Number,
    imageUrl:String,
    rating:Number

})

// export default newSchema