const express = require("express");
const binController = require("../controllers/bin");
const authenticator = require("../middleware/authenticator");
const binRouter = express.Router();

binRouter.get("/", binController.showAll);
binRouter.get("/:id", binController.showOneById);

module.exports = binRouter;
