const express = require("express");
const router = express.Router();

router.get("/rest", (req, res) => {
    res.json({
        data: "hello guys from rest",
    });
});

module.exports = router;