const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const objectRouter = require('./routers/recyclableObject');
const addressRouter = require('./routers/address');
const userRouter = require('./routers/user');
const collectDaysRouter = require('./routers/collectDays');
const collectBulkyWasteRouter = require('./routers/collectBulkyWaste');
const weekdayRouter = require('./routers/weekday')

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
api.use("/collectDay", collectDaysRouter);
api.use("/collectBulkyWaste", collectBulkyWasteRouter);
api.use('/weekday', weekdayRouter);

module.exports = api;
