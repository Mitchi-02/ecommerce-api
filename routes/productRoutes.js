const express = require('express');

const { ProductController } = require('../controllers');

const router = express.Router();


router.get('/', ProductController.index);
router.get('/:id', ProductController.show_product);

module.exports = router 