const express = require("express");
const router = express.Router();
const { authCheckMiddleware } = require("../middlewares/auth");

router.get("/rest", authCheckMiddleware, (req, res) => {
    res.json({
        data: "hello guys from rest",
    });
});

module.exports = router;