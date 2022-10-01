const express = require("express");
const userController = require("../controllers/userController");
// const { route } = require("./inventoryRouter");
const router = express.Router();

router.route("/").get(userController.getAllUsers);

router.route("/signup").post(userController.signup);

router.route("/login").post(userController.login);

router.route("/verify").get(userController.verify);
// router.route("/isUserAuth").get(userController.isUserAuth);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
