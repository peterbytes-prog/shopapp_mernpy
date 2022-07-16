const express = require('express');
const defaultResponses = require('./response_schema');
const path = require('path');


router = express.Router();
router.route('/')
  .get((req, res, next) => {
    return defaultResponses.error405(req,res,next);
  })
  .post((req, res, next) => {
    let image = req.files.image;
    let image_path = path.resolve(__dirname, "..","public/images/products",image.name);
    image.mv(image_path, async(error)=>{
      res.send({success:'okay', path:`http://localhost:3001/images/products/${image.name}`});
    })
  })
  .put((req, res, next) => {
    return defaultResponses.error405(req,res,next);
  })
  .delete((req, res, next) => {
    return defaultResponses.error405(req,res,next);
});

module.exports = router;
