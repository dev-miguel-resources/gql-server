const express = require("express");
const router = express.Router();
const { authCheckMiddleware } = require("../middlewares/auth");
const { uploadImageCloud, removeImageCloud } = require("../controllers/cloudinary");

router.post("/uploadimages", authCheckMiddleware, uploadImageCloud);
router.post("/removeimages", authCheckMiddleware, removeImageCloud);

module.exports = router;