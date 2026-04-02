// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")

/* ***************************
 *  Inventory Routes
 * ************************** */
// Route to build inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement))

// Route to build inventory item detail view
router.get("/detail/:inventoryID", utilities.handleErrors(invController.buildVehicleDetail))

// Route to build inventory by classification view
router.get("/type/:classificationID", utilities.handleErrors(invController.buildByClassificationId))

// Route to test the error handler by throwing a 500 error
router.get("/error", utilities.handleErrors(invController.throwError))

module.exports = router;