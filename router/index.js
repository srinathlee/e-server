import { Router } from "express";
import * as controlles from '../controllers/index.js'
const router=Router()

router.route("/products").get(controlles.AuthorizeUser,controlles.Products)

router.route("/products/:id").get(controlles.AuthorizeUser,controlles.getProduct)

router.route("/logger").get(controlles.getUser)

router.route("/register").post(controlles.Register)

router.route("/login").post(controlles.Login)



export default router