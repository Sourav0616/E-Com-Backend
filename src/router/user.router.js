import { Router } from "express";
import { createUser, loginUser ,logoutUser ,addAddaress} from "../controller/user.controller.js";
import authJwtTow from "../middlewire/auth.middlewire.js";
const router = Router();

router.route("/regester").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/addaress").post(authJwtTow,addAddaress)


export default router;