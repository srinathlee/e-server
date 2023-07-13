import { Router } from "express";
import * as controlles from '../controllers/index.js'
const router=Router()

router.route("/").get(controlles.AuthorizeUser,controlles.Products)

router.route("/register").post(controlles.Register)

router.route("/login").post(controlles.Login)

export default router