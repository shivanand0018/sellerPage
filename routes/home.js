const express = require('express')
const router = express.Router();
const controller = require('../controllers/controller')

router.get('/', controller.getView)

router.post('/post', controller.postProducts)

router.get('/getProducts',controller.getProducts)

router.delete('/delete/:id',controller.deleteProduct)

router.get('/getProduct/:id',controller.getProduct)

router.put('/updateProduct/:id',controller.updateProduct)

module.exports = router