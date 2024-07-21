import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({

    name: {
        type: String,
        require: [true, "name is required"],
      },
      email: {
        type: String,
        require: [true, "name is required"],
        unique: true,
      },
      password: {
        type: String,
        require: [true, "name is required"],
      },
      addaress: {
        type: String,
      },
      mobile: {
        type: Number,
      },
      accesstoken: {
        type: String,
      },

},{timestamps : true})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    }
    next();
  });

  userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  userSchema.methods.generateAccesstoken = async function () {
    const token = await jwt.sign(
      // FIRST PARAMETER NEEDS OBJECT
      {
        _id: this._id,
      },
      // ! SECOND PARAMETER NEEDS STRING
      "HRhuKhsaT",
      // TODO THIRD PARAMETER NEEDS OBJECT
      {
        expiresIn: "30d",
      }
    );
    return token;
  };

export const User = mongoose.model("User", userSchema);