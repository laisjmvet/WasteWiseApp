const express = require("express");
const weekdayController = require("../controllers/weekday");
const authenticator = require("../middleware/authenticator");
const weekdayRouter = express.Router();

weekdayRouter.get("/", weekdayController.showAll);
weekdayRouter.get("/:weekday", weekdayController.showOneByName);

module.exports = weekdayRouter;
