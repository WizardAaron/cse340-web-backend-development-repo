// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const invValidate = require("../utilities/inventory-validation")

/* ***************************
 *  Inventory Routes
 * ************************** */
// Route to build inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement))

// Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))

// Process the add classification form
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to build add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))

// Process the add inventory form
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Route to build inventory item detail view
router.get("/detail/:inventoryID", utilities.handleErrors(invController.buildVehicleDetail))

// Route to build inventory by classification view
router.get("/type/:classificationID", utilities.handleErrors(invController.buildByClassificationId))

// Route to test the error handler by throwing a 500 error
router.get("/error", utilities.handleErrors(invController.throwError))

module.exports = router;