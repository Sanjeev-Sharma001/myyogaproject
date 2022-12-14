const router = require("express").Router();
const {
    postRegister,getAllUsers
  } = require("../controllers/users.controller");

router.get("/",getAllUsers) 
router.post("/register",postRegister)

module.exports = router;