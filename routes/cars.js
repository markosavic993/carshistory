const express = require('express');
const router = express.Router();
const controller = require('../controllers/cars');

/* GET cars data. */
router.get('/', async function(req, res, next) {
  res.send(await controller.findCarsForUser());
});

/* GET cars data. */
router.post('/', async function(req, res, next) {
  res.send(await controller.insertNewCar(req.body));
});

/* GET single car data. */
router.get('/:carId', async function(req, res, next) {
  res.send(await controller.findCarById(req.params));
});

router.post('/:carId/services', async function(req, res, next) {
  res.send(await controller.addServiceHistoryEntry(req.params, req.body));
});

router.delete('/:carId/services/:serviceHistoryId', async function(req, res, next) {
  res.send(await controller.removeServiceHistoryEntry(req.params));
});

module.exports = router;
