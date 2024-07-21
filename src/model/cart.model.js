
import mongoose, {Schema} from "mongoose";

const cartSchema = new Schema({

   user : {
    type: Schema.Types.ObjectId,
        ref: "User",
        require: [true, " is required"],
   },
   products : [
     {
      indivizualproduct : {
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

      } ,
      quantity :{
         type : Number,
         default : 1
      }
      },
      
      
   ]

},{timestamps : true})

export const Cart = mongoose.model("Cart", cartSchema);