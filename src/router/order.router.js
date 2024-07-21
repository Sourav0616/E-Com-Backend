import { Router } from "express";
import { orderCreat , getAllOrders , cancelOrder} from "../controller/order.controller.js";
const router = Router();


router.route("/creatorder").post(orderCreat)
router.route("/getorders").post(getAllOrders)
router.route("/cancel").post(cancelOrder)



export default router;