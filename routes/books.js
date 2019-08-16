const router = require("express").Router();

router.get("/", (req, res, next) => {
  console.log("req.user is???", req.user)
  res.status(200).json([{id: 1, title: "Where The Red Fern Grows"}, {id: 2, title: "Cracking The Coding Interview"}]);
});

module.exports = router;