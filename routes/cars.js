const express = require('express');
const router = express.Router();
const controller = require('../controllers/cars');

/* GET cars data. */
router.get('/', async function(req, res, next) {
  res.send(await controller.findCarsForUser());
});

/* GET single car data. */
router.get('/:carId', async function(req, res, next) {
  res.send(await controller.findCarById(req.params));
});

router.post('/services', async function(req, res, next) {
  res.send(await controller.addServiceHistoryEntry(req.body));
});

module.exports = router;
