const express = require("express");
const collectBulkyWasteController = require("../controllers/collectBulkyWaste");
const authenticator = require("../middleware/authenticator");
const collectBulkyWasteRouter = express.Router();

collectBulkyWasteRouter.get("/", collectBulkyWasteController.showAll);
collectBulkyWasteRouter.get("/:id", collectBulkyWasteController.showOne);
collectBulkyWasteRouter.post("/", collectBulkyWasteController.create);
collectBulkyWasteRouter.delete("/:id", collectBulkyWasteController.destroy);
collectBulkyWasteRouter.patch("/:id", collectBulkyWasteController.update);

module.exports = collectBulkyWasteRouter;
