import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";
import { User } from "../model/user.model.js";

const addToCart = async (req, res) => {
  const { productId, userId } = req.body;
  console.log(productId);

  if (!productId) {
    return res.status(400).send("Product Id is Required");
  }
  if (!userId) {
    return res.status(400).send("UserId Id is Required");
  }
  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(400).send("Please Regester YourSelf");
  }
  const productExist = await Product.findById(productId);
  if (!productExist) {
    return res.status(400).send("Product not Exist");
  }

  const findUserCart = await Cart.findOne({ user: userId });

  if (findUserCart) {
    const findInCart = findUserCart.products.find(
      (product) => product.indivizualproduct._id == productId
    );

    if (findInCart && productExist.stock > findInCart.quantity) {
      findInCart.quantity += 1;
      await findUserCart.save();
    } else {
      findUserCart.products.push({
        indivizualproduct: {
          _id: productExist._id,
          productname: productExist.name,
          url: productExist.image,
          mrp: productExist.mrp,
          saleprice: productExist.saleprice,
        },
        quantity: 1,
      });
      await findUserCart.save();
    }
    return res.status(200).send(findUserCart.products);
  } else {
    const newCart = await Cart.create({
      user: findUser,
      products: [
        {
          indivizualproduct: {
            _id: productExist._id,
            productname: productExist.name,
            url: productExist.image,
            mrp: productExist.mrp,
            saleprice: productExist.saleprice,
          },
          quantity: 1,
        },
      ],
    });

    return res.status(200).send(newCart.products);
  }
};

const getCartItems = async (req, res) => {
  const arr = []

    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).send("UserId required");
    }

  const user = await User.findById(userId)
  if(!user){
    return res.status(400).send("User required");
  }
    
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(400).send("no");
    }
  
    res.status(200).send(cart.products);

    
    
  
};

const plusQuantity = async (req, res) => {
  const { productId, userId } = req.body;
  if (!productId) {
    return res.status(400).send("Product Id is Required");
  }
  if (!userId) {
    return res.status(400).send("User Id is Required");
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(400).send("Product not exist");
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(400).send("Please add products to cart");
  }

  const index = cart.products.findIndex(
    (item) => item.indivizualproduct._id.toString() === productId.toString()
  );

  if (index > -1) {
    if (cart.products[index].quantity < product.stock) {
      cart.products[index].quantity += 1;
      await cart.save();
    } else {
      return res.status(400).send("Out of Stocks");
    }
  }

  res.status(200).send(cart.products);
};

const decreaseQuantity = async (req, res) => {
  const { productId, userId } = req.body;

  if (!productId) {
    return res.status(400).send("Product Id is Required");
  }
  if (!userId) {
    return res.status(400).send("User Id is Required");
  }

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(400).send("Product not exist");
  }

  const findUserCart = await Cart.findOne({ user: userId });
  if (!findUserCart) {
    return res.status(400).send("No Cart items");
  }
  const findInCartIndex = findUserCart.products.findIndex(
    (item) => item.indivizualproduct._id.toString() === productId.toString()
  );

  if (findInCartIndex != -1) {
    if (findUserCart.products[findInCartIndex].quantity === 1) {
      findUserCart.products.splice(findInCartIndex, 1);
      await findUserCart.save();
      return res.status(200).send(findUserCart.products);
    } else {
      findUserCart.products[findInCartIndex].quantity -= 1;
      await findUserCart.save();
      return res.status(200).send(findUserCart.products);
    }
  }
};

const removeToCart = async (req, res) => {
  const { productId, userId } = req.body;
  console.log(req.body);

  if (!productId) {
    return res.status(400).send("Product Id is Required");
  }
  if (!userId) {
    return res.status(400).send("User Id is Required");
  }

  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(400).send("Please Regester YourSelf");
  }
  const productExist = await Product.findById(productId);
  if (!productExist) {
    return res.status(400).send("Product not Exist");
  }

  const findUserCart = await Cart.findOne({ user: userId });

  if (!findUserCart) {
    return res.status(400).send("Have No products no remove");
  }

  const productIndex = findUserCart.products.findIndex(
    (item) => item.indivizualproduct._id == productId
  );

  if (productIndex === -1) {
    return res.status(400).send("Product not found in the cart");
  }
  findUserCart.products.splice(productIndex, 1);

  // Save the updated user's cart
  await findUserCart.save();

  res.status(200).send(findUserCart.products);
};

export {
  addToCart,
  getCartItems,
  plusQuantity,
  decreaseQuantity,
  removeToCart,
};
