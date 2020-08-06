const express = require("express");
const users = require("./../controllers/users");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/*  */
router.post("/register", users.create);
router.post("/login", users.login);
router.post("/update", users.update);

module.exports = router;
