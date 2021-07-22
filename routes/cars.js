var express = require('express');
var router = express.Router();

/* GET cars data. */
router.get('/', function(req, res, next) {
  res.render('singlecar/singleCar', { car: {name: 'Renault Megane'} });
});

module.exports = router;
