const express = require('express');
const {
    addOrder,
    getAllOrders,
    getMyOrders
} = require('../controllers/orderController');
const { validateToken } = require('../middleware/validateTokenHandler'); // Assuming this middleware validates tokens
const router = express.Router();

// Route to add a new order
router.post('/', validateToken, addOrder); // Only authenticated users can add orders

// Route to get all orders (Admin only)
router.get('/', validateToken, getAllOrders); // Only admins can access this

// Route to get orders for the logged-in customer
router.get('/my-orders', validateToken, getMyOrders); // Only customers can access this

module.exports = router;
