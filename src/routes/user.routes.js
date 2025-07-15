import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const router = Router()

// this is calling the userRouter code 
router.route("/register").post(registerUser)

export default router;
