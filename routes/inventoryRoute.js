// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")

/* ***************************
 *  Inventory Routes
 * ************************** */
// Route to build inventory item detail view
router.get("/detail/:inventoryID", invController.buildVehicleDetail)

// Route ro build inventory by classification view
router.get("/type/:classificationID", invController.buildByClassificationId);

module.exports = router;