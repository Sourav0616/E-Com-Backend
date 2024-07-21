import { Router } from "express";
import { addToCart , getCartItems , plusQuantity , decreaseQuantity , removeToCart} from "../controller/cart.controller.js";
const router = Router();

router.route("/addtocart").post(addToCart);
router.route("/getcartitems").post(getCartItems);
router.route("/plus").post(plusQuantity);
router.route("/minus").post(decreaseQuantity);
router.route("/remove").post(removeToCart);




export default router;