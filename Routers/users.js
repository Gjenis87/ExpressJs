const router = require("express").Router();

const {
    getUsers,
    createUsers,
    updateUser,
    deleteUser,
    userLogin,
} = require("../controllers/userController");

router.get("/", getUsers); //C

router.get("/:id", getUsers); //C

router.post("/", createUsers); //R

router.put("/:id", updateUser); //U

router.delete("/:id", deleteUser); //D

router.post("/login", userLogin);

module.exports = router;