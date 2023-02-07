const express = require('express');
const { AdminDashboardController, OrderController, ProductController } = require('../controllers');

const router = express.Router();

router.get('/users', AdminDashboardController.index_users);
router.delete('/users/delete/:id', AdminDashboardController.delete_user);
router.get('/users/:id', AdminDashboardController.show_user);
router.put('/users/update_role/:id', AdminDashboardController.update_user_role);

router.get('/products', ProductController.index);
router.get('/products/:id', ProductController.show_product);
router.post('/products/create', AdminDashboardController.create_product);
router.put('/products/update/:id', AdminDashboardController.update_product);
router.delete('/products/delete/:id', AdminDashboardController.delete_product);

router.get('/orders', AdminDashboardController.index_orders)
router.get('orders/:id', OrderController.show_order);
router.put('/orders/update/:id', AdminDashboardController.update_order_infos);
router.put('/orders/updateStatus/:id', AdminDashboardController.update_order_status);
router.delete('/orders/delete/:id', AdminDashboardController.delete_order);
router.get('orders/user/:id', AdminDashboardController.show_user_orders);


module.exports = router 