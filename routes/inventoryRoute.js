// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")

// Route ro build inventory by classification view
router.get("/type/:classificationID", invController.buildByClassificationId);

module.exports = router;