const express = require("express");
const addressController = require("../controllers/address.js");
const authenticator = require("../middleware/authenticator");
const addressRouter = express.Router();

addressRouter.get("/", addressController.showAll);
addressRouter.get("/:id", addressController.showOne);
addressRouter.post("/", addressController.create);
addressRouter.delete("/:id", addressController.destroy);
addressRouter.patch("/:id", addressController.update);

module.exports = addressRouter;
