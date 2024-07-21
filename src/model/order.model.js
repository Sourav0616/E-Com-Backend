import mongoose, {Schema} from "mongoose";

const orderSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
            ref: "User",
            require: [true, " is required"],
       },
       product : {
        _id :{
            type : String,
            require : true
         },
         productname :{
              type : String,
              require : true
         },
         url :{
            type : String,
            require : true
       },
       mrp :{
         type : Number,
            require : true
       },
       saleprice :{
         type : Number,
            require : true
       }
           }  , 
           status : {
            type : String,
            default : "Pending"
        },
        quantity : {
            type : Number,
            required : true
          },   
},{timestamps : true})

export const Order = mongoose.model("Order", orderSchema);