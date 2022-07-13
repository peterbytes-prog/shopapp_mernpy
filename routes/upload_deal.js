const express = require('express');
const defaultResponses = require('./response_schema');
const { Product, ProductDeal } = require("../model/product");
const path = require('path');


router = express.Router();
router.route('/')
  .get((req, res, next) => {
    return defaultResponses.error405(req,res,next);
  })
  .post((req, res, next) => {
    Product.findById(req.body.productId)
    .then((product)=>{
      req.body['product'] = product
      ProductDeal.create(req.body)
      .then((deal)=>{
        res.status(201);
        res.send({success:'okay', deal:deal});
      }, (err)=>{
        return next(err);
      })
    },(err)=>{
        return next(err);
    });
    
  })
  .put((req, res, next) => {
    return defaultResponses.error405(req,res,next);
  })
  .delete((req, res, next) => {
    return defaultResponses.error405(req,res,next);
});

module.exports = router;
