import {mongoose} from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const dbconnectionprops={
    useNewUrlParser:true,
    useUnifiedTopology:true
}

const Connectdb=async()=>{
    mongoose.connect(process.env.dburi,dbconnectionprops)
}
export default Connectdb