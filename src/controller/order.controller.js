import { Order } from "../model/order.model.js";
import { Cart } from "../model/cart.model.js";
import { User } from "../model/user.model.js";

const orderCreat = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  if (!userId) {
    return res.status(400).send("User id Required");
  }

  const findUser = await User.findById(userId);

  if (!findUser) {
    return res.status(400).send("User Undefined");
  }

  const findUserCart = await Cart.findOne({
    user: userId,
  });
  console.log(findUserCart);
  if (!findUserCart) {
    return res.status(400).send("No products in cart to order");
  }
  if (findUserCart.products.length == 0) {
    return res.status(400).send("No products in cart to Order");
  }

  for (let i = 0; i < findUserCart.products.length; i++) {
    const orderItem = await Order.create({
      user: findUser,
      product: {
        _id: findUserCart.products[i].indivizualproduct._id,
        productname: findUserCart.products[i].indivizualproduct.productname,
        url: findUserCart.products[i].indivizualproduct.url,
        mrp: findUserCart.products[i].indivizualproduct.mrp,
        saleprice: findUserCart.products[i].indivizualproduct.saleprice,
      },
      quantity: findUserCart.products[i].quantity,
    });
  }
  const deletCart = await Cart.deleteOne({
    user: userId,
  });

  res.status(200).send("Order Placed Successfull");
};

const getAllOrders = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).send("User id Required");
  }

  const findUser = await User.findById(userId);

  if (!findUser) {
    return res.status(400).send("User Undefined");
  }

  const findOrders = await Order.find({ user: findUser._id });

  res.status(200).send(findOrders);
};

const cancelOrder = async (req, res) => {
  const { orderId, userId } = req.body;
  if (!userId) {
    return res.status(400).send("User id required");
  }
  if (!orderId) {
    return res.status(400).send("Order id required");
  }

  const findUser = await User.findById(userId);
  if (!findUser) {
    return res.status(400).send("You are not authorize");
  }

  const findOrder = await Order.findOne({ _id: orderId, user: userId });
  if (!findOrder) {
    return res.status(400).send("No such order exists");
  }

  findOrder.status = "cancel";
  await findOrder.save();

  res.status(201).send(findOrder);
};



export { orderCreat, getAllOrders, cancelOrder };
