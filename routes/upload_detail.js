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
    const {images, ...data} = req.body;
    Product.create(data)
    .then((product)=>{
      Product.findByIdAndUpdate(product.id,{
        $push:{
          images:{
            $each: images
          }
        }
      },{new: true}).then(product =>{
        res.status(201);
        res.send({success:'okay', product:product});
      }, (err)=>{
        return next(err);
      })
    }, (err)=>{
      return next(err);
    })
  })
  .put((req, res, next) => {
    return defaultResponses.error405(req,res,next);
  })
  .delete((req, res, next) => {
    return defaultResponses.error405(req,res,next);
});

module.exports = router;
