const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middleware/validator.handler');
const {createProductSchema,updateProductSchema,getProductSchema } = require('../dtos/products.dto');

const router = express.Router();
const service = new ProductsService();

router.get('/',async (req,res)=>{
  const prodcuts = await service.find();
  res.json(prodcuts)
});

// el orden es importante
router.get('/filter',(req,res)=>{
  res.send('soy el estatico')
});

router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res, next)=>{
  try {
    const {id} = req.params; // siempre se recibe como un string
    const product = await service.findOne(id);
    console.log(product)
    product ? res.status(200).json(product) : res.status(404).json({message: "no se encuentra"})
  } catch (error) {
    next(error); // ejecuta los middleware de tipo error
  }

});

router.post('/',
validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async (req,res,next)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const updateProduct = await service.update(id,body);
    res.status(200).json(updateProduct);
  } catch (error) {
      next(error); // ejecuta los middleware de tipo error
  }

});

router.delete('/:id',async (req,res)=>{
  const {id } = req.params;
  const deleteProduct = await service.delete(id);
  res.status(200).json(deleteProduct);
});

module.exports = router;
