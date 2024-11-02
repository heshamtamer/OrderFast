const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const User = require('../models/User'); 

//@desc Add a new order
//@route POST /api/orders
//@access Private (for customers)
const addOrder = asyncHandler(async (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("Order items are required");
  }

  const newOrder = new Order({ 
    customer: req.user.id, // Save the customer ID from the request
    items 
  });

  await newOrder.save();
  res.status(201).json(newOrder);
});

//@desc Get all orders (Admin only)
//@route GET /api/orders
//@access Private (for admins)
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('customer', 'username'); // Populate customer field to get username
  res.status(200).json(orders);
});

//@desc Get orders for the logged-in customer
//@route GET /api/orders/my-orders
//@access Private (for customers)
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.user.id }).populate('customer', 'username'); // Populate customer username
  res.status(200).json(orders);
});

module.exports = {
  addOrder,
  getAllOrders,
  getMyOrders
};
