const { Router } = require('express');

const userController = require('../controllers/user.js');


const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.logout);
userRouter.get("/:username", userController.getUserByUsername);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("/:username", userController.updateAddressId);
userRouter.patch("/:username", userController.updatePoints);
userRouter.patch("/:username", userController.updateIsAdmin);

module.exports = userRouter;
