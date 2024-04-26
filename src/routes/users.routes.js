const { Router } =require("express");
const { getUsers,getUserById,getFavoriteNumber, addUser,updateUser, deleteUser }=require("./../controllers/user.controller.js");

const router = Router();

router.get("/", getUsers);
router.get("/favorite", getFavoriteNumber);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;