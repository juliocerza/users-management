const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const AdminAuth = require("../middleware/AdminAuth");

router.get("/", HomeController.index);
router.post("/users", UserController.create);
router.get("/users", AdminAuth, UserController.index);
router.get("/users/:id", AdminAuth, UserController.findUser);
router.put("/users", AdminAuth, UserController.edit);
router.delete("/users/:id", AdminAuth, UserController.remove);
router.post("/recover", UserController.recoverPassword);
router.post("/change", UserController.changePassword);
router.post("/login", UserController.login);

module.exports = router;
