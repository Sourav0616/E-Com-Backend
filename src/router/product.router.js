import { Router } from "express";
import { addProduct, getAllProduct , reviewProduct} from "../controller/product.controller.js";
import { Upload } from "../middlewire/multer.middlewire.js";
import authJwtTow from "../middlewire/auth.middlewire.js";
const router = Router();

router.route("/addproduct").post(Upload.single("avatar"), addProduct);
router.route("/getproduct").get(authJwtTow,getAllProduct);
router.route("/review").post(authJwtTow , reviewProduct);

export default router;