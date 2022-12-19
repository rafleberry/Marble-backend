const express = require("express");
const userController = require("../../controllers/user.controller");
const collectionController = require("../../controllers/collection.controller");
const nftController = require("../../controllers/nft.controller");
const followController = require("../../controllers/follow.controller");
const commentController = require("../../controllers/comment.controller");
const favoriteController = require("../../controllers/favorite.controller");

const router = express.Router();

//============================//
//        User Info           //
//============================//
router.post("/register_user", userController.registerUserInfo);
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

//============================//
//        Follow Info         //
//============================//

router.get("/follow/get_follow", followController.getFollowInfo);
router.get("/follow/get_followers", followController.getFollowers);
router.post("/follow/handle_follow", followController.handleFollow);

//============================//
//        Comment Info        //
//============================//

router.get("/comment/get_comment_counts", commentController.getCommentCounts);
router.get("/comment/get_comments", commentController.getComments);
router.post("/comment/add_comment", commentController.addComment);

//============================//
//       Favorite Info        //
//============================//

router.get("/favorite/get_favorite_counts", favoriteController.getFavoriteCnt);
router.get("/favorite/get_favorites", favoriteController.getFavorites);
router.post("/favorite/add_favorite", favoriteController.addFavorite);
module.exports = router;
