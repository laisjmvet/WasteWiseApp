const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const objectRouter = require('./routers/recyclableObject');
const addressRouter = require('./routers/address');
const userRouter = require('./routers/user');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get("/", (req, res) => {
    res.json({
        name: "Recycle bin for the win",
        description: "Why did the recycle bin get promoted? It always sorted things out!"
    })
})

api.use("/address", addressRouter);
api.use("/object", objectRouter);
api.use("/users", userRouter);

module.exports = api;
