const express = require("express");
const weekdayController = require("../controllers/weekday");
const authenticator = require("../middleware/authenticator");
const weekdayRouter = express.Router();

weekdayRouter.get("/", weekdayController.showAll);
weekdayRouter.get("/weekday/:weekday", weekdayController.showOneByName);
weekdayRouter.get("/:id", weekdayController.showOneById);

module.exports = weekdayRouter;
