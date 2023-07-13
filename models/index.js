import {mongoose} from 'mongoose'
import * as schemas from '../schema/index.js'

export const NewModel=mongoose.model("NewModel",schemas.newSchema)
export const ProductModel=mongoose.model("ProductModel",schemas.productSchema)
export const PrimeProductModel=mongoose.model("PrimeProductModel",schemas.productSchema)

// export default NewModel
