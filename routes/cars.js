const express = require('express');
const router = express.Router();
const controller = require('../controllers/cars');
const {upload} = require("../helpers/fileUpload");
const {verifyUser} = require("../authenticate");

/* GET cars data. */
router.get('/', verifyUser, async function(req, res, next) {
  res.send(await controller.findCarsForUser(req.user));
});

/* GET cars data. */
router.post('/', verifyUser, async function(req, res, next) {
  res.send(await controller.insertNewCar(req.body, req.user));
});

/* GET single car data. */
router.get('/:carId', verifyUser, async function(req, res, next) {
  res.send(await controller.findCarById(req.params, req.user));
});

router.delete('/:carId', verifyUser, async function(req, res, next) {
  res.send(await controller.deleteSingleCar(req.params, req.user));
});

router.post('/:carId/services', verifyUser, async function(req, res, next) {
  res.send(await controller.addServiceHistoryEntry(req.params, req.body, req.user));
});

router.delete('/:carId/services/:serviceHistoryId', verifyUser, async function(req, res, next) {
  res.send(await controller.removeServiceHistoryEntry(req.params, req.user));
});

router.post('/:carId/upload', verifyUser, upload.single("myFile"), async (req, res) => {
  res.send(await controller.uploadImage(req.params, req.user, req.file));
});

module.exports = router;
