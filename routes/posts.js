const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.send({
    posts: {
      id: 1,
      title: "My First Title",
      description: "Any Post",
    },
  });
});

module.exports = router;
