

import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({

    name :{
        type : String,
        required : true
    },
    title :{
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    brand :{
        type : String,
        required : true
    },
    catagory :{
        type : String,
        required : true
    },
    headline :{
        type : String,
        required : true
    },
    mrp :{
        type : Number,
        required : true
    },
    saleprice :{
        type : Number,
        required : true
    },
    review : {
        type : Array
    },
    stock :{
        type : Number,
        required : true
    },  
    rating :{
        type : Number,
        default : 3
    },   
},{timestamps : true})


export const Product = mongoose.model("Product", productSchema);