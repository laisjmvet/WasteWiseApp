const express = require("express");
const collectDaysController = require("../controllers/collecDays.js");
const authenticator = require("../middleware/authenticator");
const collectDaysRouter = express.Router();

collectDaysRouter.get("/", collectDaysController.showAll);
collectDaysRouter.get("/:id", collectDaysController.showOne);
collectDaysRouter.post("/", collectDaysController.create);
collectDaysRouter.delete("/:id", collectDaysController.destroy);
collectDaysRouter.patch("/:id", collectDaysController.update);

module.exports = collectDaysRouter;
