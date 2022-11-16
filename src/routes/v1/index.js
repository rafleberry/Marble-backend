const express = require("express");
const userController = require("../../controllers/user.controller");
const collectionController = require("../../controllers/collection.controller");
const nftController = require("../../controllers/nft.controller");

const router = express.Router();

//============================//
//        User Info           //
//============================//
router.post("/login", userController.loginUser);
router.post("/register_user", userController.registerUserInfo);
router.post("/control_follow", userController.controlFollow);
router.post("/set_image", userController.setImage);
router.post("/set_creator", userController.setCreator);
router.get("/get_user", userController.getUserInfo);
router.get("/get_simple_user", userController.getSimpleUser);
router.get("/get_all_users", userController.getUsers);
router.get("/number_infos", userController.getNumberInfo);
router.get("/get_avatar", userController.getAvatar);
router.get("/get_filtered_users", userController.getFilteredUsers);

//============================//
//       Collection Info      //
//============================//

router.post("/collection/set_collection", collectionController.setCollection);
router.post("/collection/edit_collection", collectionController.editCollection);
router.delete(
  "/collection/remove_collection",
  collectionController.removeCollection
);
router.get(
  "/collection/get_all_collections",
  collectionController.getAllCollections
);
router.get(
  "/collection/get_actived_collections",
  collectionController.getActivedCollections
);
router.get("/collection/get_collection", collectionController.getCollection);

//============================//
//          Nft Info          //
//============================//

router.post("/nft/register_nft", nftController.registerNft);
router.post("/nft/set_nft", nftController.setNft);
router.get("/nft/get_nfts", nftController.getNfts);

module.exports = router;
