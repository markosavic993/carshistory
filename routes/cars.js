const express = require('express');
const router = express.Router();
const controller = require('../controllers/cars');

// /* GET cars data. */
// router.get('/', function(req, res, next) {
//   res.render('cars/singleCar', { car: {name: 'Renault Megane'} });
// });

/* GET cars data. */
router.get('/', async function(req, res, next) {
  res.send(await controller.findCarsForUser());
});

module.exports = router;
