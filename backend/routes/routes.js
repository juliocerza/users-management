const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");

router.get("/", HomeController.index);
router.post("/users", UserController.create);
router.get("/users", UserController.index);
router.get("/users/:id", UserController.findUser);
router.put("/users", UserController.edit);
router.delete("/users/:id", UserController.remove);

module.exports = router;
