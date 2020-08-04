var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "admin") {
    res.send({
      //  fail
      code: 1,
      msg: "Username already exists.",
    });
  } else {
    // success
    res.send({
      code: 0,
      data: {
        id: "abc123",
        username: username,
        password: password,
      },
    });
  }
});

module.exports = router;
