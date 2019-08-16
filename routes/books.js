const router = require("express").Router();

router.get("/", (req, res, next) => {
  console.log("req.user is???", req.user)
  res.status(200).json("HERE WOULD BE AN ARRAY OF BOOKS");
});

module.exports = router;