const express = require('express');

const { OrderController } = require('../controllers');

const router = express.Router();

router.get('/myOrders', OrderController.show_personal_orders);
router.get('/:id', OrderController.show_order);
router.post('/create', OrderController.create_order);
router.put('/update/:id', OrderController.update_order);
router.delete('/delete/:id', OrderController.delete_order);


module.exports = router 