const { Router } = require('express');

const userController = require('../controllers/user.js');
const authenticator = require("../middleware/authenticator.js");
const userRouter = Router();

userRouter.get("/", userController.showAll);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/:id", userController.destroy);
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.logout);
userRouter.get("/username/:username", authenticator, userController.getUserByUsername);
userRouter.patch("/points/:username", userController.updatePoints);
userRouter.patch("/address/:username", userController.updateAddressId);
userRouter.patch("/admin/:username", userController.updateIsAdmin);

module.exports = userRouter;
