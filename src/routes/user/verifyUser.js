const express = require("express");
const router = express.Router();
const {
    verifyUser
} = require("../../controllers/user/verifyUser");

router.patch("/:id", verifyUser);

module.exports = router;
