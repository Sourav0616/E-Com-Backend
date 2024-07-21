import { User } from "../model/user.model.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).send("Name is required");
    }
    if (!email) {
      return res.status(400).send("Email is required");
    }
    if (!password) {
      return res.status(400).send("Password is required");
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).send("User already exists");
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password) {
      return res.status(401).send("password is requires");
    }
    if (!email) {
      return res.status(401).send("name is requires");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send("User dose't exist");
    }
    const validatePassword = await user.isPasswordCorrect(password);
    if (!validatePassword) {
      return res.status(401).send("Password Incorrect");
    }
    const token = await user.generateAccesstoken(user._id);
    if (!token) {
      return res.status(500).send("Token generation failed");
    }
    user.accesstoken = token;
    user.save({ validateBeforeSave: false });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Internal Server Error while login try again");
  }
};

const addAddaress = async (req, res) => {
  try {
    const { adrs, city, dist, ldmk, mob, pin } = req.body;

    if (!adrs) {
      return res.status(401).send("Address is required");
    }
    if (!city) {
      return res.status(401).send("City is required");
    }
    if (!dist) {
      return res.status(401).send("District is required");
    }
    if (!ldmk) {
      return res.status(401).send("Landmark is required");
    }
    if (!mob) {
      return res.status(401).send("Mobile is required");
    }
    if (!pin) {
      return res.status(401).send("Pincode is required");
    }
    if (!req.user) {
      return res.status(401).send("User is required send token properly");
    }
    

    const findUser = await User.findById(req.user._id);
    if (!findUser) {
      return res.status(401).send("User dose't exist");
    }
    findUser.addaress = adrs + "," + ldmk + "," + city + "," + dist + "," + pin;
    findUser.mobile = mob;
    findUser.save({ validateBeforeSave: false });
    res.status(200).send(findUser);
    console.log(findUser)
  } catch (error) {
    res
      .status(500)
      .send("Internal Server Error while add addaress please try again");
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).send("Unauthorized Credentials");
    }
    user.accesstoken = "";
    await user.save({ validateBeforeSave: false });
    res.status(200).send("Logout successful");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { createUser, loginUser, logoutUser , addAddaress};
