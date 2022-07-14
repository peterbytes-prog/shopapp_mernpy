const express = require('express');
const defaultResponses = require('./response_schema');
const { Product, ProductDeal } = require("../model/product");
const path = require('path');


router = express.Router();
router.route('/')
  .get((req, res, next) => {
    return Product.find({}).populate('images').then((products) =>{
      res.status(200);
      return res.send(products)
    }, (err)=>{
      return next(err)
    })
  })
  .post((req, res, next) => {
    return defaultResponses.error405(req,res,next);
  })
  .put((req, res, next) => {
    return defaultResponses.error405(req,res,next);
  })
  .delete((req, res, next) => {
    return defaultResponses.error405(req,res,next);
});
router.route('/:productId')
  .get((req, res, next) => {
    return Product.findById(req.params.productId).populate('images').then((product) =>{
      res.status(200);
      return res.send(product)
    }, (err)=>{
      return next(err)
    })
  })
  .post((req, res, next) => {
    return defaultResponses.error405(req,res,next);
  })
  .put((req, res, next) => {
    return defaultResponses.error405(req,res,next);
  })
  .delete((req, res, next) => {
    return defaultResponses.error405(req,res,next);
});
module.exports = router;
