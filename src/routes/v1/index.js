const express = require("express");
const userController = require("../../controllers/user.controller");

const router = express.Router();

//============================//
//        User Info           //
//============================//
router.post("/login", userController.loginUser);
router.post("/register_user", userController.registerUserInfo);
router.post("/control_follow", userController.controlFollow);
router.post("/set_image", userController.setImage);
router.get("/get_user", userController.getUserInfo);
router.get("/get_all_users", userController.getUsers);
router.get("/number_infos", userController.getNumberInfo);
router.get("/get_avatar", userController.getAvatar);

module.exports = router;
