import express from "express"
import cors from "cors"
import connectDb from "./src/database/database.js"
import userRouter from "./src/router/user.router.js"
import productRouter from "./src/router/product.router.js"
import cartRouter from "./src/router/cart.router.js"
import orderRouter from "./src/router/order.router.js"
const app=express()

app.use(express.json())
app.use(cors())

app.use("/api/user",userRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.listen(8000,()=>{
    console.log("Server is listen on port 8000")
    connectDb()
})