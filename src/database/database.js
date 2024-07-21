import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb://127.0.0.1:27017/ecom"
    );
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log("MongoDB Not Connected..." + " " + error);
  }
};

export default connectDb;
