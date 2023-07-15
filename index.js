import {mongoose} from "mongoose"
import Connectdb from "./dbconnection/index.js"
// import NewModel from "./models/index.js"
import express from 'express'
import router from "./router/index.js"
import bodyParser from "body-parser"
import cors from 'cors'

const app=express()
const port=5080
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(router)




Connectdb()
.then(()=>{
    console.log("db connected succfully")
})
.catch(()=>{
    console.log("error while connecting to db")
})
app.listen(port,()=>{console.log(`app is running at port ${port}`)})