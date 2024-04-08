const { addProduct } = require('./controller/controller');

const router = require('express').Router();

router.post('/addProduct',addProduct);


module.exports = router